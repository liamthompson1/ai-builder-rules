'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BASE_PATH } from '@/lib/paths';
import { CATEGORIES } from '@/lib/categories';

// Shared form for creating and editing groups. Many-rules-per-category via
// a checkbox list grouped by category.

export default function GroupForm({ mode = 'create', initial = {}, allRules = [] }) {
  const router = useRouter();

  const [name, setName] = useState(initial.name || '');
  const [description, setDescription] = useState(initial.description || '');
  const [body, setBody] = useState(initial.body || '');
  const [selections, setSelections] = useState(() => {
    const init = {};
    for (const c of CATEGORIES) {
      init[c.slug] = new Set(initial.rules?.[c.slug] || []);
    }
    return init;
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function toggle(category, slug) {
    setSelections((prev) => {
      const next = { ...prev, [category]: new Set(prev[category]) };
      if (next[category].has(slug)) next[category].delete(slug);
      else next[category].add(slug);
      return next;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return setError('Name is required');
    setError(null);
    setSubmitting(true);

    const rules = {};
    for (const c of CATEGORIES) {
      rules[c.slug] = Array.from(selections[c.slug]);
    }

    const url =
      mode === 'create'
        ? `${BASE_PATH}/api/groups`
        : `${BASE_PATH}/api/groups/${initial.slug}`;
    const method = mode === 'create' ? 'POST' : 'PUT';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
          rules,
          body,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || `Failed (${res.status})`);
      } else {
        setSuccess(data);
        router.refresh();
      }
    } catch (err) {
      setError(err.message || 'Network error');
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="form-card">
        <div className="alert success">✓ Saved. Committed to GitHub.</div>
        {success.commitUrl ? (
          <p className="muted" style={{ marginTop: 4 }}>
            Commit:{' '}
            <a className="text-link" href={success.commitUrl} target="_blank" rel="noreferrer">
              {success.commitUrl?.split('/').slice(-1)[0]?.slice(0, 7)}
            </a>
          </p>
        ) : null}
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <Link className="btn" href={success.url}>View group →</Link>
          {mode === 'create' ? (
            <button
              className="btn secondary"
              onClick={() => {
                setSuccess(null);
                setName('');
                setDescription('');
                setBody('');
                setSelections(() => {
                  const init = {};
                  for (const c of CATEGORIES) init[c.slug] = new Set();
                  return init;
                });
              }}
            >
              + New group
            </button>
          ) : (
            <button className="btn secondary" onClick={() => setSuccess(null)}>
              Keep editing
            </button>
          )}
        </div>
      </div>
    );
  }

  // Bucket the available rules by category for the picker.
  const rulesByCategory = Object.fromEntries(CATEGORIES.map((c) => [c.slug, []]));
  for (const r of allRules) {
    if (rulesByCategory[r.category]) rulesByCategory[r.category].push(r);
  }

  return (
    <div className="form-card">
      {error ? <div className="alert error">{error}</div> : null}
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Onboarding screens"
            required
          />
        </div>

        <div className="field">
          <label>Description (one line)</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="When you'd reach for this group."
          />
        </div>

        <div className="field">
          <label>Body (markdown — optional)</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={'Why this group exists. When to apply it. Examples.\n\n## Subhead\n\nRich markdown welcome.'}
            style={{ minHeight: 160 }}
          />
        </div>

        <div className="field">
          <label>Rules in this group</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {CATEGORIES.map((cat) => {
              const rules = rulesByCategory[cat.slug] || [];
              const selected = selections[cat.slug];
              return (
                <div key={cat.slug} className="group-cat-picker">
                  <div className="group-cat-header">
                    <span>
                      {cat.icon} {cat.label}
                    </span>
                    <span className="muted" style={{ fontSize: 12 }}>
                      {selected.size} / {rules.length} selected
                    </span>
                  </div>
                  {rules.length === 0 ? (
                    <p className="muted" style={{ fontSize: 13, margin: '6px 0 0' }}>
                      No rules in {cat.label.toLowerCase()} yet.
                    </p>
                  ) : (
                    <div className="group-rule-checks">
                      {rules.map((r) => (
                        <label key={r.slug} className="group-rule-check">
                          <input
                            type="checkbox"
                            checked={selected.has(r.slug)}
                            onChange={() => toggle(cat.slug, r.slug)}
                          />
                          <span>
                            {r.golden ? '⭐ ' : ''}
                            <strong>{r.title}</strong>
                            {r.summary ? <span className="muted"> — {r.summary}</span> : null}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button type="submit" className="btn" disabled={submitting}>
            {submitting
              ? 'Saving…'
              : mode === 'create'
              ? 'Create group'
              : 'Save changes'}
          </button>
          <Link
            className="btn secondary"
            href={mode === 'create' ? '/groups' : `/groups/${initial.slug}`}
          >
            Cancel
          </Link>
        </div>

        {mode === 'edit' ? (
          <p className="muted" style={{ marginTop: 16 }}>
            Slug <code>{initial.slug}</code> is fixed — to rename, delete and
            create a new group.
          </p>
        ) : null}
      </form>
    </div>
  );
}
