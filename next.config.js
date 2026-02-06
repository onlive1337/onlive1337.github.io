/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/image/**'
      },
      {
        protocol: 'https',
        hostname: 'cdn.cloudflare.steamstatic.com',
        pathname: '/steam/**'
      },
      {
        protocol: 'https',
        hostname: 'is*.mzstatic.com',
        pathname: '/**'
      }
    ]
  },
}

module.exports = nextConfig