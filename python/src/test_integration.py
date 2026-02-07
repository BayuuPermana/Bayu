import subprocess
import os

def test_frame_extractor():
    # Path to our extractor
    python_path = os.path.join("venv", "Scripts", "python.exe")
    script_path = os.path.join("src", "frame_extractor.py")
    test_url = "https://www.youtube.com/watch?v=mHcRPO21qlE"
    
    print(f"Testing extractor with: {test_url}")
    process = subprocess.Popen(
        [python_path, script_path, test_url, "1"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )
    
    # Read first frame
    header = process.stdout.read(4)
    if header != b'FRME':
        process.kill()
        stderr = process.stderr.read()
        raise Exception(f"Failed to get frame header. Stderr: {stderr.decode()}")
    
    length_bytes = process.stdout.read(4)
    length = int.from_bytes(length_bytes, 'big')
    print(f"Found frame with length: {length}")
    
    frame_data = process.stdout.read(length)
    if len(frame_data) != length:
        process.kill()
        raise Exception("Incomplete frame data")
        
    print("SUCCESS: Frame extracted successfully!")
    process.kill()

if __name__ == "__main__":
    try:
        test_frame_extractor()
    except Exception as e:
        print(f"TEST FAILED: {e}")
        exit(1)
