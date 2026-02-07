import asyncio
import os
import sys
from dotenv import load_dotenv
from google import genai
from google.genai import types
from video_stream import YouTubeStreamer

def log(msg):
    print(msg)
    sys.stdout.flush()

async def main():
    load_dotenv()
    api_key = os.getenv('GOOGLE_API_KEY')
    client = genai.Client(api_key=api_key, http_options={'api_version': 'v1alpha'})
    
    streamer = YouTubeStreamer('https://www.youtube.com/watch?v=mHcRPO21qlE')
    
    log('Connecting to Gemini...')
    async with client.aio.live.connect(model='gemini-2.5-flash-native-audio-preview-12-2025', config={'response_modalities': ['AUDIO'], 'system_instruction': 'You are Apex, an elite high-energy sports commentator.'}) as session:
        log('Connected!')
        
        async def receiver():
            try:
                log('Receiver task started.')
                async for response in session.receive():
                    log('--- Received response ---')
                    if response.server_content.model_turn:
                        for part in response.server_content.model_turn.parts:
                            if part.inline_data:
                                log(f'Received audio: {len(part.inline_data.data)} bytes')
                            if part.text:
                                log(f'AI Text: {part.text}')
            except Exception as e:
                log(f'Receiver error: {e}')
        
        asyncio.create_task(receiver())
        
        log('Streaming frames...')
        count = 0
        async for frame in streamer.stream_frames(fps=1):
            log(f'Sending frame {count}...')
            await session.send_realtime_input(media=types.Blob(data=frame, mime_type='image/jpeg'))
            count += 1
            await asyncio.sleep(1)

if __name__ == '__main__':
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        log('Interrupted.')
