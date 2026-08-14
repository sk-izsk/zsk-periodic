import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import babel from '@rolldown/plugin-babel'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    vanillaExtractPlugin(),
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routesDirectory: './src/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
    }),
    react(),
    babel({ presets: [reactCompilerPreset({ compilationMode: 'infer' })] }),
  ],
  optimizeDeps: {
    // Keep Vite pre-bundling focused on the actual app entry.
    entries: ['index.html'],
  },
  build: {
    chunkSizeWarningLimit: 1024,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'vendor-three',
              test: /node_modules\/three/,
            },
            {
              name: 'vendor-react-three',
              test: /node_modules\/@react-three/,
            },
            {
              name: 'vendor-pdf',
              test: /node_modules\/(jspdf|html2canvas|dompurify)/,
            },
            {
              name: 'vendor-i18n',
              test: /node_modules\/(i18next|react-i18next|zsk-react-i18n)/,
            },
          ],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    css: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
