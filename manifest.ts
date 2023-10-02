import { ManifestV3Export, defineManifest } from '@crxjs/vite-plugin'
import { version } from './package.json'

const names = {
  build: 'Text Notes',
  serve: '[DEV] Text Notes'
}

// import to `vite.config.ts`
export default defineManifest((env) => {

  const firefoxProperties = {
    content_security_policy: {
      "extension_pages": "default-src 'self'; script-src 'self'; img-src 'self'"
    },
    browser_specific_settings: {
      gecko: {
        id: "lucasfernando.dev@gmail.com",
        strict_min_version: "42.0"
      }
    },
  }

  const _manifest = {
    manifest_version: 3,
    name: names[env.command],
    version,
    icons: {
      "16": "icone16.png",
      "32": "icone32.png",
      "48": "icone48.png",
      "128": "icone128.png"
    },
    permissions: ["contextMenus", 'scripting', 'activeTab', 'tabs'],
    background: {
      service_worker: 'src/core/browser/scripts/background.ts',
      type: "module"
    },
    action: { "default_popup": "index.html" },
    content_scripts: [
      {
        js: ["src/core/browser/content.tsx"],
        matches: ["<all_urls>"],
      }
    ],
    web_accessible_resources: [{
      matches: ["<all_urls>"],
      resources: ["*.png", "assets/*.css", "fonts/*.ttf"]
    }],
  }

  if(process.env.TARGET === 'moz'){
    return Object.assign(firefoxProperties, _manifest) as any
  }

  return _manifest
})
