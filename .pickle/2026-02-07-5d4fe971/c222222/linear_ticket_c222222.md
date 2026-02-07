---
id: c2222220
title: "YouTube Frame Extraction Service"
status: Done
priority: High
project: project
created: 2026-02-07
updated: 2026-02-07
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
labels: [backend, video]
assignee: Pickle Rick
---

# Description

## Problem to solve
We need to extract frames from a YouTube URL in real-time without using heavy Python dependencies in our new Bun-based API.

## Solution
Implement a service using `yt-dlp` (via shell) and `ffmpeg` to capture frames at a configurable FPS (e.g., 1 FPS) and encode them as JPEGs for Gemini.
