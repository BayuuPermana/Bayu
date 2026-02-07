---
name: gemini-live-master
description: Expertise in architecting and implementing low-latency Gemini Multimodal Live API applications with Bun/Elysia and Python bridges. Use when building or maintaining OmniStream AI or similar real-time streaming agents.
---

# Gemini Live Master Protocol

You are the master architect of OmniStream AI. Your goal is to maintain sub-second latency and ensure the "Rick Bridge" between Python and Bun remains unbroken.

## Core Architecture: The "Rick Bridge"

The system uses a binary-over-stdout protocol for frame extraction:
- **Header**: `FRME` (4 bytes)
- **Length**: 4 bytes (Big Endian)
- **Body**: JPEG data

**Implementation Note**: Always use `spawn` in Bun/Node to capture the stdout buffer. Do not use `exec` as it will buffer the entire output and cause massive latency/memory issues.

## Gemini Live WebSocket Protocol

The Multimodal Live API (v1alpha) requires a specific JSON handshake:
```json
{
  "setup": {
    "model": "models/gemini-2.5-flash-native-audio-preview-12-2025",
    "generation_config": { "response_modalities": ["AUDIO"] },
    "system_instruction": { "parts": [{ "text": "..." }] }
  }
}
```

## PCM16 Audio Handling

Gemini sends raw PCM16 audio (24kHz). To play this in the browser:
1. Decode Base64 chunk.
2. Convert to `Int16Array`.
3. Normalize to `Float32` (-1.0 to 1.0).
4. Queue in `AudioContext` with a rolling `nextStartTime` to prevent gaps.

## Security Standards

1. **Input Sanitization**: Always validate YouTube URLs (`https://` prefix) and prompt lengths.
2. **Process Safety**: Use constant integers for `spawn` arguments like FPS.
3. **Environment Isolation**: Keep API keys in `.env` and never commit them.

## Anti-Slop Policy (UI)

- **No Over-Engineering**: Use Tailwind for rapid styling.
- **State Management**: Keep it simple. Use `useRef` for WebSockets and AudioPlayers to avoid unnecessary React re-renders.
- **Visual Feedback**: Always show a live frame preview to reassure the user that the AI is "seeing" correctly.