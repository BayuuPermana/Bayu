import { spawn } from 'child_process'
import { WebSocket as GeminiWS } from 'ws'

import { readFileSync, existsSync } from 'fs'

let API_KEY = process.env.GOOGLE_API_KEY || ''

// Fallback: Manually read .env if Bun is being a Jerry
if (!API_KEY) {
  const envPaths = ['.env', 'packages/api/.env', '../../.env']
  for (const p of envPaths) {
    if (existsSync(p)) {
      const content = readFileSync(p, 'utf8')
      const match = content.match(/GOOGLE_API_KEY=(.*)/)
      if (match && match[1]) {
        API_KEY = match[1].trim()
        console.log(`âœ… Manually loaded key from ${p}`)
        break
      }
    }
  }
}

const PYTHON_PATH = 'python/venv/Scripts/python.exe'
const EXTRACTOR_PATH = 'python/src/frame_extractor.py'

if (!API_KEY) {
  console.error('âŒ  CRITICAL: GOOGLE_API_KEY is STILL not defined! I tried everything, Morty!')
} else {
  console.log(`âœ… API Key active (starts with: ${API_KEY.substring(0, 8)}...)`)
}

console.log('Starting OmniStream AI Raw Server...')

export function createServer(port = 3000) {
  return Bun.serve<{ extractor?: any; geminiWs?: any }>({
    port,
    fetch(req, server) {
      // Pass initial data object to track resources per connection
      if (server.upgrade(req, { data: { extractor: null, geminiWs: null } })) return
      return new Response('OmniStream AI API - WebSocket Only', { status: 426 })
    },
    websocket: {
      async message(ws, message) {
        if (typeof message !== 'string') return
        
        const { url, prompt } = JSON.parse(message)
        if (!url || !url.startsWith('https://')) {
          ws.send(JSON.stringify({ error: 'Invalid URL' }))
          return
        }

        console.log(`Engaging AI Commentary for: ${url}`)

        // 0. Cleanup existing resources if user re-triggers connection on same socket
        if (ws.data.extractor) {
          console.log('Killing previous extractor process...')
          ws.data.extractor.kill()
        }
        if (ws.data.geminiWs) {
          console.log('Closing previous Gemini connection...')
          ws.data.geminiWs.close()
        }

        // 1. Gemini Connection
        // CRITICAL: Google often requires an origin header for WebSocket handshakes
        const geminiWs = new GeminiWS(
          `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BiDiGenerateContent?key=${API_KEY}`,
          {
            headers: {
              'origin': 'https://generativelanguage.googleapis.com',
            }
          }
        )

        geminiWs.on('open', () => {
          console.log('Connected to Gemini Live. Sending setup...')
          geminiWs.send(JSON.stringify({
            setup: {
              model: "models/gemini-3-flash-preview",
              generation_config: { response_modalities: ["AUDIO"] },
              system_instruction: { parts: [{ text: prompt }] }
            }
          }))
        })

        geminiWs.on('message', (data) => ws.send(data.toString()))
        geminiWs.on('error', (err) => console.error('Gemini WS Error:', err))

        // 2. Python Extraction
        const extractor = spawn(PYTHON_PATH, [EXTRACTOR_PATH, url, '1'])
        let buffer = Buffer.alloc(0)

        extractor.stderr.on('data', (data) => console.error(`[Extractor] ${data}`))

        extractor.stdout.on('data', (chunk) => {
          buffer = Buffer.concat([buffer, chunk])
          while (buffer.length >= 8) {
            if (buffer.toString('utf8', 0, 4) === 'FRME') {
              const length = buffer.readUInt32BE(4)
              if (buffer.length >= 8 + length) {
                const frameData = buffer.slice(8, 8 + length)
                if (geminiWs.readyState === 1) { // 1 is OPEN
                  geminiWs.send(JSON.stringify({
                    realtime_input: {
                      media_chunks: [{
                        data: frameData.toString('base64'),
                        mime_type: "image/jpeg"
                      }]
                    }
                  }))
                  ws.send(JSON.stringify({ type: 'preview', data: frameData.toString('base64') }))
                }
                buffer = buffer.slice(8 + length)
              } else break
            } else buffer = buffer.slice(1)
          }
        })

        // Store references in ws.data so they can be cleaned up
        ws.data.extractor = extractor
        ws.data.geminiWs = geminiWs
      },
      close(ws) {
        console.log('WebSocket closed. Cleaning up all resources...')
        if (ws.data.extractor) {
          ws.data.extractor.kill()
          ws.data.extractor = null
        }
        if (ws.data.geminiWs) {
          ws.data.geminiWs.close()
          ws.data.geminiWs = null
        }
      }
    }
  })
}

if (import.meta.main) {
  const server = createServer(3000)
  console.log(`🚀 Raw Server listening on port ${server.port}`)
}