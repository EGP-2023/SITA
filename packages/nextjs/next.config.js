// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  nodejs_compat: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
