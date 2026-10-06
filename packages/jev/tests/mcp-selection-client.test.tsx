// @vitest-environment jsdom
/** MCP settings use only fixed Host form snapshots; no service or installation runs. */

import React from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { ConfigForm, ConfigFormSnapshot } from '@deepseek-ai/dsh-client-ui-settings/client'
import type { McpSelectionConfigValues } from '../src/mcp-selection-types.ts'
import { McpSelectionSettings } from '../src/client/McpSelectionSettings.tsx'
import { JevPage, type JevConfigValues, type JevPageRemote } from '../src/client/JevPage.tsx'
import { en, zh, type JevLocaleKey } from '../src/client/locales.ts'

vi.mock('@deepseek-ai/dsh-client-ui-primitives', () => ({
  Button: ({ children, variant: _variant, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string }) => <button type="button" {...props}>{children}</button>,
  StateDot: () => <span aria-hidden="true" />,
  Switch: ({ checked, onChange, label, disabled }: { checked: boolean; onChange: (value: boolean) => void; label: string; disabled?: boolean }) => <button type="button" role="switch" aria-label={label} aria-checked={checked} disabled={disabled} onClick={() => { onChange(!checked) }} />,
  SegmentedTabs: ({ items, value, onChange, label }: { items: readonly { value: string; label: string }[]; value: string; onChange: (value: string) => void; label: string }) => <div role="tablist" aria-label={label}>{items.map(item => <button type="button" role="tab" key={item.value} aria-selected={value === item.value} onClick={() => { onChange(item.value) }}>{item.label}</button>)}</div>,
}))

afterEach(cleanup)

const defaults: McpSelectionConfigValues = {
  toolLimit: 12, minProbability: 0.5, allowZero: true, pinnedTools: [], waitMs: 4000, maxRequestChars: 48000,
}
const t = (key: JevLocaleKey) => en[key]

function formStub<T extends object>(initial: T, options: { status?: ConfigFormSnapshot<T>['status']; writable?: boolean } = {}) {
  let snapshot: ConfigFormSnapshot<T> = {
    status: options.status ?? 'ready', value: options.status === 'loading' || options.status === 'unavailable' ? undefined : initial,
    base: {}, user: {}, revision: 4, writable: options.writable ?? true, mode: 'host',
  }
  const listeners = new Set<() => void>()
  const publish = () => { for (const listener of listeners) listener() }
  const mutate = vi.fn(async (ops: readonly { op: string; path: readonly string[]; value?: unknown }[], revision?: number) => {
    if (revision !== snapshot.revision || !snapshot.value) return false
    const value = { ...snapshot.value }
    for (const op of ops) if (op.op === 'set') Object.assign(value, { [op.path[0]!]: op.value })
    snapshot = { ...snapshot, value, revision: snapshot.revision! + 1 }
    publish()
    return true
  })
  const form: ConfigForm<T> = {
    getSnapshot: () => snapshot, subscribe: listener => { listeners.add(listener); return () => { listeners.delete(listener) } },
    mutate, set: async () => false, unset: async () => false,
  }
  return {
    form, mutate,
    load: (value: T) => { snapshot = { ...snapshot, value, status: 'ready', revision: snapshot.revision! + 1 }; publish() },
  }
}

function setup(options: Parameters<typeof formStub<McpSelectionConfigValues>>[1] = {}) {
  const stub = formStub(defaults, options)
  const notifySuccess = vi.fn()
  render(<McpSelectionSettings form={stub.form} notifySuccess={notifySuccess} t={t} />)
  return { ...stub, notifySuccess }
}

const change = (label: JevLocaleKey, value: string) => { fireEvent.change(screen.getByLabelText(en[label]), { target: { value } }) }
const save = () => { fireEvent.click(screen.getByRole('button', { name: en.saveMcpSelection })) }

