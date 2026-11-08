import path from "node:path";

import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

// Plugin order matters: TanStack Start must run before the React plugin.
export default defineConfig(({ command, isPreview }) => ({
  plugins: [
    tailwindcss(),
    tanstackStart({
      // src/server.ts wraps TanStack Start's server entry with the SSR error page.
      server: { entry: "server" },
      // Keep server-only modules out of the client bundle.
      importProtection: {
        behavior: "error",
        client: { files: ["**/server/**"], specifiers: ["server-only"] },
      },
    }),
    // Nitro produces the deployable server in .output/. Without a preset it
    // auto-detects the hosting provider (Vercel, Netlify, Cloudflare, …) and
    // falls back to a Node server. Pin one with NITRO_PRESET or `preset` here.
    // `vite preview` also needs it to serve that build.
    ...(command === "build" || isPreview ? [nitro()] : []),
    viteReact(),
  ],
  css: { transformer: "lightningcss" },
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "src") },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  server: { port: 8080 },
}));
