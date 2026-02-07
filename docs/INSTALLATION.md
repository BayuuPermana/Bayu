# Detailed Installation & Web UI Guide

## System Requirements
- **OS**: Windows (tested), Linux, or macOS.
- **Tools**: `yt-dlp` and `ffmpeg` must be available in your system path.

## Step-by-Step Setup

### 1. Monorepo Installation
We use Bun workspaces. To install dependencies for all packages:
```bash
bun run install:all
```

### 2. Python Backend Setup
The frame extractor is written in Python for performance and library support.
```bash
cd python
python -m venv venv
# Windows
.\venv\Scripts\activate
# Linux/macOS
source venv/bin/activate

pip install -r requirements.txt
```

### 3. API Key
Get your key from [Google AI Studio](https://aistudio.google.com/). Ensure you have access to `gemini-2.0-flash-exp` or equivalent models supporting the Live API.

Place it in `.env` at the root:
```env
GOOGLE_API_KEY=your_key_here
```

## Running the Web UI

### Development Mode
```bash
bun run dev
```
- **Backend API**: [http://localhost:3000](http://localhost:3000)
- **Frontend Web**: [http://localhost:5173](http://localhost:5173)

### How to use the interface:
1. **Source**: Paste a YouTube URL (Live streams or Videos).
2. **Persona**: Define the AI's personality (e.g., "Sassy sports commentator").
3. **Engage**: Click **"Engage AI Commentary"**.
4. **Audio**: The browser will play PCM16 audio. Ensure your volume is up and the browser tab is focused.

## Testing
Verify your setup before running:
```bash
bun run test:all
```
This runs the Bun API tests and the Python integration tests.