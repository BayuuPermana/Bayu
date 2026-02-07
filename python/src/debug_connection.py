import asyncio
import os
from dotenv import load_dotenv
from google import genai

async def test_combo(model, version):
    load_dotenv()
    api_key = os.getenv('GOOGLE_API_KEY')
    client = genai.Client(api_key=api_key, http_options={'api_version': version})
    try:
        async with client.aio.live.connect(model=model, config={'response_modalities': ['AUDIO']}) as session:
            print(f'SUCCESS: {model} on {version}')
            return True
    except Exception as e:
        print(f'FAIL: {model} on {version} - {e}')
        return False

async def main():
    models = ['gemini-3-flash-preview', 'gemini-2.5-flash-native-audio-preview-12-2025']
    versions = ['v1alpha', 'v1beta']
    for m in models:
        for v in versions:
            if await test_combo(m, v):
                return

if __name__ == '__main__':
    asyncio.run(main())
