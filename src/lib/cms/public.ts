import "server-only";
import { unstable_cache } from "next/cache";
import { createPublicSupabaseClient } from "./client";
import { getSupabasePublicConfig } from "@/lib/config/supabase";
import type {
  Brand,
  Category,
  Product,
  BlogArticle,
  Resource,
} from "@/types/cms";

export type CmsPage = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  body: string;
  image_url: string | null;
  is_active: boolean;
  meta_title: string | null;
  meta_description: string | null;
  updated_at: string;
};
export type CmsSetting = {
  id: string;
  key: string;
  value: Record<string, string | null>;
  is_public: boolean;
};
export type PublicContent = {
  products: Product[];
  brands: Brand[];
  categories: Category[];
  articles: BlogArticle[];
  resources: Resource[];
  pages: CmsPage[];
  settings: CmsSetting[];
};

async function publishedRows<T>(
  table: string,
  flag: string,
  selection = "*",
): Promise<T[]> {
  const client = createPublicSupabaseClient();
  const rows: T[] = [];
  for (let start = 0; ; start += 500) {
    let query = client.from(table).select(selection).eq(flag, true);
    query = ["products", "brands", "categories"].includes(table)
      ? query.order("sort_order")
      : query.order("created_at", { ascending: false });
    const { data, error } = await query.order("id").range(start, start + 499);
    if (error) throw new Error("Public content is temporarily unavailable.");
    rows.push(...(data as unknown as T[]));
    if (data.length < 500) break;
  }
  return rows;
}

export const getPublicContent = unstable_cache(
  async (): Promise<PublicContent> => {
    if (!getSupabasePublicConfig())
      return {
        products: [],
        brands: [],
        categories: [],
        articles: [],
        resources: [],
        pages: [],
        settings: [],
      };
    const [products, brands, categories, articles, resources, pages, settings] =
      await Promise.all([
        publishedRows<Product>(
          "products",
          "is_active",
          "*,brands(*),categories(*)",
        ),
        publishedRows<Brand>("brands", "is_active"),
        publishedRows<Category>("categories", "is_active"),
        publishedRows<BlogArticle>("blog_articles", "is_published"),
        publishedRows<Resource>(
          "resources",
          "is_public",
          "*,brands(name,slug)",
        ),
        publishedRows<CmsPage>("pages", "is_active"),
        publishedRows<CmsSetting>("settings", "is_public"),
      ]);
    return {
      products,
      brands,
      categories,
      articles,
      resources,
      pages,
      settings,
    };
  },
  ["public-cms-v2", process.env.NEXT_PUBLIC_SUPABASE_URL || "unconfigured"],
  { revalidate: 60, tags: ["public-cms"] },
);
