/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ✅ Tell Next.js that Cloudinary is a trusted external image domain
  images: {
    domains: ["res.cloudinary.com"],
    // 🚫 Disable the built-in optimizer for all Cloudinary URLs
    unoptimized: true,
  },

  // Optional: improve performance for static export
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
