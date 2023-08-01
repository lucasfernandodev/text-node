import { defineManifest } from '@crxjs/vite-plugin'
import { version } from './package.json'

const names = {
  build: 'Text Notes',
  serve: '[DEV] Text Notes'
}

// import to `vite.config.ts`
export default defineManifest((env) => ({
  manifest_version: 3,
  name: names[env.command],
  version,
  icons: {
    "16": "icone16.png",
    "32": "icone32.png",
    "48": "icone48.png",
    "128": "icone128.png"
  },
  permissions: ["contextMenus"],
  background: {
    service_worker: 'src/core/chrome/background.ts',
    "type": "module"
  },
  action: { "default_popup": "index.html" },
  content_scripts: [
    {
      js: ["src/core/chrome/content.tsx"],
      "matches": ["<all_urls>"],
    }
  ],
  web_accessible_resources: [{
    "matches": ["<all_urls>"],
    // copies all png files in src/images
    resources: ["*.png", "assets/*.css", "*.ttf"]
  }],
}))
