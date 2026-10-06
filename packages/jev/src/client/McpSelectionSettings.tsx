/** Profile-scoped native MCP definition selection; saving never enables the feature. */

import React, { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { Button, StateDot, Switch } from '@deepseek-ai/dsh-client-ui-primitives'
import type { ConfigForm } from '@deepseek-ai/dsh-client-ui-settings/client'
import { isMcpPublicName, type McpSelectionConfigValues } from '../mcp-selection-types.ts'
import type { JevLocaleKey } from './locales.ts'
import css from './JevPage.module.css'

type NumericField = 'toolLimit' | 'minProbability' | 'waitMs' | 'maxRequestChars'
type Draft = Record<NumericField, string> & { allowZero: boolean; pinnedTools: string }
type Field = keyof McpSelectionConfigValues
const FIELDS: readonly { key: NumericField; label: JevLocaleKey; error: JevLocaleKey; min: number; max: number; ratio?: true }[] = [
  { key: 'toolLimit', label: 'mcpToolLimit', error: 'mcpToolLimitInvalid', min: 0, max: 1000 },
  { key: 'minProbability', label: 'mcpMinProbability', error: 'mcpProbabilityInvalid', min: 0, max: 1, ratio: true },
  { key: 'waitMs', label: 'mcpWaitMs', error: 'mcpWaitInvalid', min: 1, max: 300000 },
  { key: 'maxRequestChars', label: 'mcpMaxRequestChars', error: 'mcpRequestInvalid', min: 2048, max: 1000000 },
]

function toDraft(value: McpSelectionConfigValues): Draft {
  return {
    toolLimit: String(value.toolLimit), minProbability: String(value.minProbability),
    waitMs: String(value.waitMs), maxRequestChars: String(value.maxRequestChars),
    allowZero: value.allowZero, pinnedTools: value.pinnedTools.join('\n'),
  }
}

/** Render the independent MCP configuration using the incumbent settings controls. */
export function McpSelectionSettings({ form, notifySuccess, t }: {
  form: ConfigForm<McpSelectionConfigValues>; notifySuccess: (message: string) => void; t: (key: JevLocaleKey) => string
}) {
  const subscribe = useCallback((listener: () => void) => form.subscribe(listener), [form])
  const getSnapshot = useCallback(() => form.getSnapshot(), [form])
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  const [draft, setDraft] = useState<Draft | null>(null)
  const [invalid, setInvalid] = useState<Partial<Record<Field, JevLocaleKey>>>({})
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState(false)
  const edited = useRef(false)
  const pending = useRef(false)
  const current = snapshot.value
  useEffect(() => {
    if (current !== undefined && !edited.current) setDraft(toDraft(current))
  }, [current])
  const values = draft ?? (current === undefined ? null : toDraft(current))
  const dirty = current !== undefined && values !== null && JSON.stringify(values) !== JSON.stringify(toDraft(current))
  useEffect(() => { if (!dirty) edited.current = false }, [dirty])
  const disabled = !snapshot.writable || snapshot.status !== 'ready' || saving

  const edit = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    if (values === null) return
    edited.current = true
    setDraft({ ...values, [key]: value })
    setInvalid(previous => {
      const next = { ...previous }
      delete next[key]
      if (key === 'toolLimit') delete next.allowZero
      return next
    })
    setSaveError(false)
  }

  const save = async () => {
    if (values === null || disabled || !dirty || pending.current) return
    const errors: Partial<Record<Field, JevLocaleKey>> = {}
    const numeric = {} as Record<NumericField, number>
    for (const { key, min, max, ratio, error } of FIELDS) {
      const raw = values[key]
      const value = Number(raw)
      if (raw.trim() === '' || !Number.isFinite(value) || value < min || value > max ||
        (!ratio && (!/^\d+$/.test(raw) || !Number.isSafeInteger(value)))) errors[key] = error
      else numeric[key] = value
    }
    const pinnedTools = [...new Set(values.pinnedTools.split(/\r?\n/).map(name => name.trim()).filter(Boolean))]
    if (pinnedTools.some(name => !isMcpPublicName(name))) errors.pinnedTools = 'mcpPinsInvalid'
    if (numeric.toolLimit === 0 && !values.allowZero) errors.allowZero = 'mcpZeroInvalid'
    setInvalid(errors)
    if (Object.keys(errors).length) return
    pending.current = true
    setSaving(true)
    setSaveError(false)
    try {
      const accepted = await form.mutate([
        ...FIELDS.map(({ key }) => ({ op: 'set' as const, path: [key], value: numeric[key] })),
        { op: 'set', path: ['allowZero'], value: values.allowZero },
        { op: 'set', path: ['pinnedTools'], value: pinnedTools },
      ], snapshot.revision)
      if (!accepted) setSaveError(true)
      else {
        edited.current = false
        const saved = form.getSnapshot().value
        if (saved !== undefined) setDraft(toDraft(saved))
        notifySuccess(t('mcpSelectionSaved'))
      }
    } catch { setSaveError(true) }
    finally { pending.current = false; setSaving(false) }
  }

  return <section className={css.section} aria-label={t('mcpSelectionSettings')}>
    <h3 className={css.heading}>{t('mcpSelectionSettings')}</h3>
    <p className={css.hint}>{t('mcpSelectionHint')}</p>
    <p className={css.hint} id="jev-mcp-budget-hint">{t('mcpSelectionBudgetHint')}</p>
    {snapshot.status === 'loading' && current === undefined && <div className={css.loading} role="status" aria-label={t('loading')}><StateDot state="ongoing" size={24} /></div>}
    {snapshot.status === 'unavailable' && <p className={css.notice}>{t('unavailable')}</p>}
    {current !== undefined && values !== null && <div className={css.form} aria-busy={saving}>
      <div className={css.filters}>{FIELDS.map(({ key, label, min, max, ratio }) => <div className={css.field} key={key}>
        <label htmlFor={`jev-mcp-${key}`}>{t(label)}</label>
        <input id={`jev-mcp-${key}`} type="number" min={min} max={max} step={ratio ? 'any' : '1'}
          value={values[key]} disabled={disabled} aria-invalid={Boolean(invalid[key]) || undefined}
          aria-describedby={invalid[key] ? `jev-mcp-${key}-error` : key === 'toolLimit' ? 'jev-mcp-budget-hint' : undefined}
          onChange={event => { edit(key, event.target.value) }} />
        {invalid[key] && <span id={`jev-mcp-${key}-error`} role="alert" className={css.notice}>{t(invalid[key])}</span>}
      </div>)}</div>
      <div className={css.row}>
        <Switch label={t('mcpAllowZero')} checked={values.allowZero} disabled={disabled} onChange={value => { edit('allowZero', value) }} />
        <span>{t('mcpAllowZero')}</span>
      </div>
      <p className={css.hint}>{t('mcpAllowZeroHint')}</p>
      {invalid.allowZero && <p role="alert" className={css.notice}>{t(invalid.allowZero)}</p>}
      <div className={css.filters}><div className={css.field}>
        <label htmlFor="jev-mcp-pinnedTools">{t('mcpPinnedTools')}</label>
        <textarea id="jev-mcp-pinnedTools" rows={4} value={values.pinnedTools} disabled={disabled}
          aria-invalid={Boolean(invalid.pinnedTools) || undefined}
          aria-describedby={`jev-mcp-pins-hint${invalid.pinnedTools ? ' jev-mcp-pins-error' : ''}`}
          onChange={event => { edit('pinnedTools', event.target.value) }}
          style={{ width: '100%', boxSizing: 'border-box', minHeight: 96, padding: '6px 10px',
            border: `1px solid var(${invalid.pinnedTools ? '--dsw-alias-state-error-primary' : '--dsw-alias-border-l3'})`,
            borderRadius: 'var(--dsw-radius-sm)', background: 'var(--dsw-alias-bg-layer-2)',
            color: 'var(--dsw-alias-label-primary)', font: 'inherit', resize: 'vertical' }} />
        <p id="jev-mcp-pins-hint" className={css.hint}>{t('mcpPinnedToolsHint')}</p>
        {invalid.pinnedTools && <span id="jev-mcp-pins-error" role="alert" className={css.notice}>{t(invalid.pinnedTools)}</span>}
      </div></div>
      <div className={css.actions}>
        <Button variant="primary" disabled={disabled || !dirty} onClick={() => { void save() }}>{saving ? t('saving') : t('saveMcpSelection')}</Button>
        {!snapshot.writable && <span className={css.hint}>{t('readOnly')}</span>}
      </div>
      {saveError && <p role="alert" className={css.notice}>{t('mcpSelectionSaveFailed')}</p>}
    </div>}
  </section>
}
