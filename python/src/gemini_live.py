import asyncio
from google import genai
from google.genai import types

class GeminiLiveClient:
    def __init__(self, api_key, model_id='gemini-2.5-flash-native-audio-preview-12-2025'):
        self.client = genai.Client(api_key=api_key, http_options={'api_version': 'v1alpha'})
        self.model_id = model_id
        self.session_ctx = None
        self.session = None

    async def connect(self, system_instruction):
        print(f'Connecting to model: {self.model_id}...')
        config = {'system_instruction': system_instruction, 'response_modalities': ['AUDIO']}
        self.session_ctx = self.client.aio.live.connect(model=self.model_id, config=config)
        self.session = await self.session_ctx.__aenter__()
        return self.session

    async def send_image(self, image_bytes):
        if self.session:
            await self.session.send_realtime_input(
                media=types.Blob(data=image_bytes, mime_type='image/jpeg')
            )

    async def receive_loop(self):
        print('Starting receive loop...')
        async for response in self.session.receive():
            print('Received response from server...')
            if response.server_content.model_turn:
                for part in response.server_content.model_turn.parts:
                    if part.inline_data:
                        yield part.inline_data.data
                    if part.text:
                        print(f'AI Text Response: {part.text}')
            elif response.server_content.turn_complete:
                print('Turn complete.')

    async def close(self):
        if self.session_ctx:
            await self.session_ctx.__aexit__(None, None, None)
