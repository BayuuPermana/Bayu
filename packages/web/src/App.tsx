import { useState, useRef } from 'react'
import { Play, Square, MessageSquare, Video, Settings, Activity } from 'lucide-react'

// God-tier PCM16 Player
class PCM16Player {
  public context: AudioContext
  private nextStartTime: number = 0
  private sampleRate: number = 24000

  constructor() {
    this.context = new AudioContext({ sampleRate: this.sampleRate })
  }

  async playChunk(base64Data: string) {
    const binary = atob(base64Data)
    const len = binary.length
    const bytes = new Uint8Array(len)
    for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i)
    
    const pcm16 = new Int16Array(bytes.buffer)
    const float32 = new Float32Array(pcm16.length)
    for (let i = 0; i < pcm16.length; i++) {
      const val = pcm16[i]
      float32[i] = val ? val / 32768.0 : 0
    }

    const buffer = this.context.createBuffer(1, float32.length, this.sampleRate)
    buffer.getChannelData(0).set(float32)

    const source = this.context.createBufferSource()
    source.buffer = buffer
    source.connect(this.context.destination)

    const startTime = Math.max(this.context.currentTime, this.nextStartTime)
    source.start(startTime)
    this.nextStartTime = startTime + buffer.duration
  }

  resume() {
    if (this.context.state === 'suspended') {
      this.context.resume()
    }
  }

  stop() {
    this.context.close()
  }
}

function App() {
  const [url, setUrl] = useState('https://www.youtube.com/watch?v=mHcRPO21qlE')
  const [prompt, setPrompt] = useState('You are Apex, an elite high-energy sports commentator.')
  const [isConnected, setIsConnected] = useState(false)
  const [transcript, setTranscript] = useState<string[]>([])
  const [latency] = useState<number>(0)
  
  const videoRef = useRef<HTMLImageElement>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const playerRef = useRef<PCM16Player | null>(null)

  const toggleConnection = () => {
    if (isConnected) {
      wsRef.current?.close()
      playerRef.current?.stop()
      setIsConnected(false)
      return
    }

    const ws = new WebSocket(`ws://${window.location.host}/api/live`)
    wsRef.current = ws
    
    if (!playerRef.current || playerRef.current.context.state === 'closed') {
      playerRef.current = new PCM16Player()
    }
    playerRef.current.resume()

    ws.onopen = () => {
      console.log('Connected to backend')
      setIsConnected(true)
      ws.send(JSON.stringify({ url, prompt }))
      setTranscript(prev => ["System: Connection established. Starting stream...", ...prev])
    }

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data)

      if (msg.type === 'preview') {
        if (videoRef.current) {
          videoRef.current.src = `data:image/jpeg;base64,${msg.data}`
        }
      } else if (msg.server_content?.model_turn) {
        msg.server_content.model_turn.parts.forEach((part: any) => {
          if (part.inline_data) {
            playerRef.current?.playChunk(part.inline_data.data)
          }
          if (part.text) {
            setTranscript(prev => [part.text, ...prev.slice(0, 49)])
          }
        })
      }
    }

    ws.onclose = () => {
      console.log('Disconnected from backend')
      setIsConnected(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-8 font-sans selection:bg-blue-500/30">
      <header className="max-w-6xl mx-auto flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20">
            <Video className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">OmniStream <span className="text-blue-500">AI</span></h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">Agentic Sports Commentator</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-zinc-500 uppercase">Latency</span>
            <div className="flex items-center gap-2">
              <Activity className="w-3 h-3 text-green-500" />
              <span className="text-sm font-mono">{latency}ms</span>
            </div>
          </div>
          <div className={`px-4 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all ${
            isConnected 
              ? 'bg-green-500/10 border-green-500/50 text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.1)]' 
              : 'bg-zinc-900 border-zinc-800 text-zinc-500'
          }`}>
            {isConnected ? '• Live' : 'Offline'}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-8 space-y-6">
          <div className="aspect-video bg-black rounded-2xl border border-zinc-800/50 shadow-2xl overflow-hidden relative group">
            <img 
              ref={videoRef}
              className="w-full h-full object-contain"
            />
            {!isConnected && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-md">
                <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mb-4 border border-zinc-800">
                  <Play className="w-6 h-6 text-zinc-600" />
                </div>
                <p className="text-zinc-400 font-medium">No active stream connection</p>
                <p className="text-zinc-600 text-xs mt-1">Paste a URL and click Start Commentary below</p>
              </div>
            )}
            <div className="absolute top-4 left-4 flex gap-2">
              <div className="px-2 py-1 bg-black/50 backdrop-blur-md rounded text-[10px] font-bold uppercase tracking-tighter border border-white/10">
                1080p
              </div>
              <div className="px-2 py-1 bg-red-600/80 backdrop-blur-md rounded text-[10px] font-bold uppercase tracking-tighter border border-red-500/20">
                REC
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-zinc-800/50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-zinc-400">
                <MessageSquare className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">AI Commentary Transcript</span>
              </div>
              <span className="text-[10px] text-zinc-600 font-mono">Real-time Feed</span>
            </div>
            <div className="h-[250px] overflow-y-auto p-6 space-y-4">
              {transcript.map((line, i) => (
                <div key={i} className={`text-sm leading-relaxed ${i === 0 ? 'text-blue-400 font-medium scale-105 origin-left transition-all' : 'text-zinc-400'}`}>
                  {line}
                </div>
              ))}
              {transcript.length === 0 && (
                <div className="h-full flex items-center justify-center text-zinc-700 text-sm italic">
                  Commentary will appear here in real-time...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 p-6 rounded-2xl shadow-xl">
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-6 flex items-center gap-2">
              <Settings className="w-4 h-4" /> Control Panel
            </h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Stream Source</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={url}
                    onChange={(e) => setUrl((e.target as HTMLInputElement).value)}
                    placeholder="YouTube URL"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-zinc-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">System Instructions</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt((e.target as HTMLTextAreaElement).value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm h-40 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none placeholder:text-zinc-700 leading-relaxed"
                />
              </div>

              <button 
                onClick={toggleConnection}
                className={`w-full group flex items-center justify-center gap-3 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all duration-300 ${
                  isConnected 
                    ? 'bg-zinc-900 text-red-500 border border-red-500/20 hover:bg-red-500/5' 
                    : 'bg-blue-600 text-white hover:bg-blue-500 shadow-[0_10px_30px_rgba(37,99,235,0.2)] hover:-translate-y-1'
                }`}
              >
                {isConnected ? (
                  <>
                    <Square className="w-4 h-4 fill-current transition-transform group-hover:scale-110" />
                    Terminate Session
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current transition-transform group-hover:translate-x-0.5" />
                    Engage AI Commentary
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
