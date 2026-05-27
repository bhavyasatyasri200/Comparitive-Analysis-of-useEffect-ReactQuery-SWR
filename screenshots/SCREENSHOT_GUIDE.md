# Screenshot Guide

This directory should contain screenshots from your browser's Network tab that support your findings for deduplication and error/retry tests.

## Required Screenshots

### 1. deduplication.png
Show that a single request is made even when multiple components (User Profile & Post List) require the same data.
- **Library**: React Query or SWR
- **How**: Refresh the page and look for only ONE `/api/user` call in the Network tab.

### 2. retry.png
Show the automatic retry mechanism in action.
- **Library**: React Query
- **How**: 
  1. Open Network tab.
  2. Right-click `/api/posts` -> "Block Request URL".
  3. Refresh.
  4. Notice the **"Retrying attempts..."** indicator in the UI and the multiple failed (red) attempts in the Network tab.
  5. The final error will appear once all retries are exhausted.

---
*Note: This file is a placeholder to guide you. You can delete it once you add your images.*
