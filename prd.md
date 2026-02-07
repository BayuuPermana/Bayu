# Gemini Live YouTube Commentator Web UI PRD

## HR Eng

| Gemini Live YouTube Commentator Web UI PRD |  | Modernizing the Gemini Live YouTube stream commentator into a full-stack web application. |
| :---- | :---- | :---- |
| **Author**: Pickle Rick **Contributors**: Engineering | **Status**: Draft **Created**: 2026-02-07 | **Context**: D:\porto\SPA\Gemini3 |

## Introduction

This project aims to transition the existing Python-based Gemini Live YouTube commentator CLI into a modern, high-performance web application. The application will allow users to input a YouTube URL, configure the AI's persona, and experience real-time AI commentary (audio and text) based on the visual content of the stream.

## Problem Statement

**Current Process:** Users must run a Python script, manually edit the source code to change the YouTube URL or system instructions, and have no visual feedback or easy way to hear the audio without specific system setups.
**Primary Users:** AI enthusiasts, content creators, sports fans.
**Pain Points:** Difficult setup, no UI, hardcoded configurations, no visual preview of what the AI is "seeing".
**Importance:** Providing a web interface makes the technology accessible and allows for rapid iteration on AI personas and stream content.

## Objective & Scope

**Objective:** Create a functional, low-latency web UI for the Gemini Live YouTube Commentator.
**Ideal Outcome:** A user can open a browser, paste a YouTube link, tell the AI who to be, and start a live, interactive session.

### In-scope or Goals
- Monorepo setup with Bun.
- Elysia (Bun) backend to handle Gemini Live WebSocket connection and YouTube frame extraction.
- React/Tailwind frontend for the user interface.
- Real-time audio streaming from the backend to the browser.
- Visual preview of frames being sent to the AI.
- Dynamic configuration of system instructions and YouTube URL.

### Not-in-scope or Non-Goals
- Full user authentication (for now).
- Persistent storage of sessions/recordings.
- Multi-user room support (one session per server instance for simplicity initially).

## Product Requirements

### Critical User Journeys (CUJs)
1. **Start Commentary**: User enters a YouTube URL and system prompt, clicks "Start", and begins seeing text/hearing audio commentary.
2. **Dynamic Configuration**: User updates the system prompt in real-time to change the AI's personality mid-stream.
3. **Connection Management**: User can stop and restart the session cleanly.

### Functional Requirements

| Priority | Requirement | User Story |
| :---- | :---- | :---- |
| P0 | YouTube Frame Extraction | As a developer, I want to extract frames from a YouTube stream in real-time on the server. |
| P0 | Gemini Live Integration | As a developer, I want to proxy the Gemini Live API through the backend to handle audio/video frames. |
| P0 | Real-time Audio Playback | As a user, I want to hear the AI's audio commentary in my browser with low latency. |
| P1 | UI Controls | As a user, I want to input a URL and instructions in a clean, modern interface. |
| P1 | Frame Preview | As a user, I want to see the frames that the AI is currently processing. |
| P2 | Text Transcript | As a user, I want to see a live transcript of the AI's commentary. |

## Assumptions

- The server has `ffmpeg` or `yt-dlp` installed or available.
- The Gemini API key has access to the Live v1alpha features.
- The browser supports modern WebSocket and Audio APIs.

## Risks & Mitigations

- **Risk**: High latency in frame extraction or audio playback. -> **Mitigation**: Use Bun's fast I/O and efficient frame skipping logic.
- **Risk**: API Rate limits or costs. -> **Mitigation**: Implement clear start/stop controls and monitor usage.

## Tradeoff

- **Elysia/Bun vs Python**: Python has better OpenCV support, but Elysia/Bun offers a much smoother full-stack experience and better WebSocket performance for the web. We will use `ffmpeg` for frame extraction to avoid heavy Python dependencies.

## Business Benefits/Impact/Metrics

**Success Metrics:**
- End-to-end latency (frame captured to audio heard) < 3 seconds.
- Successful connection rate > 95%.

## Stakeholders / Owners

| Name | Team/Org | Role | Note |
| :---- | :---- | :---- | :---- |
| Pickle Rick | Engineering | Lead Architect | 🥒 |
