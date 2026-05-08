'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BASE_PATH } from '@/lib/paths';

// Edit-rule form. Slug + category are immutable here — we don't move files
// between folders or rename them. To change either, delete + recreate.

export default function EditRuleForm({ initial }) {
  const router = useRouter();

  const [title, setTitle] = useState(initial.title || '');
  const [summary, setSummary] = useState(initial.summary || '');
  const [tags, setTags] = useState((initial.tags || []).join(', '));
  const [golden, setGolden] = useState(!!initial.golden);
  const [body, setBody] = useState(initial.body || '');

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);

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
    return (
      <div className="form-card">
        <div className="alert success">✓ Saved. Committed to GitHub.</div>
        <p className="muted" style={{ marginTop: 4 }}>
          Commit:{' '}
          <a className="text-link" href={success.commitUrl} target="_blank" rel="noreferrer">
            {success.commitUrl?.split('/').slice(-1)[0]?.slice(0, 7)}
          </a>
        </p>
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
