/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/overview/active",
        permanent: false,
      },
    ];
  },
};
