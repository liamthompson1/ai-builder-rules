/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare + CloudFront route `holidayextras.com/ai-builder-rules*` to
  // this Heroku app, so we serve the whole site under that prefix.
  basePath: '/ai-builder-rules',

  // Note: we deliberately don't use Server Actions for sign-in/sign-out.
  // Heroku's router rewrites x-forwarded-host to the *.herokuapp hostname,
  // which trips Next.js's Server Actions Origin check whenever the browser
  // is on holidayextras.com. The sign-in/out flow goes through next-auth/
  // react's client signIn/signOut helpers, which POST to the regular auth
  // API routes — no Origin check, no allowedOrigins config required.

  async redirects() {
    return [
      {
        source: '/',
        destination: '/ai-builder-rules',
        basePath: false,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
