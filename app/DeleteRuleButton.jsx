'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BASE_PATH } from '@/lib/paths';

// Two-stage confirm: first click reveals "Yes, delete" + "Cancel".
// Click "Yes, delete" → fires DELETE → bounces to the category list.

export default function DeleteRuleButton({ category, slug, title }) {
  const router = useRouter();
  const [stage, setStage] = useState('idle'); // 'idle' | 'confirm' | 'submitting'
  const [error, setError] = useState(null);

  async function handleDelete() {
    setStage('submitting');
    setError(null);
    try {
      const res = await fetch(
        `${BASE_PATH}/api/rules/${category}/${slug}`,
        { method: 'DELETE' }
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || `Failed (${res.status})`);
        setStage('idle');
        return;
      }
      router.refresh();
      router.push(`/${category}`);
    } catch (e) {
      setError(e.message || 'Network error');
      setStage('idle');
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {error ? <div className="alert error" style={{ margin: 0 }}>{error}</div> : null}

      {stage === 'confirm' ? (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--fg-2)', fontSize: 13 }}>
            Delete <strong>{title}</strong>? This commits a deletion to GitHub.
          </span>
          <button className="btn btn-danger" onClick={handleDelete}>
            Yes, delete
          </button>
          <button className="btn secondary" onClick={() => setStage('idle')}>
            Cancel
          </button>
        </div>
      ) : stage === 'submitting' ? (
        <span className="muted">Deleting…</span>
      ) : (
        <button
          className="btn btn-danger-ghost"
          onClick={() => setStage('confirm')}
        >
          Delete
        </button>
      )}
    </div>
  );
}
