/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'photos.applyboard.com',
      'res.cloudinary.com',
      'picsum.photos',
      'media.istockphoto.com',
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)\\.(png|jpg|webp|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400', // Cache for 1 day
          },
        ],
      },
    ]
  },
}

export default nextConfig
