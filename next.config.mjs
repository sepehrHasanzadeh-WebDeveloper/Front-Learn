/** @type {import('next').NextConfig} */

const nextConfig = {
  reactCompiler: true,
  images: {
    domains: ["frontcast.ir"],
  },
  allowedDevOrigins: ["192.168.1.101"],
};

export default nextConfig;