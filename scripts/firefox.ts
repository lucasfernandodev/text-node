import fs from 'fs/promises';
type web_accessible_resources = Record<string, unknown>

export async function writeManifest() {
  const manifest_path = `../dist/manifest.json`
  try {
    await fs.access(manifest_path, fs.constants.F_OK)

    const module = await fs.readFile(manifest_path)
    const manifest = JSON.parse(module.toString() || '[]')

    if (manifest.background && manifest.background.service_worker) {
      manifest.background.scripts = [manifest.background.service_worker]
      delete manifest.background.service_worker

      if (manifest.web_accessible_resources) {
        manifest.web_accessible_resources = manifest.web_accessible_resources.filter((item: web_accessible_resources) => {
          const options = item
          delete options.use_dynamic_url
          return options
        })
      }

      await fs.writeFile(manifest_path, JSON.stringify(manifest, null, 2))
    }
  } catch (error) {
    console.log(error)
  }

}
