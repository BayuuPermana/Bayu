---
id: c666666
title: "Fix WebSocket resource cleanup in backend"
status: Done
priority: High
project: project
created: 2026-02-07
updated: 2026-02-07
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
labels: [bug, backend]
assignee: Pickle Rick
---

# Description

## Problem to solve
In packages/api/src/index.ts, when a new message is received on the WebSocket, it spawns a new Gemini connection and a new Python extractor, overwriting ws.data. The previous resources are not closed or killed, leading to resource leaks and multiple concurrent commentary processes.

## Solution
Before spawning new resources, check if ws.data already contains an extractor or geminiWs. If so, kill/close them properly.
