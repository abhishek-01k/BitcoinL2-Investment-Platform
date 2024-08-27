/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["assets.coingecko.com", "cryptologos.cc", "files.alvara.xyz", 'next-cdn.unisat.io', 'static.unisat.io'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
