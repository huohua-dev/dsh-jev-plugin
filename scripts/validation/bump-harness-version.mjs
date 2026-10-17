/** Move the development baseline to one Harness release and record it as supported.
 *
 * Usage:
 *   node scripts/validation/bump-harness-version.mjs --target 0.2.1-rc.2 [--peer-range "<range>"]
 *
 * DSH judges plugin compatibility per @deepseek-ai/dsh* peer range with
 * semver.satisfies(runtime, range, { includePrerelease: true }) (dsh-app-boot).
 * The declared peer range is therefore a range, not a list of exact releases:
 * pass --peer-range to set it on every DSH peer in both manifests; omit it to
 * verify the existing range already covers the target. The current development
 * version is read from the root manifest's @deepseek-ai/dsh devDependency, and
 * every DSH devDependency pinned to it moves to the target; matching
 * pnpm-workspace.yaml minimumReleaseAgeExclude unions gain the target.
 * @deepseek-ai/dsh-typert-generator is excluded from the baseline: it is pinned
 * to 0.2.1-alpha.2 because the 0.2.1-rc generator rejects merged protocol
 * declarations from installed peers outside this external workspace face (see
 * packages/typert-protocol-reference/README.md).
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { parseArgs } from 'node:util'
import { supportedVersions } from './compatibility-versions.mjs'

const { values } = parseArgs({
  options: {
    target: { type: 'string' },
    'peer-range': { type: 'string' },
  },
})
const TARGET = values.target
if (!TARGET) throw new Error('Usage: node scripts/validation/bump-harness-version.mjs --target <exact DSH version> [--peer-range "<range>"]')
const PEER_RANGE = values['peer-range']

// Resolve semver through DSH itself, so range checks reuse the host's exact judge.
const hostRequire = createRequire(createRequire(import.meta.url).resolve('@deepseek-ai/dsh-app-boot'))
const semver = hostRequire('semver')
if (!semver.valid(TARGET)) throw new Error(`--target must be an exact DSH version, got ${JSON.stringify(TARGET)}`)

const DEV_BASELINE_EXCLUSIONS = new Set(['@deepseek-ai/dsh-typert-generator'])
const isDshPackage = (name) => name === '@deepseek-ai/dsh' || name.startsWith('@deepseek-ai/dsh-')
const satisfies = (version, range) => semver.satisfies(version, range, { includePrerelease: true })

const manifests = ['package.json', 'packages/jev/package.json'].map((file) => ({
  file,
  manifest: JSON.parse(readFileSync(new URL(`../../${file}`, import.meta.url), 'utf8')),
}))
const devFrom = manifests[0].manifest.devDependencies?.['@deepseek-ai/dsh']
if (!devFrom || !semver.valid(devFrom)) throw new Error(`Root devDependency @deepseek-ai/dsh must pin the current development version, got ${JSON.stringify(devFrom)}`)

if (PEER_RANGE !== undefined && !semver.validRange(PEER_RANGE)) throw new Error(`--peer-range is not a valid semver range: ${JSON.stringify(PEER_RANGE)}`)

const changes = []
for (const { file, manifest } of manifests) {
  const peers = manifest.peerDependencies ?? {}
  const dev = manifest.devDependencies ?? {}

  for (const [name, range] of Object.entries(peers)) {
    if (!isDshPackage(name)) continue
    if (PEER_RANGE !== undefined && range !== PEER_RANGE) {
      for (const version of supportedVersions) {
        if (satisfies(version, range) && !satisfies(version, PEER_RANGE)) {
          throw new Error(`${file} peer ${name}: --peer-range ${JSON.stringify(PEER_RANGE)} would drop previously supported ${version}; refusing to narrow the declared range`)
        }
      }
      peers[name] = PEER_RANGE
      changes.push(`${file} peer ${name}: ${range} -> ${PEER_RANGE}`)
    }
    if (!satisfies(TARGET, peers[name])) {
      throw new Error(`${file} peer ${name}: declared range ${JSON.stringify(peers[name])} does not accept ${TARGET}; pass --peer-range to update it`)
    }
  }

  for (const [name, version] of Object.entries(dev)) {
    if (!isDshPackage(name) || DEV_BASELINE_EXCLUSIONS.has(name) || version !== devFrom) continue
    dev[name] = TARGET
    changes.push(`${file} dev ${name}: ${devFrom} -> ${TARGET}`)
  }

  writeFileSync(new URL(`../../${file}`, import.meta.url), `${JSON.stringify(manifest, null, 2)}\n`)
}

if (devFrom !== TARGET) {
  // pnpm's minimumReleaseAgeExclude accepts unions of exact versions only (no
  // ranges), and the pre-bump lockfile is verified against it during the first
  // install, so append the target instead of replacing the previous version.
  const workspaceFile = new URL('../../pnpm-workspace.yaml', import.meta.url)
  const before = readFileSync(workspaceFile, 'utf8')
  const after = before
    .replaceAll(`@${devFrom}'`, `@${devFrom} || ${TARGET}'`)
    .replaceAll(`|| ${devFrom}'`, `|| ${devFrom} || ${TARGET}'`)
  if (after !== before) {
    writeFileSync(workspaceFile, after)
    changes.push(`pnpm-workspace.yaml minimumReleaseAgeExclude: + ${TARGET}`)
  }
}

if (!supportedVersions.includes(TARGET)) {
  const file = new URL('./compatibility-versions.mjs', import.meta.url)
  const list = [...supportedVersions, TARGET].map((version) => `'${version}'`).join(', ')
  writeFileSync(file, `/** Official DSH releases exercised by compatibility validation. */\nexport const supportedVersions = [${list}]\n`)
  changes.push(`scripts/validation/compatibility-versions.mjs: + ${TARGET}`)
}

console.log(changes.join('\n'))
console.log(`\n${changes.length} entries updated for ${TARGET}`)
console.log('Next: pnpm install, pnpm run check:compat, pnpm run typecheck, pnpm test, pnpm run build, pnpm run test:compatibility')
