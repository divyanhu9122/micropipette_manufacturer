import type { MetadataRoute } from "next";
import { getPublicContent } from "@/lib/cms/public";
import { getSiteOrigin } from "@/lib/config/site";
export const revalidate = 60;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = getSiteOrigin();
  const data = await getPublicContent();
  const paths = [
    "",
    "/products",
    "/products/micropipettes",
    "/brands",
    "/blog",
    "/resources",
    "/about",
    "/oem",
    "/applications",
    "/contact",
    "/request-quote",
    "/faq",
    "/privacy-policy",
    "/terms",
    ...data.products.map((p) => `/products/${p.slug}`),
    ...data.brands.map((b) => `/brands/${b.slug}`),
    ...data.articles.map((a) => `/blog/${a.slug}`),
    ...data.pages
      .filter(
        (p) =>
          !["home", "about", "oem", "applications", "faq"].includes(p.slug),
      )
      .map((p) => `/pages/${p.slug}`),
  ];
  return Array.from(new Set(paths)).map((path) => ({ url: origin + path }));
}
