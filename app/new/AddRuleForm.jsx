'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BASE_PATH } from '@/lib/paths';

const CATEGORY_OPTIONS = [
  { slug: 'transform', label: '🔁 Transform' },
  { slug: 'flow', label: '🌊 Flow' },
  { slug: 'intent', label: '🎯 Intent' },
  { slug: 'visual-elements', label: '🟦 Visual Elements' },
];

export default function AddRuleForm() {
  const router = useRouter();
  const [tab, setTab] = useState('write'); // 'write' | 'upload'
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Write-tab state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('transform');
  const [summary, setSummary] = useState('');
  const [tags, setTags] = useState('');
  const [golden, setGolden] = useState(false);
  const [body, setBody] = useState('');

  // Upload-tab state
  const [uploadCategory, setUploadCategory] = useState('transform');
  const [raw, setRaw] = useState('');
  const [filename, setFilename] = useState('');
  const [dragOver, setDragOver] = useState(false);

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
        // Refresh server data so the new rule shows up in lists.
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
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      body,
    });
  }

  function handleUploadSubmit(e) {
    e.preventDefault();
    if (!raw.trim()) return setError('Paste or drop a markdown file first');
    submit({
      mode: 'upload',
      category: uploadCategory,
      raw,
    });
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
        <p style={{ color: 'var(--fg-2)', fontSize: 14 }}>
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
              setTitle('');
              setSummary('');
              setTags('');
              setGolden(false);
              setBody('');
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
                  <option key={c.slug} value={c.slug}>
                    {c.label}
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
                placeholder="animation, motion, clarity"
              />
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
              placeholder={'## Why this matters\n\nWrite the rule in markdown. Headings, lists, code blocks, blockquotes — all supported.'}
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
                <option key={c.slug} value={c.slug}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div
            className={`upload-drop ${dragOver ? 'dragover' : ''}`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById('md-file-input')?.click()}
          >
            <p><strong>Drop a .md file</strong> or click to browse</p>
            <p className="muted">
              {filename ? `Loaded: ${filename}` : 'Frontmatter (title, summary, golden, tags) will be parsed.'}
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
              placeholder={'---\ntitle: My rule\nsummary: A one-line takeaway.\ngolden: false\ntags: [a, b]\n---\n\n## Why\n\nMarkdown body here.'}
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
