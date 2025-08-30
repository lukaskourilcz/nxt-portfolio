/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github-readme-activity-graph.vercel.app",
      },
    ],
  },
};

export default nextConfig;
