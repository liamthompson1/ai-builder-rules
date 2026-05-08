import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { fetchDoc, githubBlobUrl } from '@/lib/docs';

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
          Project overview, layout, contribution paths. Renders the live
          file from the GitHub repo —{' '}
          <a
            className="text-link"
            href={githubBlobUrl('README.md')}
            target="_blank"
            rel="noreferrer"
          >
            view source on GitHub →
          </a>
        </p>
      </header>
      <article className="rule-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content || '*Could not load README.md from the repo.*'}
        </ReactMarkdown>
      </article>
    </>
  );
}
