import type { PublicContent } from "./public";
import type { SearchItem } from "@/features/search/search.data";
export function searchPublishedContent(
  data: PublicContent,
  query: string,
): SearchItem[] {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const index: SearchItem[] = [
    ...data.products.map((product) => ({
      id: product.id,
      title: product.title,
      type: "Product" as const,
      href: `/products/${product.slug}`,
      description: (
        product.short_description ||
        product.description ||
        ""
      ).slice(0, 300),
      keywords: [
        product.brands?.name || "",
        product.categories?.name || "",
        product.model_number || "",
      ],
      brand: product.brands?.name,
    })),
    ...data.brands.map((brand) => ({
      id: brand.id,
      title: brand.name,
      type: "Brand" as const,
      href: `/brands/${brand.slug}`,
      description: (brand.description || "").slice(0, 300),
      keywords: [brand.tagline || ""],
    })),
    ...data.categories.map((category) => ({
      id: category.id,
      title: category.name,
      type: "Category" as const,
      href: `/products?category=${encodeURIComponent(category.slug === "micropipettes" ? "Micropipette" : category.name)}`,
      description: (category.description || "").slice(0, 300),
      keywords: [category.slug],
    })),
    ...data.articles.map((article) => ({
      id: article.id,
      title: article.title,
      type: "Article" as const,
      href: `/blog/${article.slug}`,
      description: article.excerpt || "",
      keywords: article.tags,
    })),
    ...data.pages.map((page) => ({
      id: page.id,
      title: page.title,
      type: "Page" as const,
      href: ["home", "about", "oem", "applications", "faq"].includes(page.slug)
        ? page.slug === "home"
          ? "/"
          : `/${page.slug}`
        : `/pages/${page.slug}`,
      description: page.description || "",
      keywords: [page.slug],
    })),
  ];
  return index
    .filter((item) =>
      words.every((word) =>
        `${item.title} ${item.description} ${item.keywords.join(" ")}`
          .toLowerCase()
          .includes(word),
      ),
    )
    .sort(
      (a, b) =>
        Number(b.title.toLowerCase().includes(query.toLowerCase())) -
          Number(a.title.toLowerCase().includes(query.toLowerCase())) ||
        a.title.localeCompare(b.title),
    );
}
