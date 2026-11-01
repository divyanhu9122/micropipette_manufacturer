import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/products/pipette-tips",
        destination: "/products?category=Lab+Plasticware",
        permanent: true,
      },
      {
        source: "/category/pipette-tips",
        destination: "/products?category=Lab+Plasticware",
        permanent: true,
      },
      {
        source: "/category/lab-plasticware",
        destination: "/products?category=Lab+Plasticware",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
