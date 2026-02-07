import asyncio
from video_stream import YouTubeStreamer
import cv2

async def test():
    youtube_url = 'https://www.youtube.com/watch?v=mHcRPO21qlE'
    streamer = YouTubeStreamer(youtube_url)
    print('Extracting stream URL...')
    url = streamer.get_stream_url()
    print(f'Stream URL: {url[:100]}...')
    
    print('Starting frame capture...')
    async for frame in streamer.stream_frames(fps=1):
        print(f'Captured frame of size: {len(frame)} bytes')
        break # Just one for now
    streamer.release()

if __name__ == '__main__':
    asyncio.run(test())
