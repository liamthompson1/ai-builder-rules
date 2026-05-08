import { listAllRules } from '@/lib/rules';
import GroupForm from '../../GroupForm';

export const metadata = {
  title: 'New group',
  description: 'Create a new group of rules.',
};

// Pull rules at request time so the picker always reflects the latest state
// of the library.
export const dynamic = 'force-dynamic';

export default async function NewGroupPage() {
  const allRules = await listAllRules().catch(() => []);

  return (
    <>
      <header className="page-header">
        <div className="page-eyebrow">🧰 New</div>
        <h1 className="page-title plain">Create a group</h1>
        <p className="page-subtitle">
          Bundle rules that travel together. Pick from any category — leave
          others empty.
        </p>
      </header>

      <GroupForm mode="create" allRules={allRules} />
    </>
  );
}
