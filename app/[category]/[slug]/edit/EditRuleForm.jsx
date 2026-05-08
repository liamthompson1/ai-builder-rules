'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BASE_PATH } from '@/lib/paths';

// Edit-rule form. Slug + category are immutable here — we don't move files
// between folders or rename them. To change either, delete + recreate.

export default function EditRuleForm({ initial, allGroups = [] }) {
  const router = useRouter();

  const [title, setTitle] = useState(initial.title || '');
  const [summary, setSummary] = useState(initial.summary || '');
  const [tags, setTags] = useState((initial.tags || []).join(', '));
  const [golden, setGolden] = useState(!!initial.golden);
  const [body, setBody] = useState(initial.body || '');
  const [groupSlugs, setGroupSlugs] = useState(
    () => new Set(initial.groupSlugs || [])
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

        <div className="field">
          <label>Summary (one line)</label>
          <input
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Tags (comma-separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
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
          <label>Body (markdown)</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
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
