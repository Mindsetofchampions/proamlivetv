/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.cache = false;
    }
    return config;
  },
  experimental: {
    runtime: 'nodejs'
  },
  output: 'standalone'
};

module.exports = nextConfig;