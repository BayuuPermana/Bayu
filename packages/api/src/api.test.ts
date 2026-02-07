import { expect, test, describe } from "bun:test";

describe("OmniStream AI API", () => {
  test("WebSocket server is listening", async () => {
    const response = await fetch("http://localhost:3000/");
    expect(response.status).toBe(426); // Upgrade Required
  });

  test("WebSocket handshake fails for invalid URLs", (done) => {
    const ws = new WebSocket("ws://localhost:3000/");
    ws.onopen = () => {
      ws.send(JSON.stringify({ url: "not-a-url", prompt: "test" }));
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data.toString());
      if (data.error) {
        expect(data.error).toBe("Invalid URL");
        ws.close();
        done();
      }
    };
  });
});
