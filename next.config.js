// next.config.js
const nextConfig = {
  experimental: { esmExternals: true },
  images: {
    domains: ["upload.wikimedia.org", "https://extreme-ip-lookup.com"],
  },
};

module.exports = nextConfig;
