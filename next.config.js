/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // better-sqlite3 est un module natif Node.js — ne pas bundler via webpack
    serverComponentsExternalPackages: ['better-sqlite3'],
  },
};
module.exports = nextConfig;
