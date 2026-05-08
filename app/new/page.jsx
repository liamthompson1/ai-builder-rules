import { listAllRules } from '@/lib/rules';
import AddRuleForm from './AddRuleForm';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Add a rule',
  description: 'Contribute a new rule to the library.',
};

export default async function NewRulePage() {
  const allRules = await listAllRules().catch(() => []);
  return (
    <>
      <header className="page-header">
        <div className="page-eyebrow">+ Contribute</div>
        <h1 className="page-title plain">Add a rule</h1>
        <p className="page-subtitle">
          Two ways: <strong>write it</strong> directly using the fields below,
          or <strong>upload</strong> a structured <code>.md</code> file you
          already have. Either way, it's committed to the GitHub repo and
          shows up here once the cache refreshes (~60s).
        </p>
      </header>

      <AddRuleForm allRules={allRules} />
    </>
  );
}
