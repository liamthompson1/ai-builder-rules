import { getGroup } from '@/lib/groups';
import { listAllRules } from '@/lib/rules';
import GroupForm from '../../../GroupForm';
import NotFoundView from '../../../NotFoundView';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const g = await getGroup(slug).catch(() => null);
  return {
    title: g ? `Edit · ${g.name}` : 'Edit group',
    robots: { index: false },
  };
}

export default async function EditGroupPage({ params }) {
  const { slug } = await params;
  const g = await getGroup(slug).catch(() => null);
  if (!g) {
    return (
      <NotFoundView
        title={`No group called "${slug}".`}
        subtitle="It might have been deleted."
      />
    );
  }

  const allRules = await listAllRules().catch(() => []);

  return (
    <>
      <header className="page-header">
        <div className="page-eyebrow">🧰 Group · Editing</div>
        <h1 className="page-title plain">{g.name}</h1>
        <p className="page-subtitle">
          Save commits to GitHub. Listings refresh immediately; the group's
          page may show the previous selection for a moment.
        </p>
      </header>

      <GroupForm
        mode="edit"
        initial={{
          slug: g.slug,
          name: g.name,
          description: g.description,
          rules: g.rules,
          body: g.body,
        }}
        allRules={allRules}
      />
    </>
  );
}
