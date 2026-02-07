import { Elysia, t } from 'elysia'
import { cors } from '@elysiajs/cors'
import { websocket } from '@elysiajs/websocket'
import { spawn } from 'child_process'
import { WebSocket as WS } from 'ws'

const API_KEY = process.env.GOOGLE_API_KEY || ''
const PYTHON_PATH = 'python/venv/Scripts/python.exe'
const EXTRACTOR_PATH = 'python/src/frame_extractor.py'

const app = new Elysia()
  .use(cors())
  .use(websocket())
  .ws('/api/live', {
    body: t.Object({
      url: t.String(),
      prompt: t.String()
    }),
    async open(ws) {
      console.log('Client connected to live commentary')
    },
    async message(ws, message: any) {
      const { url, prompt } = message
      console.log(`Starting stream for: ${url}`)

      // 1. Connect to Gemini Live
      const geminiWs = new WS(`wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BiDiGenerateContent?key=${API_KEY}`)

      geminiWs.on('open', () => {
        console.log('Connected to Gemini Live API')
        // Send setup message
        geminiWs.send(JSON.stringify({
          setup: {
            model: "models/gemini-2.5-flash-native-audio-preview-12-2025",
            generation_config: {
              response_modalities: ["AUDIO"]
            },
            system_instruction: {
              parts: [{ text: prompt }]
            }
          }
        }))
      })

      geminiWs.on('message', (data) => {
        // Forward Gemini response to client
        ws.send(data)
      })

      // 2. Spawn Frame Extractor
      const extractor = spawn(PYTHON_PATH, [EXTRACTOR_PATH, url, '1'])
      
      let buffer = Buffer.alloc(0)
      extractor.stdout.on('data', (chunk) => {
        buffer = Buffer.concat([buffer, chunk])
        
        while (buffer.length >= 8) {
          if (buffer.toString('utf8', 0, 4) === 'FRME') {
            const length = buffer.readUInt32BE(4)
            if (buffer.length >= 8 + length) {
              const frameData = buffer.slice(8, 8 + length)
              
              // Send frame to Gemini
              if (geminiWs.readyState === WS.OPEN) {
                geminiWs.send(JSON.stringify({
                  realtime_input: {
                    media_chunks: [{
                      data: frameData.toString('base64'),
                      mime_type: "image/jpeg"
                    }]
                  }
                }))
                
                // Also send frame to client for preview
                ws.send(JSON.stringify({
                  type: 'preview',
                  data: frameData.toString('base64')
                }))
              }
              
              buffer = buffer.slice(8 + length)
            } else {
              break
            }
          } else {
            // Out of sync? Skip one byte and try again
            buffer = buffer.slice(1)
          }
        }
      })

      extractor.stderr.on('data', (data) => {
        console.error(`Extractor error: ${data}`)
      })

      ws.on('close', () => {
        console.log('Client disconnected, cleaning up...')
        extractor.kill()
        geminiWs.close()
      })
    }
  })
  .listen(3000)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
