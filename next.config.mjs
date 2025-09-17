/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // ensure app dir is enabled
    appDir: true
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' }
    ]
  }
};

export default nextConfig;
