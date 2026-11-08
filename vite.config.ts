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
      // Production is static hosting (Hostinger, no Node.js). Every route is
      // rendered to HTML at build time; routes are discovered from src/routes
      // and internal links are crawled. A failed page fails the build.
      // The not-found page (404.html) is rendered after this step by
      // scripts/render-404.mjs, because the prerenderer only accepts 200s.
      prerender: { enabled: true, crawlLinks: true, failOnError: true },
    }),
    // Nitro builds the server that renders the pages above during the build.
    // Its preset is auto-detected: a Node server locally (used only at build
    // time; `npm run build:hostinger` then deploys .output/public alone, with no
    // server at runtime) and Vercel's format on the temporary Vercel preview.
    // Nitro's "static" preset omits the server bundle TanStack Start renders
    // with, so it cannot be used here. `vite preview` also needs Nitro.
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
