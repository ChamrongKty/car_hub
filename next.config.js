/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.imagin.studio"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
