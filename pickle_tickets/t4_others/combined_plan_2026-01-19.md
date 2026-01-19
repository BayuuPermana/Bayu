# Global and Remaining Components Cleanup Plan

## Overview
Perform a sweep of all remaining components (Projects, TechStack, Contact, Navigation) and global styles to remove any remaining AI-generated fluff and technical debt.

## Phase 1: Projects & TechStack
### Changes:
- **Projects.tsx**: Rewrite descriptions to be concise and technical.
- **TechStack.tsx**: Remove "arsenal" metaphor and simplify category descriptions.

## Phase 2: Global Cleanup
### Changes:
- **index.css**: Audit for unused styles.
- **README.md**: Rewrite the intro to match the new professional tone.

## Phase 3: Final Verification
- `npm run build`
