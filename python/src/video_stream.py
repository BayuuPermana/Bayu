import cv2
import yt_dlp
import time
import asyncio

class YouTubeStreamer:
    def __init__(self, url):
        self.url = url
        self.stream_url = None
        self.cap = None

    def get_stream_url(self):
        ydl_opts = {
            'format': 'best[ext=mp4]/best',
            'quiet': True,
            'no_warnings': True,
        }
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(self.url, download=False)
            self.stream_url = info['url']
        return self.stream_url

    async def stream_frames(self, fps=1):
        if not self.stream_url:
            self.get_stream_url()
        
        self.cap = cv2.VideoCapture(self.stream_url)
        if not self.cap.isOpened():
            print('Error: Could not open video stream.')
            return

        interval = 1.0 / fps
        while self.cap.isOpened():
            ret, frame = self.cap.read()
            if not ret:
                break
            
            # Encode frame to JPEG
            _, buffer = cv2.imencode('.jpg', frame, [int(cv2.IMWRITE_JPEG_QUALITY), 80])
            yield buffer.tobytes()
            
            await asyncio.sleep(interval)
            # Skip frames to keep up with real-time
            for _ in range(int(self.cap.get(cv2.CAP_PROP_FPS) * interval) - 1):
                self.cap.grab()

    def release(self):
        if self.cap:
            self.cap.release()
