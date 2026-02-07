import { expect, test, describe, mock, beforeEach, afterEach } from "bun:test";
import { createServer } from "./index";
import { EventEmitter } from "events";

// Mocking child_process
const mockSpawn = mock(() => {
  const stdout = new EventEmitter();
  const stderr = new EventEmitter();
  return {
    stdout,
    stderr,
    kill: mock(() => {}),
    on: mock(() => {})
  };
});

mock.module("child_process", () => ({
  spawn: mockSpawn
}));

// Mocking ws (Gemini connection)
class MockWebSocket extends EventEmitter {
  readyState = 1; // OPEN
  send = mock(() => {});
  close = mock(() => {});
  constructor() {
    super();
    setTimeout(() => this.emit('open'), 0);
  }
}

mock.module("ws", () => ({
  WebSocket: MockWebSocket
}));

describe("OmniStream AI API Server", () => {
  let server;
  let port = 3001; // Use a different port for tests

  beforeEach(() => {
    server = createServer(port);
  });

  afterEach(() => {
    server.stop();
  });

  test("Upgrade required on root", async () => {
    const response = await fetch(`http://localhost:${port}/`);
    expect(response.status).toBe(426);
  });

  test("Invalid URL rejection", (done) => {
    const ws = new WebSocket(`ws://localhost:${port}/`);
    ws.onopen = () => {
      ws.send(JSON.stringify({ url: "ftp://invalid", prompt: "test" }));
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data.toString());
      expect(data.error).toBe("Invalid URL");
      ws.close();
      done();
    };
  });

  test("Resource cleanup on multiple requests", (done) => {
    const ws = new WebSocket(`ws://localhost:${port}/`);
    let messageCount = 0;
    
    ws.onopen = () => {
      // First request
      ws.send(JSON.stringify({ url: "https://youtube.com/watch?v=1", prompt: "p1" }));
      
      setTimeout(() => {
        // Second request on same socket should trigger cleanup
        ws.send(JSON.stringify({ url: "https://youtube.com/watch?v=2", prompt: "p2" }));
        
        setTimeout(() => {
          // Verify cleanup was called
          expect(mockSpawn).toHaveBeenCalled();
          // The first spawn result's kill should have been called
          const firstSpawnResult = mockSpawn.mock.results[0].value;
          expect(firstSpawnResult.kill).toHaveBeenCalled();
          
          ws.close();
          done();
        }, 100);
      }, 100);
    };
  });

  test("Resource cleanup on socket close", (done) => {
    const ws = new WebSocket(`ws://localhost:${port}/`);
    
    ws.onopen = () => {
      ws.send(JSON.stringify({ url: "https://youtube.com/watch?v=3", prompt: "p3" }));
      
      setTimeout(() => {
        const currentSpawnResult = mockSpawn.mock.results[mockSpawn.mock.results.length - 1].value;
        ws.close();
        
        setTimeout(() => {
          expect(currentSpawnResult.kill).toHaveBeenCalled();
          done();
        }, 100);
      }, 100);
    };
  });
});