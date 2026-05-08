'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BASE_PATH } from '@/lib/paths';
import { CATEGORIES } from '@/lib/categories';
import {
  STRICTNESS_LEVELS,
  STRICTNESS_DEFAULT,
  APPLIES_TO_OPTIONS,
} from '@/lib/schema';

const CATEGORY_OPTIONS = CATEGORIES.map((c) => ({
  slug: c.slug,
  label: `${c.icon} ${c.label}`,
}));

// Pre-fill the body so new rules naturally adopt the H2 outline AI agents
// expect. Users can clear or rewrite freely.
const BODY_SCAFFOLD = `## Why this matters

Why does this rule exist? What goes wrong without it?

## When to apply

Concrete situations where this rule kicks in.

## Examples

### ✅ Good

Show what this rule looks like applied correctly.

### ❌ Bad

Show what it looks like ignored. (Optional.)

## Edge cases

When this rule shouldn't apply. (Optional.)
`;

export default function AddRuleForm({ allRules = [] }) {
  const router = useRouter();
  const [tab, setTab] = useState('write');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Write-tab state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('transform');
  const [summary, setSummary] = useState('');
  const [tags, setTags] = useState('');
  const [golden, setGolden] = useState(false);
  const [strictness, setStrictness] = useState(STRICTNESS_DEFAULT);
  const [appliesTo, setAppliesTo] = useState(() => new Set(['any']));
  const [related, setRelated] = useState(() => new Set());
  const [body, setBody] = useState(BODY_SCAFFOLD);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Upload-tab state
  const [uploadCategory, setUploadCategory] = useState('transform');
  const [raw, setRaw] = useState('');
  const [filename, setFilename] = useState('');
  const [dragOver, setDragOver] = useState(false);

  function toggleAppliesTo(v) {
    setAppliesTo((prev) => {
      const next = new Set(prev);
      if (v === 'any') {
        // Picking "any" clears everything else; picking anything else
        // un-picks "any" so the value stays meaningful.
        return next.has('any') && next.size === 1 ? new Set() : new Set(['any']);
      }
      next.delete('any');
      if (next.has(v)) next.delete(v);
      else next.add(v);
      return next.size === 0 ? new Set(['any']) : next;
    });
  }

  function toggleRelated(key) {
    setRelated((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function resetWrite() {
    setTitle('');
    setSummary('');
    setTags('');
    setGolden(false);
    setStrictness(STRICTNESS_DEFAULT);
    setAppliesTo(new Set(['any']));
    setRelated(new Set());
    setBody(BODY_SCAFFOLD);
    setShowAdvanced(false);
  }

  async function submit(payload) {
    setError(null);
    setSuccess(null);
    setSubmitting(true);
    try {
      const res = await fetch(`${BASE_PATH}/api/rules`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || `Request failed with ${res.status}`);
      } else {
        setSuccess(data);
        router.refresh();
      }
    } catch (e) {
      setError(e.message || 'Network error');
    } finally {
      setSubmitting(false);
    }
  }

  function handleWriteSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return setError('Title is required');
    if (!body.trim()) return setError('Body is required');
    submit({
      mode: 'write',
      category,
      title: title.trim(),
      summary: summary.trim(),
      golden,
      strictness,
      applies_to: Array.from(appliesTo),
      related: Array.from(related),
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      body,
    });
  }

  function handleUploadSubmit(e) {
    e.preventDefault();
    if (!raw.trim()) return setError('Paste or drop a markdown file first');
    submit({ mode: 'upload', category: uploadCategory, raw });
  }

  async function handleFile(file) {
    if (!file) return;
    setFilename(file.name);
    const text = await file.text();
    setRaw(text);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  if (success) {
    return (
      <div className="form-card">
        <div className="alert success">
          ✓ Rule added: <strong>{success.url}</strong>
        </div>
        <p className="muted" style={{ marginTop: 4 }}>
          Committed to{' '}
          <a className="text-link" href={success.commitUrl} target="_blank" rel="noreferrer">
            {success.commitUrl?.split('/').slice(-1)[0]?.slice(0, 7) || 'main'}
          </a>{' '}
          on GitHub. The list pages cache for 60s — give it a moment to appear.
        </p>
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <Link className="btn" href={success.url}>View rule →</Link>
          <button
            className="btn secondary"
            onClick={() => {
              setSuccess(null);
              resetWrite();
              setRaw('');
              setFilename('');
            }}
          >
            Add another
          </button>
        </div>
      </div>
    );
  }

  // Bucket existing rules by category for the related picker.
  const rulesByCategory = Object.fromEntries(CATEGORIES.map((c) => [c.slug, []]));
  for (const r of allRules) {
    if (rulesByCategory[r.category]) rulesByCategory[r.category].push(r);
  }

  return (
    <div className="form-card">
      <div className="form-tabs">
        <button
          className={`form-tab ${tab === 'write' ? 'active' : ''}`}
          onClick={() => setTab('write')}
        >
          Write
        </button>
        <button
          className={`form-tab ${tab === 'upload' ? 'active' : ''}`}
          onClick={() => setTab('upload')}
        >
          Upload .md
        </button>
      </div>

      {error ? <div className="alert error">{error}</div> : null}

      {tab === 'write' ? (
        <form onSubmit={handleWriteSubmit}>
          <div className="field">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Animate intent, not decoration"
              required
            />
          </div>

          <div className="field-row">
            <div className="field">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.label}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Strictness</label>
              <select
                value={strictness}
                onChange={(e) => setStrictness(e.target.value)}
              >
                {STRICTNESS_LEVELS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                    {s === 'must' ? ' — non-negotiable' : ''}
                    {s === 'should' ? ' — strong recommendation' : ''}
                    {s === 'may' ? ' — suggestion' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="field">
            <label>Summary (one line)</label>
            <input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="The headline takeaway, in a sentence."
            />
          </div>

          <div className="field">
            <label>Tags (comma-separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="animation, motion, clarity"
            />
          </div>

          <label className="field-checkbox">
            <input type="checkbox" checked={golden} onChange={(e) => setGolden(e.target.checked)} />
            ⭐ Mark as a Golden Rule
          </label>

          <div className="field">
            <label>Applies to</label>
            <div className="group-cat-picker">
              <div className="group-rule-checks" style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {APPLIES_TO_OPTIONS.map((v) => (
                  <label key={v} className="group-rule-check" style={{ flex: '0 0 auto' }}>
                    <input
                      type="checkbox"
                      checked={appliesTo.has(v)}
                      onChange={() => toggleAppliesTo(v)}
                    />
                    <span>{v}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="field">
            <label>
              <button
                type="button"
                onClick={() => setShowAdvanced((v) => !v)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  color: 'var(--accent-fg)',
                  cursor: 'pointer',
                  font: 'inherit',
                  fontWeight: 600,
                }}
              >
                {showAdvanced ? '▾' : '▸'} Related rules ({related.size})
              </button>
            </label>
            {showAdvanced ? (
              <div className="group-cat-picker" style={{ marginTop: 8 }}>
                <p className="muted" style={{ margin: '0 0 10px', fontSize: 12 }}>
                  Cross-references for AI agents to follow.
                </p>
                {CATEGORIES.map((cat) => {
                  const list = rulesByCategory[cat.slug] || [];
                  if (!list.length) return null;
                  return (
                    <div key={cat.slug} style={{ marginBottom: 10 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
                        {cat.icon} {cat.label}
                      </div>
                      <div className="group-rule-checks">
                        {list.map((r) => {
                          const key = `${r.category}/${r.slug}`;
                          return (
                            <label key={key} className="group-rule-check">
                              <input
                                type="checkbox"
                                checked={related.has(key)}
                                onChange={() => toggleRelated(key)}
                              />
                              <span>{r.title}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>

          <div className="field">
            <label>Body (markdown)</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn" disabled={submitting}>
            {submitting ? 'Committing…' : 'Add rule'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleUploadSubmit}>
          <div className="field">
            <label>Category (used if the file's frontmatter doesn't set one)</label>
            <select value={uploadCategory} onChange={(e) => setUploadCategory(e.target.value)}>
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c.slug} value={c.slug}>{c.label}</option>
              ))}
            </select>
          </div>

          <div
            className={`upload-drop ${dragOver ? 'dragover' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById('md-file-input')?.click()}
          >
            <p><strong>Drop a .md file</strong> or click to browse</p>
            <p className="muted">
              {filename ? `Loaded: ${filename}` : 'Full frontmatter (including strictness, applies_to, related) will be parsed.'}
            </p>
            <input
              id="md-file-input"
              type="file"
              accept=".md,text/markdown"
              hidden
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </div>

          <div className="field" style={{ marginTop: 16 }}>
            <label>…or paste the markdown directly</label>
            <textarea
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
              placeholder={'---\ntitle: My rule\nsummary: A one-line takeaway.\nstrictness: should\napplies_to: [forms]\ngolden: false\ntags: [a, b]\nrelated: [intent/one-thought-per-screen]\n---\n\n## Why this matters\n\n…'}
            />
          </div>

          <button type="submit" className="btn" disabled={submitting}>
            {submitting ? 'Committing…' : 'Add rule'}
          </button>
        </form>
      )}
    </div>
  );
}
