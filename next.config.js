/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'lix660qlnuupibcz.public.blob.vercel-storage.com',
        },
        {
          protocol: 'https',
          hostname: 'dven4n1lcbnp2lyb.public.blob.vercel-storage.com',
        },
      ],
      },
}

module.exports = nextConfig
