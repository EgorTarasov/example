import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: "esnext",
    outDir: "../backend/static",
  },
  server: {
    port: 5173,
    proxy: {
      '/': {
        target: 'https://larek.tech',
        changeOrigin: true,
      }
    }
  },
})
