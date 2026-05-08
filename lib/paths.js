// Shared base path. Next.js `<Link>` components auto-prefix this from the
// next.config.mjs `basePath` setting, but `fetch()` calls do NOT — so when
// hitting our own API routes from the client, prefix manually.

export const BASE_PATH = '/ai-builder-rules';
