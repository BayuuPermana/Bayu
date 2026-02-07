# OmniStream AI API Documentation

## WebSocket Endpoints

### `GET /api/live`

Initializes a real-time Gemini Live commentary session for a YouTube stream.

#### Connection Lifecycle
1. **Handshake**: Client connects via standard WebSocket.
2. **Configuration**: Client sends a JSON configuration object.
3. **Streaming**: Server starts extracting frames from YouTube and proxying them to Gemini.
4. **Response**: Server forwards Gemini's audio (PCM16) and text responses to the client.

#### Input Message (JSON)
| Field | Type | Description |
| :--- | :--- | :--- |
| `url` | `string` | Valid YouTube Video URL. |
| `prompt` | `string` | System instructions to define the AI's persona. |

#### Output Messages (JSON)

##### 1. Video Preview
Sent whenever a frame is captured from the stream.
```json
{
  "type": "preview",
  "data": "base64_encoded_jpeg_string"
}
```

##### 2. Gemini Live Response
Standard Gemini Multimodal Live API response chunks.
- **Audio**: Found in `server_content.model_turn.parts[].inline_data.data` (base64 PCM16).
- **Text**: Found in `server_content.model_turn.parts[].text`.

#### Error Handling
- Invalid YouTube URLs will trigger a retry loop in the backend (visible in server logs).
- API Key issues or Gemini service interruptions will close the WebSocket connection.
