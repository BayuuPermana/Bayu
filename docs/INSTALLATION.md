# OmniStream AI Installation Guide

## Prerequisites
- **Bun**: v1.0.0 or higher.
- **Python**: v3.10 or higher (with `venv`).
- **Google API Key**: Must have access to the Multimodal Live API.

## Setup Instructions

### 1. Repository Setup
```bash
bun install
```

### 2. Python Environment
The project expects a virtual environment in `python/venv`.
```bash
cd python
python -m venv venv
./venv/Scripts/activate # On Windows
pip install -r requirements.txt
```

### 3. Configuration
Create a `.env` file in the root directory:
```env
GOOGLE_API_KEY=your_api_key_here
```

### 4. Running the Application
From the root directory:
```bash
bun run dev
```
This will start both the API (port 3000) and the Frontend (port 5173).

## Troubleshooting
- **No Audio**: Ensure your browser has permission to play audio. The UI requires a user gesture (Start button) to resume the AudioContext.
- **Python Errors**: Verify that `cv2` and `yt-dlp` are installed in the `python/venv`.
- **Latency**: If the stream is lagging, lower the FPS in `packages/api/src/index.ts`.
- **Windows Script Error**: If you encounter `Background commands "&" are not supported yet`, use the `concurrently` package in your `package.json` or run the API and Frontend in separate terminals.
