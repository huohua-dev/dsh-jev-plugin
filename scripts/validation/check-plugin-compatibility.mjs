/** Replicate DSH's plugin compatibility verdict for every supported runtime version. */
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { supportedVersions } from './compatibility-versions.mjs'

// Resolve semver through DSH itself, so this reuses the exact judge DSH applies.
const hostRequire = createRequire(createRequire(import.meta.url).resolve('@deepseek-ai/dsh-app-boot'))
const semver = hostRequire('semver')

const manifests = ['package.json', 'packages/jev/package.json'].map((file) => ({ file, manifest: JSON.parse(readFileSync(new URL(`../../${file}`, import.meta.url), 'utf8')) }))

let failures = 0
for (const version of supportedVersions) {
  for (const { file, manifest } of manifests) {
    const unmet = {}
    const peers = manifest.peerDependencies ?? {}
    for (const [name, range] of Object.entries(peers)) {
      if (name !== '@deepseek-ai/dsh' && !name.startsWith('@deepseek-ai/dsh-')) continue
      if (!semver.satisfies(version, range, { includePrerelease: true })) unmet[name] = range
    }
    const keys = Object.keys(unmet)
    if (keys.length === 0) { console.log(`ok   ${version.padEnd(16)} ${file}`); continue }
    failures += 1
    console.log(`FAIL ${version.padEnd(16)} ${file} -> ${JSON.stringify(unmet)}`)
  }
}
console.log(failures === 0 ? '\nall manifests accepted by every supported runtime' : `\n${failures} incompatible manifest/runtime pairs`)
process.exit(failures === 0 ? 0 : 1)