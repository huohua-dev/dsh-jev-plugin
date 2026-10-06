import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** Profile-scoped native MCP definition selection; saving never enables the feature. */
import React, { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Button, StateDot, Switch } from '@deepseek-ai/dsh-client-ui-primitives';
import { isMcpPublicName } from "../mcp-selection-types.js";
import css from './JevPage.module.css';
const FIELDS = [
    { key: 'toolLimit', label: 'mcpToolLimit', error: 'mcpToolLimitInvalid', min: 0, max: 1000 },
    { key: 'minProbability', label: 'mcpMinProbability', error: 'mcpProbabilityInvalid', min: 0, max: 1, ratio: true },
    { key: 'waitMs', label: 'mcpWaitMs', error: 'mcpWaitInvalid', min: 1, max: 300000 },
    { key: 'maxRequestChars', label: 'mcpMaxRequestChars', error: 'mcpRequestInvalid', min: 2048, max: 1000000 },
];
function toDraft(value) {
    return {
        toolLimit: String(value.toolLimit), minProbability: String(value.minProbability),
        waitMs: String(value.waitMs), maxRequestChars: String(value.maxRequestChars),
        allowZero: value.allowZero, pinnedTools: value.pinnedTools.join('\n'),
    };
}
/** Render the independent MCP configuration using the incumbent settings controls. */
export function McpSelectionSettings({ form, notifySuccess, t }) {
    const subscribe = useCallback((listener) => form.subscribe(listener), [form]);
    const getSnapshot = useCallback(() => form.getSnapshot(), [form]);
    const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
    const [draft, setDraft] = useState(null);
    const [invalid, setInvalid] = useState({});
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState(false);
    const edited = useRef(false);
    const pending = useRef(false);
    const current = snapshot.value;
    useEffect(() => {
        if (current !== undefined && !edited.current)
            setDraft(toDraft(current));
    }, [current]);
    const values = draft ?? (current === undefined ? null : toDraft(current));
    const dirty = current !== undefined && values !== null && JSON.stringify(values) !== JSON.stringify(toDraft(current));
    useEffect(() => { if (!dirty)
        edited.current = false; }, [dirty]);
    const disabled = !snapshot.writable || snapshot.status !== 'ready' || saving;
    const edit = (key, value) => {
        if (values === null)
            return;
        edited.current = true;
        setDraft({ ...values, [key]: value });
        setInvalid(previous => {
            const next = { ...previous };
            delete next[key];
            if (key === 'toolLimit')
                delete next.allowZero;
            return next;
        });
        setSaveError(false);
    };
    const save = async () => {
        if (values === null || disabled || !dirty || pending.current)
            return;
        const errors = {};
        const numeric = {};
        for (const { key, min, max, ratio, error } of FIELDS) {
            const raw = values[key];
            const value = Number(raw);
            if (raw.trim() === '' || !Number.isFinite(value) || value < min || value > max ||
                (!ratio && (!/^\d+$/.test(raw) || !Number.isSafeInteger(value))))
                errors[key] = error;
            else
                numeric[key] = value;
        }
        const pinnedTools = [...new Set(values.pinnedTools.split(/\r?\n/).map(name => name.trim()).filter(Boolean))];
        if (pinnedTools.some(name => !isMcpPublicName(name)))
            errors.pinnedTools = 'mcpPinsInvalid';
        if (numeric.toolLimit === 0 && !values.allowZero)
            errors.allowZero = 'mcpZeroInvalid';
        setInvalid(errors);
        if (Object.keys(errors).length)
            return;
        pending.current = true;
        setSaving(true);
        setSaveError(false);
        try {
            const accepted = await form.mutate([
                ...FIELDS.map(({ key }) => ({ op: 'set', path: [key], value: numeric[key] })),
                { op: 'set', path: ['allowZero'], value: values.allowZero },
                { op: 'set', path: ['pinnedTools'], value: pinnedTools },
            ], snapshot.revision);
            if (!accepted)
                setSaveError(true);
            else {
                edited.current = false;
                const saved = form.getSnapshot().value;
                if (saved !== undefined)
                    setDraft(toDraft(saved));
                notifySuccess(t('mcpSelectionSaved'));
            }
        }
        catch {
            setSaveError(true);
        }
        finally {
            pending.current = false;
            setSaving(false);
        }
    };
    return _jsxs("section", { className: css.section, "aria-label": t('mcpSelectionSettings'), children: [_jsx("h3", { className: css.heading, children: t('mcpSelectionSettings') }), _jsx("p", { className: css.hint, children: t('mcpSelectionHint') }), _jsx("p", { className: css.hint, id: "jev-mcp-budget-hint", children: t('mcpSelectionBudgetHint') }), snapshot.status === 'loading' && current === undefined && _jsx("div", { className: css.loading, role: "status", "aria-label": t('loading'), children: _jsx(StateDot, { state: "ongoing", size: 24 }) }), snapshot.status === 'unavailable' && _jsx("p", { className: css.notice, children: t('unavailable') }), current !== undefined && values !== null && _jsxs("div", { className: css.form, "aria-busy": saving, children: [_jsx("div", { className: css.filters, children: FIELDS.map(({ key, label, min, max, ratio }) => _jsxs("div", { className: css.field, children: [_jsx("label", { htmlFor: `jev-mcp-${key}`, children: t(label) }), _jsx("input", { id: `jev-mcp-${key}`, type: "number", min: min, max: max, step: ratio ? 'any' : '1', value: values[key], disabled: disabled, "aria-invalid": Boolean(invalid[key]) || undefined, "aria-describedby": invalid[key] ? `jev-mcp-${key}-error` : key === 'toolLimit' ? 'jev-mcp-budget-hint' : undefined, onChange: event => { edit(key, event.target.value); } }), invalid[key] && _jsx("span", { id: `jev-mcp-${key}-error`, role: "alert", className: css.notice, children: t(invalid[key]) })] }, key)) }), _jsxs("div", { className: css.row, children: [_jsx(Switch, { label: t('mcpAllowZero'), checked: values.allowZero, disabled: disabled, onChange: value => { edit('allowZero', value); } }), _jsx("span", { children: t('mcpAllowZero') })] }), _jsx("p", { className: css.hint, children: t('mcpAllowZeroHint') }), invalid.allowZero && _jsx("p", { role: "alert", className: css.notice, children: t(invalid.allowZero) }), _jsx("div", { className: css.filters, children: _jsxs("div", { className: css.field, children: [_jsx("label", { htmlFor: "jev-mcp-pinnedTools", children: t('mcpPinnedTools') }), _jsx("textarea", { id: "jev-mcp-pinnedTools", rows: 4, value: values.pinnedTools, disabled: disabled, "aria-invalid": Boolean(invalid.pinnedTools) || undefined, "aria-describedby": `jev-mcp-pins-hint${invalid.pinnedTools ? ' jev-mcp-pins-error' : ''}`, onChange: event => { edit('pinnedTools', event.target.value); }, style: { width: '100%', boxSizing: 'border-box', minHeight: 96, padding: '6px 10px',
                                        border: `1px solid var(${invalid.pinnedTools ? '--dsw-alias-state-error-primary' : '--dsw-alias-border-l3'})`,
                                        borderRadius: 'var(--dsw-radius-sm)', background: 'var(--dsw-alias-bg-layer-2)',
                                        color: 'var(--dsw-alias-label-primary)', font: 'inherit', resize: 'vertical' } }), _jsx("p", { id: "jev-mcp-pins-hint", className: css.hint, children: t('mcpPinnedToolsHint') }), invalid.pinnedTools && _jsx("span", { id: "jev-mcp-pins-error", role: "alert", className: css.notice, children: t(invalid.pinnedTools) })] }) }), _jsxs("div", { className: css.actions, children: [_jsx(Button, { variant: "primary", disabled: disabled || !dirty, onClick: () => { void save(); }, children: saving ? t('saving') : t('saveMcpSelection') }), !snapshot.writable && _jsx("span", { className: css.hint, children: t('readOnly') })] }), saveError && _jsx("p", { role: "alert", className: css.notice, children: t('mcpSelectionSaveFailed') })] })] });
}
//# sourceMappingURL=McpSelectionSettings.js.map