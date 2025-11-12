/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
    unoptimized: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
