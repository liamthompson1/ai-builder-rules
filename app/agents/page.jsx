import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { fetchDoc, githubBlobUrl } from '@/lib/docs';
import GitHubLinkButton from '../GitHubLinkButton';

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
          The contract an AI agent gets when handed this repo. The live file
          renders below.
        </p>
        <div style={{ marginTop: 14 }}>
          <GitHubLinkButton href={githubBlobUrl('AGENTS.md')} label="View on GitHub" />
        </div>
      </header>
      <article className="rule-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content || '*Could not load AGENTS.md from the repo.*'}
        </ReactMarkdown>
      </article>
    </>
  );
}
