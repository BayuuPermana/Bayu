---
id: c3333330
title: "Gemini Live WebSocket Proxy"
status: Done
priority: High
project: project
created: 2026-02-07
updated: 2026-02-07
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
labels: [backend, ai, websocket]
assignee: Pickle Rick
---

# Description

## Problem to solve
The frontend cannot directly talk to the Gemini Live API securely (API key exposure) or efficiently (audio/video binary handling).

## Solution
Create an Elysia WebSocket endpoint that:
1. Accepts a YouTube URL and system instructions.
2. Connects to the Gemini Live API using the Google GenAI SDK.
3. Streams frames from the YouTube Service to Gemini.
4. Forwards audio and text responses from Gemini to the client.
