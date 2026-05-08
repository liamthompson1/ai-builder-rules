import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { fetchDoc, githubBlobUrl } from '@/lib/docs';
import GitHubLinkButton from '../GitHubLinkButton';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'README',
  description: 'Project overview and how to contribute.',
};

export default async function ReadmePage() {
  const content = await fetchDoc('README.md');
  return (
    <>
      <header className="page-header">
        <div className="page-eyebrow">📘 Repo overview</div>
        <h1 className="page-title plain">README</h1>
        <p className="page-subtitle">
          Project overview, layout, contribution paths. The live file
          renders below.
        </p>
        <div style={{ marginTop: 14 }}>
          <GitHubLinkButton href={githubBlobUrl('README.md')} label="View on GitHub" />
        </div>
      </header>
      <article className="rule-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content || '*Could not load README.md from the repo.*'}
        </ReactMarkdown>
      </article>
    </>
  );
}
