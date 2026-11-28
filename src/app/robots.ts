import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/config/site";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/staff/",
        "/auth/",
        "/api/admin/",
        "/api/auth/",
        "/api/enquiries",
        "/api/jobs/",
      ],
    },
    sitemap: `${getSiteOrigin()}/sitemap.xml`,
  };
}
