/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare + CloudFront route `holidayextras.com/ai-builder-rules*` to
  // this Heroku app, so we serve the whole site under that prefix.
  basePath: '/ai-builder-rules',

  // Server Actions enforce an Origin / X-Forwarded-Host match for CSRF
  // protection. Heroku's router rewrites x-forwarded-host to the *.herokuapp
  // hostname before our app sees the request, so when the browser is on
  // holidayextras.com the two don't match. Allowlist the public-facing hosts.
  serverActions: {
    allowedOrigins: [
      'www.holidayextras.com',
      'holidayextras.com',
      'www.holidayextras.co.uk',
      'build-rules-2cc3a555fb8c.herokuapp.com',
    ],
  },

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
