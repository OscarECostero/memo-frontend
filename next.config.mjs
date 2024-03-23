/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['emojicdn.elk.sh'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
