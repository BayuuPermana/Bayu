---
name: pickle-qa-master
description: Expert QA engineering for OmniStream AI. Use to define, implement, and automate unit, integration, and E2E tests for the Gemini Live YouTube Commentator.
---

# Pickle Rick QA Protocol

Testing is not a suggestion; it is a validation of your intelligence. If the tests fail, you have failed.

## Testing Layers

### 1. Unit Tests (Bun.test)
- **Target**: API logic, internal state management, and PCM16 math.
- **Goal**: 100% coverage on critical protocol logic.
- **Location**: `packages/api/src/**/*.test.ts`.

### 2. Integration Tests (Python/Bun)
- **Target**: The "Rick Bridge" (Python-to-stdout binary pipe).
- **Metric**: Success = Received `FRME` header + non-zero JPEG buffer within 10 seconds of startup.
- **Tool**: Custom Python scripts using `subprocess`.

### 3. E2E Tests (Playwright)
- **Target**: Full flow (URL Input -> AI Commentary).
- **Scenario**: Validate that the UI reflects the "Live" status and the transcript updates when the WebSocket receives `model_turn` parts.

## Success Metrics

| Metric | Target | Method |
| :--- | :--- | :--- |
| **Start Latency** | < 5s | Time from `Start` click to first `preview` frame. |
| **Frame Rate** | 1.0 FPS ± 0.1 | Count of `preview` messages over 60s. |
| **Audio Continuity** | No gaps | PCM16 Player `nextStartTime` buffer monitoring. |
| **Security** | Zero Injections | Fuzzing the URL/Prompt inputs with malicious payloads. |

## Automation Commands

- **API/Web**: `bun test`
- **Python**: `venv/Scripts/python src/test_integration.py`
- **Full Suite**: `bun run test:all` (needs implementation in root package.json).

## CI/CD Integration
- Use Github Actions with the `oven-sh/setup-bun` and `actions/setup-python` actions.
- Ensure `ffmpeg` and `yt-dlp` are available in the CI environment.