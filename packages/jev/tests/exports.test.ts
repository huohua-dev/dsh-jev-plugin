/** Every published subpath must resolve to a file the shipped bundle actually contains. */

import { access } from 'node:fs/promises'
import { resolve } from 'node:path'
import { expect, it } from 'vitest'
import rootManifest from '../../../package.json' with { type: 'json' }
import jevManifest from '../package.json' with { type: 'json' }

interface Manifest {
  exports: Record<string, { types?: string, default?: string } | string>
}

const exists = (path: string) => access(path).then(() => true, () => false)

function entriesOf(manifest: Manifest): [string, string][] {
  const found: [string, string][] = []
  for (const [subpath, target] of Object.entries(manifest.exports)) {
    const entry = typeof target === 'string' ? { default: target } : target
    for (const [condition, file] of Object.entries(entry)) {
      if (file !== undefined) found.push([`${subpath} (${condition})`, file])
    }
  }
  return found
}

// A manifest can name a bundle file the build never produced: 0.2.1-rc.1 drops the ./mcp-selection
// entry point the moment it merges away, and DSH then refuses to load the plugin with
// ERR_PACKAGE_PATH_NOT_EXPORTED. Hold both manifests to the files they actually ship.
// ./typert and ./remote are emitted by scripts/generate-typert.mjs, which 0.2.1-rc.1 currently
// blocks; their shipped counterparts under runtime/ are covered by the root case above.
const GENERATED = new Set(['./typert', './remote'])

it.each([
  ['root', rootManifest as Manifest, '', new Set<string>()],
  ['packages/jev', jevManifest as Manifest, 'packages/jev', GENERATED],
])('resolves every %s export to a file that exists', async (_name, manifest, prefix, generated) => {
  const missing = (await Promise.all(entriesOf(manifest)
    .filter(([label]) => ![...generated].some(subpath => label.startsWith(subpath)))
    .map(async ([label, file]) => await exists(resolve(prefix, file)) ? undefined : `${label} -> ${file}`)))
    .filter((entry): entry is string => entry !== undefined)
  expect(missing).toEqual([])
})

it('keeps the mcp-selection entry point reachable, which the 0.2.1-rc.1 merge once dropped', async () => {
  expect((rootManifest as Manifest).exports['./mcp-selection']).toBeDefined()
  expect((jevManifest as Manifest).exports['./mcp-selection']).toBeDefined()
})