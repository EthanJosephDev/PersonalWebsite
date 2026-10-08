import { defineConfig, type ViteDevServer, type PreviewServer } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import type { IncomingMessage, ServerResponse } from "node:http";

// Match GitHub Pages' directory routing in development and production previews.
function redirectSentinel(
  request: IncomingMessage,
  response: ServerResponse,
  next: () => void,
) {
  const url = new URL(request.url ?? "/", "http://localhost");
  if (url.pathname !== "/sentinel") return next();
  response.writeHead(308, { Location: `/sentinel/${url.search}` });
  response.end();
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/",
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        sentinel: path.resolve(__dirname, "sentinel/index.html"),
      },
    },
  },
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    {
      name: "sentinel-directory-redirect",
      configureServer(server: ViteDevServer) {
        server.middlewares.use(redirectSentinel);
      },
      configurePreviewServer(server: PreviewServer) {
        server.middlewares.use(redirectSentinel);
      },
    },
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
