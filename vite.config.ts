import { defineConfig } from 'vite'
import path from 'path'
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
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@hook": path.resolve(__dirname,"./src/hooks"),
      "@core": path.resolve(__dirname, "./src/core"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@styles": path.resolve(__dirname, "./src/style"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@database": path.resolve(__dirname, "./src/database"),
      "@context": path.resolve(__dirname, "./src/context"),
    }
  }
}))
