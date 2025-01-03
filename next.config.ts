import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "google.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "books.google.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
