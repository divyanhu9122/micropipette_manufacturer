import "server-only";
import { getPublicContent } from "./public";
import type {
  Brand,
  Category,
  Product,
  BlogArticle,
  Resource,
} from "@/types/cms";

// Compatibility exports share the same published source as routes/search/sitemap.
export async function getAllProducts(): Promise<Product[]> {
  return (await getPublicContent()).products;
}
export async function getFeaturedProducts(): Promise<Product[]> {
  return (await getAllProducts())
    .filter((product) => product.is_featured)
    .slice(0, 8);
}
export async function getProductBySlug(slug: string): Promise<Product | null> {
  return (
    (await getAllProducts()).find((product) => product.slug === slug) ?? null
  );
}
export async function getProductsByBrand(slug: string): Promise<Product[]> {
  return (await getAllProducts()).filter(
    (product) => product.brands?.slug === slug,
  );
}
export async function getProductsByCategory(slug: string): Promise<Product[]> {
  return (await getAllProducts()).filter(
    (product) => product.categories?.slug === slug,
  );
}
export async function getAllProductSlugs(): Promise<string[]> {
  return (await getAllProducts()).map((product) => product.slug);
}
export async function getAllBrands(): Promise<Brand[]> {
  return (await getPublicContent()).brands;
}
export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  return (await getAllBrands()).find((brand) => brand.slug === slug) ?? null;
}
export async function getAllBrandSlugs(): Promise<string[]> {
  return (await getAllBrands()).map((brand) => brand.slug);
}
export async function getAllCategories(): Promise<Category[]> {
  return (await getPublicContent()).categories;
}
export async function getAllBlogArticles(): Promise<
  Omit<BlogArticle, "content">[]
> {
  return (await getPublicContent()).articles
    .map((article) => {
      const { content, ...summary } = article;
      void content;
      return summary;
    })
    .sort(
      (a, b) =>
        Date.parse(b.published_at || b.created_at) -
        Date.parse(a.published_at || a.created_at),
    );
}
export async function getBlogArticleBySlug(
  slug: string,
): Promise<BlogArticle | null> {
  return (
    (await getPublicContent()).articles.find(
      (article) => article.slug === slug,
    ) ?? null
  );
}
export async function getAllBlogSlugs(): Promise<string[]> {
  return (await getPublicContent()).articles.map((article) => article.slug);
}
export async function getAllResources(): Promise<Resource[]> {
  return (await getPublicContent()).resources;
}
export async function getSetting(key: string): Promise<unknown | null> {
  return (
    (await getPublicContent()).settings.find((setting) => setting.key === key)
      ?.value ?? null
  );
}
