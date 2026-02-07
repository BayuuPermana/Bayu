# OmniStream AI: Gemini Live YouTube Commentator

A modern, high-performance web application that turns Gemini 1.5/2.0 into a real-time YouTube stream commentator. 

## 🚀 Quick Start (Pickle Mode)

### 1. Prerequisites
- **Bun**: The fast JavaScript runtime.
- **Python 3.10+**: For frame extraction.
- **FFmpeg**: Must be in your system PATH.

### 2. Installation
```bash
# Install everything
bun run install:all

# Setup Python (Windows example)
cd python
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

### 3. Configuration
Create a `.env` file in the root:
```env
GOOGLE_API_KEY=AIzaSy...your_key
```

### 4. Engage!
```bash
bun run dev
```
Open [http://localhost:5173](http://localhost:5173) and start the chaos.

## 🛠 Architecture
- **Frontend**: React + Tailwind + Lucide Icons. Low-latency PCM16 audio player.
- **Backend**: Bun + Elysia (Raw WebSocket). Proxies Gemini Live BiDi connection.
- **Extraction**: Python + OpenCV + yt-dlp. Streams raw frames over pipe.

## 🥒 "Pickle Rick" Standards
This project follows a strict engineering lifecycle:
- **Zero Slop**: No boilerplate. No useless comments.
- **Atomic Tickets**: Managed locally in `.pickle/`.
- **Resource Integrity**: Auto-cleanup of WebSocket resources and sub-processes.

---
*Wubba Lubba Dub Dub!* 🥒