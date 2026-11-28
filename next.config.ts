import type { NextConfig } from "next";

// Fail the build before a server credential can be embedded in a public bundle.
const publicKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
let privilegedPublicKey = publicKey?.startsWith("sb_secret_") ?? false;
if (publicKey?.startsWith("eyJ")) {
  try {
    privilegedPublicKey =
      JSON.parse(Buffer.from(publicKey.split(".")[1], "base64url").toString())
        .role === "service_role";
  } catch {
    /* Invalid public credentials fail closed when used by the backend. */
  }
}
if (privilegedPublicKey)
  throw new Error(
    "A Supabase server secret must never be configured as a NEXT_PUBLIC key.",
  );

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'",
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
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
