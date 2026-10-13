import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [preact()],
  // Source imports React APIs (createRoot, renderToString, hooks); preact/compat
  // provides them so the shipped bundle stays a fraction of react-dom's size.
  resolve: {
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat"
    }
  },
  publicDir: "public",
  server: { port: 5173 },
  build: { rollupOptions: { input: {
    main: resolve(process.cwd(), "index.html")
  } } }
});
