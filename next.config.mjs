/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare routes `*.holidayextras.com/ai-builder-rules*` to this Heroku
  // app without stripping the prefix, so we serve the whole site at
  // /ai-builder-rules/*. Asset URLs (/_next/...) get the same prefix
  // automatically. The bare Heroku URL `/` redirects below for convenience.
  basePath: '/ai-builder-rules',

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
