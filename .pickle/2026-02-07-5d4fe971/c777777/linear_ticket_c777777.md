---
id: c777777
title: "Bulletproof Testing for OmniStream AI"
status: Done
priority: High
project: project
created: 2026-02-07
updated: 2026-02-07
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
labels: [testing, quality]
assignee: Pickle Rick
---

# Description

## Problem to solve
The current tests are superficial and do not cover edge cases, resource management, or actual integration with external services (Gemini/YouTube).

## Solution
1. Enhance packages/api/src/api.test.ts to:
   - Test resource cleanup (check if processes are killed).
   - Mock Gemini connection to test message handling and error states.
   - Test simultaneous sessions if applicable (though we aim for one for now, we should ensure they don't leak).
2. Enhance python/src/test_integration.py to:
   - Test invalid URLs and proper error reporting.
   - Test stream timeout/termination.
