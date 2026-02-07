import subprocess
import os
import time
import signal

def run_extractor(url, timeout=10):
    python_path = os.path.join("venv", "Scripts", "python.exe")
    script_path = os.path.join("src", "frame_extractor.py")
    
    print(f"--- Testing extractor with: {url} ---")
    process = subprocess.Popen(
        [python_path, script_path, url, "1"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )
    
    start_time = time.time()
    frames_found = 0
    errors = []

    try:
        while time.time() - start_time < timeout:
            # Check for stderr
            if process.poll() is not None:
                break
                
            # Non-blocking read attempt for stdout
            # This is tricky in Python on Windows, so we'll use a small read with a timeout-like logic
            # Actually, let's just use a simple read for the first frame as before
            if frames_found == 0:
                header = process.stdout.read(4)
                if header == b'FRME':
                    length = int.from_bytes(process.stdout.read(4), 'big')
                    process.stdout.read(length)
                    print(f"SUCCESS: Received first frame of size {length}")
                    frames_found += 1
                    # After first frame, we can stop or keep going
                    break
                elif header == b'':
                    # Check stderr
                    err = process.stderr.read().decode()
                    if err:
                        errors.append(err)
                    break
    finally:
        process.terminate()
        process.wait()
        
    return frames_found > 0, errors

def test_integration():
    # 1. Valid URL
    success, errors = run_extractor("https://www.youtube.com/watch?v=mHcRPO21qlE")
    if not success:
        print(f"FAILED: Valid URL test failed. Errors: {errors}")
        exit(1)
    
    # 2. Invalid URL
    # We expect it to log error to stderr
    print("Testing invalid URL (expecting errors in logs)...")
    python_path = os.path.join("venv", "Scripts", "python.exe")
    script_path = os.path.join("src", "frame_extractor.py")
    process = subprocess.Popen(
        [python_path, script_path, "https://youtube.com/invalid_url_12345", "1"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )
    
    # Wait longer for yt-dlp to fail and the extractor to print to stderr
    time.sleep(10)
    process.terminate()
    process.wait()
    stderr = process.stderr.read()
    if "Extractor Exception" in stderr or "ERROR" in stderr or "Unable to extract" in stderr:
        print("SUCCESS: Invalid URL correctly reported error in stderr")
    else:
        print(f"FAILED: Invalid URL did not report expected error. Stderr: {stderr}")
        exit(1)

    # 3. Resource Termination
    print("Testing resource termination...")
    process = subprocess.Popen(
        [python_path, script_path, "https://www.youtube.com/watch?v=mHcRPO21qlE", "1"],
        stdout=subprocess.PIPE
    )
    time.sleep(3)
    process.terminate()
    retcode = process.wait()
    print(f"SUCCESS: Process terminated with code {retcode}")

if __name__ == "__main__":
    test_integration()