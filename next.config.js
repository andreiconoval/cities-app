/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["openweathermap.org"], // Allow images from this domain
  },
};

module.exports = nextConfig;
