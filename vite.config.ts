import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routesDirectory: './src/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
    }),
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
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
