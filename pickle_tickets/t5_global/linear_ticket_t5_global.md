---
id: t5_global
title: '[Code] Global cleanup and consistency check'
status: Triage
priority: Medium
project: project
created: 2026-01-19
updated: 2026-01-19
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
labels: [core, css, cleanup]
assignee: Pickle Rick
---

# Description

## Problem to solve
The project lacks a centralized design system, leading to "class-soup" in individual components.

## Solution
1. Audit `index.css` and remove unused styles.
2. Standardize color variables (if any) and spacing.
3. Perform a final build check and audit for any remaining "AI-isms".
