/** Add one Harness release to the plugin's supported version sets and pin dev dependencies to it. */
import { readFileSync, writeFileSync } from 'node:fs'

const TARGET = '0.2.1-rc.1'
const DEV_FROM = '0.2.1-alpha.2'
const CORDIS_FAMILY = {
  '@deepseek-ai/cordis': { peerAppend: '4.0.5', devFrom: '4.0.5-alpha.1', devTo: '4.0.5' },
  '@deepseek-ai/cordis-plugin-loader': { peerAppend: '1.0.6', devFrom: '1.0.6-alpha.1', devTo: '1.0.6' },
  '@deepseek-ai/cordis-plugin-group': { devFrom: '1.0.5-alpha.1', devTo: '1.0.5' },
  '@deepseek-ai/cosmokit': { devFrom: '1.8.6-alpha.1', devTo: '1.8.6' },
  '@deepseek-ai/schemastery': { devFrom: '3.18.5-alpha.1', devTo: '3.18.5' },
}

const changes = []
for (const file of ['package.json', 'packages/jev/package.json']) {
  const manifest = JSON.parse(readFileSync(file, 'utf8'))
  const peers = manifest.peerDependencies ?? {}
  const dev = manifest.devDependencies ?? {}

  for (const [name, range] of Object.entries(peers)) {
    if (name !== '@deepseek-ai/dsh' && !name.startsWith('@deepseek-ai/dsh-')) continue
    if (range.includes(TARGET)) continue
    peers[name] = `${range} || ${TARGET}`
    changes.push(`${file} peer ${name}: ${range} -> ${peers[name]}`)
  }

  for (const [name, version] of Object.entries(dev)) {
    if (name !== '@deepseek-ai/dsh' && !name.startsWith('@deepseek-ai/dsh-')) continue
    if (version !== DEV_FROM) continue
    dev[name] = TARGET
    changes.push(`${file} dev ${name}: ${DEV_FROM} -> ${TARGET}`)
  }

  for (const [name, rule] of Object.entries(CORDIS_FAMILY)) {
    if (peers[name] !== undefined && rule.peerAppend !== undefined && !peers[name].split(' || ').includes(rule.peerAppend)) {
      peers[name] = `${peers[name]} || ${rule.peerAppend}`
      changes.push(`${file} peer ${name}: ${peers[name]}`)
    }
    if (dev[name] !== undefined && dev[name] === rule.devFrom) {
      dev[name] = rule.devTo
      changes.push(`${file} dev ${name}: ${rule.devFrom} -> ${rule.devTo}`)
    }
  }

  writeFileSync(file, `${JSON.stringify(manifest, null, 2)}\n`)
}

console.log(changes.join('\n'))
console.log(`\n${changes.length} entries updated for ${TARGET}`)