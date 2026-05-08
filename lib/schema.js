// Shared constants for the rule/group schema. Keeping these in one place
// so the form, the readers, the API validators, and AGENTS.md all agree.

export const STRICTNESS_LEVELS = ['must', 'should', 'may'];
export const STRICTNESS_DEFAULT = 'should';

// Curated vocabulary for the `applies_to` field. AI agents use this to
// filter rules to the kind of UI they're building. New values can be
// added as the library grows; keep the list small enough that an agent
// doesn't need a glossary to reason about it.
export const APPLIES_TO_OPTIONS = [
  'any',
  'forms',
  'navigation',
  'lists',
  'cards',
  'tables',
  'modals',
  'dialogs',
  'toolbars',
  'onboarding',
  'empty-states',
  'error-states',
  'mobile',
  'desktop',
  'dashboards',
];

export function normalizeStrictness(v) {
  const s = String(v || '').toLowerCase().trim();
  return STRICTNESS_LEVELS.includes(s) ? s : STRICTNESS_DEFAULT;
}

export function normalizeAppliesTo(v) {
  if (Array.isArray(v)) {
    const out = v.map((x) => String(x).trim().toLowerCase()).filter(Boolean);
    return out.length ? out : ['any'];
  }
  if (typeof v === 'string' && v.trim()) {
    return [v.trim().toLowerCase()];
  }
  return ['any'];
}

// Related rules are stored as `${category}/${slug}` strings. We tolerate a
// few alternative shapes when reading old or hand-edited frontmatter.
export function normalizeRelated(v) {
  if (Array.isArray(v)) {
    return v.map((x) => String(x).trim()).filter(Boolean);
  }
  if (typeof v === 'string' && v.trim()) {
    return v.split(',').map((s) => s.trim()).filter(Boolean);
  }
  return [];
}
