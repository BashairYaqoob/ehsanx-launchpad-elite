// Writes .output/public/404.html after `vite build`.
//
// TanStack Start's prerenderer only saves pages that answer 200, so the
// not-found page is rendered here instead: start the build's own server (used
// only during the build), request a URL that matches no route, check that it
// answers 404 with the server-rendered not-found page, save that HTML and stop
// the server. The host serves the file with a 404 status for unknown URLs
// (ErrorDocument in public/.htaccess). Because it is the real not-found render,
// it hydrates at any unknown URL without a mismatch.
import { spawn } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { createServer } from "node:net";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const serverEntry = resolve(root, ".output/server/index.mjs");
const target = resolve(root, ".output/public/404.html");
const probePath = "/__ehsanx-not-found__";

function freePort() {
  return new Promise((resolvePort, reject) => {
    const probe = createServer();
    probe.once("error", reject);
    probe.listen(0, "127.0.0.1", () => {
      const { port } = probe.address();
      probe.close(() => resolvePort(port));
    });
  });
}

async function fetchWhenReady(url, attempts = 50) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fetch(url, { redirect: "manual" });
    } catch {
      await new Promise((r) => setTimeout(r, 200));
    }
  }
  throw new Error(`render-404: the build server did not start (${url})`);
}

const port = await freePort();
const server = spawn(process.execPath, [serverEntry], {
  env: { ...process.env, PORT: String(port), HOST: "127.0.0.1", NODE_ENV: "production" },
  stdio: ["ignore", "ignore", "inherit"],
});

try {
  const response = await fetchWhenReady(`http://127.0.0.1:${port}${probePath}`);
  const html = await response.text();
  if (response.status !== 404) throw new Error(`render-404: expected 404, got ${response.status}`);
  if (!html.startsWith("<!DOCTYPE html>") || !html.includes("<main>")) {
    throw new Error("render-404: the response is not the server-rendered not-found page");
  }
  await writeFile(target, html);
  console.log(`render-404: wrote ${target} (${html.length} bytes)`);
} finally {
  server.kill();
}
