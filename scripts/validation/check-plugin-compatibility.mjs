/** Replicate DSH's plugin compatibility verdict for every supported runtime version.
 *
 * Also pins the declared-range policy with hypothetical runtimes: unreleased
 * 0.2.x versions must be accepted (a routine DSH upgrade inside the declared
 * bound must not read as "incompatible"), while versions outside the declared
 * bound must stay rejected. If the bound is ever moved on purpose, update these
 * lists together with the peer ranges.
 */
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { supportedVersions } from './compatibility-versions.mjs'

// Resolve semver through DSH itself, so this reuses the exact judge DSH applies.
const hostRequire = createRequire(createRequire(import.meta.url).resolve('@deepseek-ai/dsh-app-boot'))
const semver = hostRequire('semver')

const manifests = ['package.json', 'packages/jev/package.json'].map((file) => ({ file, manifest: JSON.parse(readFileSync(new URL(`../../${file}`, import.meta.url), 'utf8')) }))

const hypotheticalInside = ['0.2.1-rc.99', '0.2.1', '0.2.2-rc.1', '0.2.9']
const hypotheticalOutside = ['0.1.6', '0.2.1-alpha.1', '0.3.0-alpha.1', '0.3.0']

let failures = 0
const check = (version, expected) => {
  for (const { file, manifest } of manifests) {
    const unmet = {}
    const peers = manifest.peerDependencies ?? {}
    for (const [name, range] of Object.entries(peers)) {
      if (name !== '@deepseek-ai/dsh' && !name.startsWith('@deepseek-ai/dsh-')) continue
      if (!semver.satisfies(version, range, { includePrerelease: true })) unmet[name] = range
    }
    const accepted = Object.keys(unmet).length === 0
    if (accepted === expected) { console.log(`ok   ${version.padEnd(16)} ${file}`); continue }
    failures += 1
    console.log(`FAIL ${version.padEnd(16)} ${file} expected ${expected ? 'accepted' : 'rejected'} -> ${JSON.stringify(unmet)}`)
  }
}
for (const version of supportedVersions) check(version, true)
for (const version of hypotheticalInside) check(version, true)
for (const version of hypotheticalOutside) check(version, false)
console.log(failures === 0 ? '\nall manifests accepted by every supported runtime' : `\n${failures} incompatible manifest/runtime pairs`)
process.exit(failures === 0 ? 0 : 1)
