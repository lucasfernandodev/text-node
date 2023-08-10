import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { chromeExtension, crx } from '@crxjs/vite-plugin'
import manifest from './manifest'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), chromeExtension({ manifest })],
  build: {
    modulePreload: false,
    outDir: '../dist/'
  },
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
    watch: {
      usePolling: true
    }
  },
})
