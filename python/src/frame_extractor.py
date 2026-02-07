import cv2
import yt_dlp
import sys
import time

def get_stream_url(youtube_url):
    ydl_opts = {
        'format': 'best[ext=mp4]/best',
        'quiet': True,
        'no_warnings': True,
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(youtube_url, download=False)
        return info['url']

def extract_frames(url, fps=1):
    while True:
        try:
            stream_url = get_stream_url(url)
            cap = cv2.VideoCapture(stream_url)
            
            if not cap.isOpened():
                sys.stderr.write("Error: Could not open stream, retrying in 5s...\n")
                time.sleep(5)
                continue

            interval = 1.0 / fps
            while True:
                ret, frame = cap.read()
                if not ret:
                    sys.stderr.write("Warning: Lost frame, retrying stream...\n")
                    break
                
                # Encode to JPEG
                _, buffer = cv2.imencode('.jpg', frame, [int(cv2.IMWRITE_JPEG_QUALITY), 80])
                
                # Write to stdout with a header for Bun to parse
                # Header: MAGIC(4 bytes) + LENGTH(4 bytes)
                sys.stdout.buffer.write(b'FRME')
                sys.stdout.buffer.write(len(buffer).to_bytes(4, 'big'))
                sys.stdout.buffer.write(buffer.tobytes())
                sys.stdout.buffer.flush()
                
                time.sleep(interval)
                # Skip frames to maintain FPS
                fps_cap = cap.get(cv2.CAP_PROP_FPS)
                if fps_cap > 0:
                    for _ in range(max(0, int(fps_cap * interval) - 1)):
                        cap.grab()
            
            cap.release()
        except Exception as e:
            sys.stderr.write(f"Extractor Exception: {e}, retrying in 5s...\n")
            time.sleep(5)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.stderr.write("Usage: python frame_extractor.py <url> [fps]\n")
        sys.exit(1)
    
    url = sys.argv[1]
    fps = int(sys.argv[2]) if len(sys.argv) > 2 else 1
    extract_frames(url, fps)