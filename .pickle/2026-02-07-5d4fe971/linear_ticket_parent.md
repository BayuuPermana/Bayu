---
id: p7382910
title: "[Epic] Gemini Live YouTube Commentator Web UI"
status: Triage
priority: High
project: project
created: 2026-02-07
updated: 2026-02-07
links:
  - url: ../../prd.md
    title: PRD
labels: [epic, fullstack, ai]
assignee: Pickle Rick
---

# Description

## Problem to solve
The current Python-based CLI is hard to use and lacks visual/audio feedback for the user. We need a modern web UI to make the Gemini Live YouTube commentator accessible and interactive.

## Solution
Implement a Bun monorepo with an Elysia backend (for Gemini Live proxying and YouTube frame extraction) and a React frontend (for control and feedback).
