/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.utfs.io', // Wildcard for all subdomains
      },
      {
        protocol: 'https',
        hostname: '*.ufs.sh', // Allows any subdomain of ufs.sh
      },
    ],
  },
}

export default nextConfig
