---
id: c1111110
title: "Monorepo & Infrastructure Setup"
status: Done
priority: High
project: project
created: 2026-02-07
updated: 2026-02-07
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
labels: [infra, bun]
assignee: Pickle Rick
---

# Description

## Problem to solve
We need a solid foundation for the new project. The current Python scripts are scattered.

## Solution
Initialize a Bun monorepo. Setup `packages/api` (Elysia) and `packages/web` (React/Vite). Configure shared types and scripts.
