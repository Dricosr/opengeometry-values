import { afterEach, describe, expect, it } from "vitest";
import { createDemoApp } from "../../demo/create-demo-app.mjs";

const activeServers = [];

afterEach(async () => {
  await Promise.all(activeServers.splice(0).map((server) => new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  })));
});

const startServer = async (app) => {
  const server = app.listen(0);
  activeServers.push(server);

  await new Promise((resolve) => {
    server.once("listening", resolve);
  });

  const address = server.address();
  return `http://127.0.0.1:${address.port}`;
};

describe("createDemoApp", () => {
  it("serves the sample and preset library for the web UI", async () => {
    const baseUrl = await startServer(createDemoApp({
      visualTestRunner: async () => ({
        ok: true,
        exitCode: 0,
        stdout: "visual tests passed",
        stderr: ""
      })
    }));

    const response = await fetch(`${baseUrl}/api/library`);
    const payload = await response.json();

    expect(response.ok).toBe(true);
    expect(Array.isArray(payload.quantities)).toBe(true);
    expect(Object.keys(payload.samples)).toContain("length");
    expect(Object.keys(payload.samples)).toContain("ratio");
    expect(Object.keys(payload.outputPresets)).toContain("pressure");
    expect(payload.samples.length.length).toBeGreaterThanOrEqual(4);
    expect(payload.outputPresets.length.length).toBeGreaterThanOrEqual(3);
  });

  it("returns live preview payloads and visual test execution results", async () => {
    const baseUrl = await startServer(createDemoApp({
      visualTestRunner: async () => ({
        ok: true,
        exitCode: 0,
        stdout: "visual tests passed",
        stderr: ""
      })
    }));

    const previewResponse = await fetch(`${baseUrl}/api/preview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        parameter: {
          id: "length:beam-span",
          name: "Beam Span",
          quantity: "length",
          valueType: "float",
          input: {
            value: 7200,
            unit: "mm"
          }
        },
        output: {
          presetId: "length:annotation-meter"
        }
      })
    });
    const previewPayload = await previewResponse.json();

    expect(previewResponse.ok).toBe(true);
    expect(previewPayload.preview.previews.display).toBe("7.200 m");

    const testResponse = await fetch(`${baseUrl}/api/visual-tests/run`, {
      method: "POST"
    });
    const testPayload = await testResponse.json();

    expect(testResponse.ok).toBe(true);
    expect(testPayload.stdout).toContain("visual tests passed");
  });
});