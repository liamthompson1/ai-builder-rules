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

// Edit-rule form. Slug + category are immutable here — we don't move files
// between folders or rename them. To change either, delete + recreate.

export default function EditRuleForm({
  initial,
  allGroups = [],
  allRules = [],
}) {
  const router = useRouter();

  const [title, setTitle] = useState(initial.title || '');
  const [summary, setSummary] = useState(initial.summary || '');
  const [tags, setTags] = useState((initial.tags || []).join(', '));
  const [golden, setGolden] = useState(!!initial.golden);
  const [strictness, setStrictness] = useState(
    initial.strictness || STRICTNESS_DEFAULT
  );
  const [appliesTo, setAppliesTo] = useState(
    () => new Set(initial.applies_to?.length ? initial.applies_to : ['any'])
  );
  const [related, setRelated] = useState(
    () => new Set(initial.related || [])
  );
  const [body, setBody] = useState(initial.body || '');
  const [groupSlugs, setGroupSlugs] = useState(
    () => new Set(initial.groupSlugs || [])
  );
  const [showRelated, setShowRelated] = useState(
    () => (initial.related || []).length > 0
  );

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function toggleGroup(slug) {
    setGroupSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  function toggleAppliesTo(v) {
    setAppliesTo((prev) => {
      const next = new Set(prev);
      if (v === 'any') {
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

  // Bucket existing rules by category for the picker.
  const rulesByCategory = Object.fromEntries(
    CATEGORIES.map((c) => [c.slug, []])
  );
  for (const r of allRules) {
    if (rulesByCategory[r.category]) rulesByCategory[r.category].push(r);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return setError('Title is required');
    if (!body.trim()) return setError('Body is required');
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch(
        `${BASE_PATH}/api/rules/${initial.category}/${initial.slug}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: title.trim(),
            summary: summary.trim(),
            golden,
            strictness,
            applies_to: Array.from(appliesTo),
            related: Array.from(related),
            tags: tags
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean),
            body,
            groupSlugs: Array.from(groupSlugs),
          }),
        }
      );
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

  if (success) {
    const okGroups = (success.groupResults || []).filter((r) => r.ok);
    const failGroups = (success.groupResults || []).filter((r) => !r.ok);
    return (
      <div className="form-card">
        <div className="alert success">✓ Saved. Committed to GitHub.</div>
        <p className="muted" style={{ marginTop: 4 }}>
          Commit:{' '}
          <a className="text-link" href={success.commitUrl} target="_blank" rel="noreferrer">
            {success.commitUrl?.split('/').slice(-1)[0]?.slice(0, 7)}
          </a>
        </p>
        {okGroups.length ? (
          <p className="muted" style={{ marginTop: 8 }}>
            Group memberships updated:{' '}
            {okGroups.map((g, i) => (
              <span key={g.slug}>
                {i > 0 ? ', ' : ''}
                <strong>{g.name || g.slug}</strong> ({g.action})
              </span>
            ))}
          </p>
        ) : null}
        {failGroups.length ? (
          <div className="alert error" style={{ marginTop: 8 }}>
            Some group updates failed:{' '}
            {failGroups.map((g) => `${g.slug} (${g.error})`).join('; ')}
          </div>
        ) : null}
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <Link className="btn" href={success.url}>← Back to rule</Link>
          <button className="btn secondary" onClick={() => setSuccess(null)}>
            Keep editing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-card">
      {error ? <div className="alert error">{error}</div> : null}

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="field-row">
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
          <div className="field">
            <label>Tags (comma-separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label>Summary (one line)</label>
          <input
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>

        <label className="field-checkbox">
          <input
            type="checkbox"
            checked={golden}
            onChange={(e) => setGolden(e.target.checked)}
          />
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
          <label>Body (markdown)</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label>
            <button
              type="button"
              onClick={() => setShowRelated((v) => !v)}
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
              {showRelated ? '▾' : '▸'} Related rules ({related.size})
            </button>
          </label>
          {showRelated ? (
            <div className="group-cat-picker" style={{ marginTop: 8 }}>
              <p className="muted" style={{ margin: '0 0 10px', fontSize: 12 }}>
                Cross-references for AI agents to follow.
              </p>
              {CATEGORIES.map((cat) => {
                const list = (rulesByCategory[cat.slug] || []).filter(
                  (r) =>
                    !(r.category === initial.category && r.slug === initial.slug)
                );
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
          <label>Groups this rule belongs to</label>
          {allGroups.length === 0 ? (
            <p className="muted" style={{ fontSize: 13, margin: 0 }}>
              No groups exist yet.{' '}
              <Link href="/groups/new" className="text-link">
                Create the first one →
              </Link>
            </p>
          ) : (
            <div className="group-cat-picker">
              <div className="group-rule-checks">
                {allGroups.map((g) => (
                  <label key={g.slug} className="group-rule-check">
                    <input
                      type="checkbox"
                      checked={groupSlugs.has(g.slug)}
                      onChange={() => toggleGroup(g.slug)}
                    />
                    <span>
                      🧰 <strong>{g.name}</strong>
                      {g.description ? (
                        <span className="muted"> — {g.description}</span>
                      ) : null}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button type="submit" className="btn" disabled={submitting}>
            {submitting ? 'Saving…' : 'Save changes'}
          </button>
          <Link
            className="btn secondary"
            href={`/${initial.category}/${initial.slug}`}
          >
            Cancel
          </Link>
        </div>
      </form>

      <p className="muted" style={{ marginTop: 18 }}>
        Slug <code>{initial.slug}</code> and category{' '}
        <code>{initial.category}</code> are fixed — to change either, delete
        the rule and create a new one.
      </p>
    </div>
  );
}
