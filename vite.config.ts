import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { chromeExtension, crx } from '@crxjs/vite-plugin'
import manifest from './manifest'
import { writeManifest } from './scripts/firefox'

const build_folder = "../dist/"

// https://vitejs.dev/config/
export default defineConfig((env) => ({
  plugins: [react(), chromeExtension({ manifest }), {
    name: 'Firefox-Manifest-Generator',
    closeBundle: async () => {
      if (process.env.TARGET === 'moz') {
        await writeManifest()
      }
    }
  }],
  build: {
    modulePreload: false,
    outDir: build_folder,
    watch: env.mode === 'watch' ? {
      include: 'src/**',
      exclude: ['node_modules/**', 'dist/**']
    } : undefined,
    chunkSizeWarningLimit: 1600,
  },
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173
    },
    watch: {
      usePolling: true
    }
  },
}))
