// Single source of truth for category metadata. The Golden "category" is a
// cross-cutting tag (frontmatter `golden: true`), not a folder — but it gets
// its own nav entry and aggregator page.

export const CATEGORIES = [
  {
    slug: 'transform',
    label: 'Transform',
    icon: '🔁',
    description: 'How elements change, animate, and respond.',
  },
  {
    slug: 'flow',
    label: 'Flow',
    icon: '🌊',
    description: 'How users move through screens and tasks.',
  },
  {
    slug: 'intent',
    label: 'Intent',
    icon: '🎯',
    description: 'What the UI is trying to communicate.',
  },
  {
    slug: 'visual-elements',
    label: 'Visual Elements',
    icon: '🟦',
    description: 'Buttons, cards, surfaces, type — the building blocks.',
  },
];

export const GOLDEN = {
  slug: 'golden',
  label: 'Golden Rules',
  icon: '⭐',
  description: 'The non-negotiables — promoted across all four categories.',
};

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug);

export function getCategory(slug) {
  return CATEGORIES.find((c) => c.slug === slug);
}
