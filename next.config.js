/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "i.ibb.co", "res.cloudinary.com"],
  },
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  swcMinify: false,
};

module.exports = nextConfig;