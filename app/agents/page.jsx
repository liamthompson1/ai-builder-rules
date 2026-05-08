import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { fetchDoc, githubBlobUrl } from '@/lib/docs';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'AGENTS.md',
  description: 'Instructions for AI agents consuming this repo.',
};

export default async function AgentsPage() {
  const content = await fetchDoc('AGENTS.md');
  return (
    <>
      <header className="page-header">
        <div className="page-eyebrow">🤖 For AI consumers</div>
        <h1 className="page-title plain">AGENTS.md</h1>
        <p className="page-subtitle">
          The contract an AI agent gets when handed this repo. Renders the
          live file from the GitHub repo —{' '}
          <a
            className="text-link"
            href={githubBlobUrl('AGENTS.md')}
            target="_blank"
            rel="noreferrer"
          >
            view source on GitHub →
          </a>
        </p>
      </header>
      <article className="rule-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content || '*Could not load AGENTS.md from the repo.*'}
        </ReactMarkdown>
      </article>
    </>
  );
}