describe('MCP selection settings', () => {
  it('shows Host defaults, scope and budget explanations without saving or enabling anything', () => {
    const { mutate } = setup()
    expect((screen.getByLabelText(en.mcpToolLimit) as HTMLInputElement).value).toBe('12')
    expect((screen.getByLabelText(en.mcpMinProbability) as HTMLInputElement).value).toBe('0.5')
    expect((screen.getByLabelText(en.mcpWaitMs) as HTMLInputElement).value).toBe('4000')
    expect((screen.getByLabelText(en.mcpMaxRequestChars) as HTMLInputElement).value).toBe('48000')
    expect((screen.getByLabelText(en.mcpPinnedTools) as HTMLTextAreaElement).value).toBe('')
    expect(screen.getByRole('switch', { name: en.mcpAllowZero }).getAttribute('aria-checked')).toBe('true')
    expect(screen.getByText(en.mcpSelectionHint)).toBeTruthy()
    expect(screen.getByText(en.mcpSelectionBudgetHint)).toBeTruthy()
    expect((screen.getByRole('button', { name: en.saveMcpSelection }) as HTMLButtonElement).disabled).toBe(true)
    expect(mutate).not.toHaveBeenCalled()
  })

  it('saves all six values with the current revision and normalizes pinned names', async () => {
    const { form, mutate, notifySuccess } = setup()
    change('mcpToolLimit', '0')
    change('mcpMinProbability', '0')
    change('mcpWaitMs', '1')
    change('mcpMaxRequestChars', '2048')
    change('mcpPinnedTools', '  mcp__files__read  \n\n mcp__search__query\nmcp__files__read\n')
    save()
    await waitFor(() => { expect(notifySuccess).toHaveBeenCalledWith(en.mcpSelectionSaved) })
    expect(mutate).toHaveBeenCalledWith([
      { op: 'set', path: ['toolLimit'], value: 0 }, { op: 'set', path: ['minProbability'], value: 0 },
      { op: 'set', path: ['waitMs'], value: 1 }, { op: 'set', path: ['maxRequestChars'], value: 2048 },
      { op: 'set', path: ['allowZero'], value: true },
      { op: 'set', path: ['pinnedTools'], value: ['mcp__files__read', 'mcp__search__query'] },
    ], 4)
    expect(form.getSnapshot().value?.pinnedTools).toEqual(['mcp__files__read', 'mcp__search__query'])
    expect((screen.getByLabelText(en.mcpPinnedTools) as HTMLTextAreaElement).value).toBe('mcp__files__read\nmcp__search__query')
    expect((screen.getByRole('button', { name: en.saveMcpSelection }) as HTMLButtonElement).disabled).toBe(true)
  })

  it('accepts inclusive upper bounds and saving an empty pin list', async () => {
    const { form, mutate } = setup()
    change('mcpToolLimit', '1000')
    change('mcpMinProbability', '1')
    change('mcpWaitMs', '300000')
    change('mcpMaxRequestChars', '1000000')
    change('mcpPinnedTools', ' \n\n ')
    save()
    await waitFor(() => { expect(mutate).toHaveBeenCalledTimes(1) })
    expect(form.getSnapshot().value).toEqual({ ...defaults, toolLimit: 1000, minProbability: 1, waitMs: 300000, maxRequestChars: 1000000 })
  })

  it.each([
    ['mcpToolLimit', '-1', 'mcpToolLimitInvalid'], ['mcpToolLimit', '1001', 'mcpToolLimitInvalid'],
    ['mcpToolLimit', '1.5', 'mcpToolLimitInvalid'], ['mcpToolLimit', '', 'mcpToolLimitInvalid'],
    ['mcpMinProbability', '-0.1', 'mcpProbabilityInvalid'], ['mcpMinProbability', '1.01', 'mcpProbabilityInvalid'],
    ['mcpMinProbability', '', 'mcpProbabilityInvalid'], ['mcpWaitMs', '0', 'mcpWaitInvalid'],
    ['mcpWaitMs', '300001', 'mcpWaitInvalid'], ['mcpWaitMs', '1.5', 'mcpWaitInvalid'],
    ['mcpMaxRequestChars', '2047', 'mcpRequestInvalid'], ['mcpMaxRequestChars', '1000001', 'mcpRequestInvalid'],
    ['mcpMaxRequestChars', '2048.5', 'mcpRequestInvalid'], ['mcpPinnedTools', 'mcp__files__*', 'mcpPinsInvalid'],
    ['mcpPinnedTools', 'mcp__files__?', 'mcpPinsInvalid'], ['mcpPinnedTools', 'mcp__[ab]__read', 'mcpPinsInvalid'],
  ] as const)('rejects %s = %s with an associated recovery message', (label, value, error) => {
    const { mutate } = setup()
    change(label, value)
    save()
    const input = screen.getByLabelText(en[label])
    expect(input.getAttribute('aria-invalid')).toBe('true')
    expect(document.getElementById(input.getAttribute('aria-describedby')!.split(' ').at(-1)!)?.textContent).toBe(en[error])
    expect(screen.getByRole('alert').textContent).toBe(en[error])
    expect(mutate).not.toHaveBeenCalled()
  })

  it('rejects zero budget with zero selections disallowed, then allows explicit correction', async () => {
    const { mutate } = setup()
    change('mcpToolLimit', '0')
    fireEvent.click(screen.getByRole('switch', { name: en.mcpAllowZero }))
    save()
    expect(screen.getByRole('alert').textContent).toBe(en.mcpZeroInvalid)
    expect(mutate).not.toHaveBeenCalled()
    change('mcpToolLimit', '1')
    save()
    await waitFor(() => { expect(mutate).toHaveBeenCalledWith(expect.arrayContaining([
      { op: 'set', path: ['allowZero'], value: false }, { op: 'set', path: ['toolLimit'], value: 1 },
    ]), 4) })
  })

  it.each(['refused', 'thrown'] as const)('retains edits and permits retry after a %s save', async failure => {
    const { mutate, notifySuccess } = setup()
    if (failure === 'refused') mutate.mockResolvedValueOnce(false)
    else mutate.mockRejectedValueOnce(new Error('fixture rejection'))
    change('mcpToolLimit', '18')
    save()
    expect(await screen.findByText(en.mcpSelectionSaveFailed)).toBeTruthy()
    expect((screen.getByLabelText(en.mcpToolLimit) as HTMLInputElement).value).toBe('18')
    expect(notifySuccess).not.toHaveBeenCalled()
    save()
    await waitFor(() => { expect(notifySuccess).toHaveBeenCalledOnce() })
    expect(screen.queryByText(en.mcpSelectionSaveFailed)).toBeNull()
  })

  it('disables all controls during a pending save and prevents duplicate writes', async () => {
    const { mutate } = setup()
    let settle!: (accepted: boolean) => void
    mutate.mockImplementationOnce(() => new Promise<boolean>(resolve => { settle = resolve }))
    change('mcpToolLimit', '18')
    save()
    expect((screen.getByRole('button', { name: en.saving }) as HTMLButtonElement).disabled).toBe(true)
    for (const input of screen.getAllByRole('spinbutton')) expect((input as HTMLInputElement).disabled).toBe(true)
    expect((screen.getByLabelText(en.mcpPinnedTools) as HTMLTextAreaElement).disabled).toBe(true)
    expect((screen.getByRole('switch') as HTMLButtonElement).disabled).toBe(true)
    fireEvent.click(screen.getByRole('button', { name: en.saving }))
    expect(mutate).toHaveBeenCalledTimes(1)
    await act(async () => { settle(false) })
    expect(screen.getByText(en.mcpSelectionSaveFailed)).toBeTruthy()
  })

  it('hydrates loading snapshots, follows pristine refreshes, and preserves edits across revisions', async () => {
    const { load, mutate } = setup({ status: 'loading' })
    expect(screen.getByRole('status', { name: en.loading })).toBeTruthy()
    expect(screen.queryByRole('spinbutton')).toBeNull()
    act(() => { load(defaults) })
    act(() => { load({ ...defaults, toolLimit: 20 }) })
    expect((screen.getByLabelText(en.mcpToolLimit) as HTMLInputElement).value).toBe('20')
    change('mcpToolLimit', '18')
    act(() => { load({ ...defaults, toolLimit: 30 }) })
    expect((screen.getByLabelText(en.mcpToolLimit) as HTMLInputElement).value).toBe('18')
    save()
    await waitFor(() => { expect(mutate).toHaveBeenCalledWith(expect.arrayContaining([{ op: 'set', path: ['toolLimit'], value: 18 }]), 7) })
  })

  it('shows read-only settings without permitting edits', () => {
    const { mutate } = setup({ writable: false })
    expect(screen.getByText(en.readOnly)).toBeTruthy()
    expect((screen.getByRole('switch') as HTMLButtonElement).disabled).toBe(true)
    expect((screen.getByLabelText(en.mcpPinnedTools) as HTMLTextAreaElement).disabled).toBe(true)
    for (const input of screen.getAllByRole('spinbutton')) expect((input as HTMLInputElement).disabled).toBe(true)
    save()
    expect(mutate).not.toHaveBeenCalled()
  })

  it('shows unavailable settings without fabricated defaults or a save action', () => {
    const { mutate } = setup({ status: 'unavailable' })
    expect(screen.getByText(en.unavailable)).toBeTruthy()
    expect(screen.queryByRole('spinbutton')).toBeNull()
    expect(screen.queryByRole('button', { name: en.saveMcpSelection })).toBeNull()
    expect(mutate).not.toHaveBeenCalled()
  })

  it.each([en, zh])('localizes the feature and keeps it disabled while its independent settings are saved', async locale => {
    const main = formStub<JevConfigValues>({ baseUrl: '', model: 'fixture', credentialRef: 'FIXTURE_KEY', timeoutMs: 30000, features: {} })
    const mcp = formStub(defaults)
    const jev: JevPageRemote = {
      listFeatures: vi.fn(async () => [{ id: 'mcp-selection', name: 'Host name', description: 'Host description', enabled: false }]),
      listRecords: vi.fn(async () => ({ items: [] })), getRecord: vi.fn(async () => null),
      testConnection: vi.fn(async () => ({ ok: true, latencyMs: 0, recordId: 'fixture' })),
      getCredentialStatus: vi.fn(async () => ({ configured: false, writable: true })),
      setCredential: vi.fn(async () => ({ configured: true, writable: true })),
    }
    const notifySuccess = vi.fn()
    render(<JevPage view="page" form={main.form} mcpSelectionForm={mcp.form} jev={jev} notifySuccess={notifySuccess} t={key => locale[key]} />)
    expect(await screen.findByText(locale.mcpSelectionName)).toBeTruthy()
    expect(screen.getByText(locale.mcpSelectionDescription)).toBeTruthy()
    const toggle = screen.getByRole('switch', { name: `${locale.enable} ${locale.mcpSelectionName}` })
    expect(toggle.getAttribute('aria-checked')).toBe('false')
    fireEvent.change(screen.getByLabelText(locale.mcpToolLimit), { target: { value: '24' } })
    fireEvent.click(screen.getByRole('button', { name: locale.saveMcpSelection }))
    await waitFor(() => { expect(notifySuccess).toHaveBeenCalledWith(locale.mcpSelectionSaved) })
    expect(main.mutate).not.toHaveBeenCalled()
    expect(jev.testConnection).not.toHaveBeenCalled()
    expect(jev.setCredential).not.toHaveBeenCalled()
    expect(toggle.getAttribute('aria-checked')).toBe('false')
  })
})
