import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Increase the warning limit so Vercel doesn’t complain about large bundles
    chunkSizeWarningLimit: 1600,

    // Split heavy dependencies into separate chunks
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          mui: ["@mui/material", "@emotion/react", "@emotion/styled"],
          framer: ["framer-motion"],
          recharts: ["recharts"],
        },
      },
    },
  },
});