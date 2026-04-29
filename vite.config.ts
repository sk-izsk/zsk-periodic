import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', { compilationMode: 'infer' }]],
      },
    }),
  ],
  optimizeDeps: {
    // Keep Vite pre-bundling focused on the actual app entry.
    entries: ['index.html'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
});
