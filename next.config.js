/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  allowedDevOrigins: ['192.168.1.*'],
  images: {
    unoptimized: true,
    qualities: [75, 80],
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
