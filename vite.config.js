import { defineConfig } from "vite";

// base './' keeps asset URLs relative so the built site works from any
// subpath (e.g. https://<user>.github.io/FOR-HER-/). Static files live in
// public/ and are copied to dist verbatim — index.html references stay as-is.
export default defineConfig({
  base: "./",
  server: {
    port: 5173
  },
  preview: {
    port: 4173
  }
});
