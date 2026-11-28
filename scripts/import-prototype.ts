import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";
import { productListItems } from "../src/features/products/product-listing/product-listing.data";
import { productCatalog } from "../src/features/products/product-detail/product-detail.data";
import { BRAND_LISTING_ITEMS } from "../src/features/brands/brands.data";
import { BLOG_POSTS } from "../src/features/blog/blog.data";
import { RESOURCES_DATA } from "../src/features/resources/resources.data";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
loadEnvConfig(root, true, { info() {}, error() {} });
class ImportFailure extends Error {}
const slug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
async function run() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL,
    secret =
      process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_KEY;
  if (!url || !secret)
    throw new ImportFailure("Configure the backend before importing content.");
  const client = createClient(url, secret, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const brandNames = Array.from(
    new Set(productListItems.map((item) => item.brandLabel)),
  );
  const categoryNames = Array.from(
    new Set(productListItems.map((item) => item.family)),
  );
  const brandRows = brandNames.map((name) => {
    const source = BRAND_LISTING_ITEMS.find((item) => item.name === name);
    return {
      slug: slug(name),
      name,
      tagline: source?.badge || null,
      description: source?.shortIntro || null,
      is_active: false,
    };
  });
  if (
    (
      await client
        .from("brands")
        .upsert(brandRows, { onConflict: "slug", ignoreDuplicates: true })
    ).error
  )
    throw new ImportFailure("The draft brands could not be imported.");
  if (
    (
      await client.from("categories").upsert(
        categoryNames.map((name) => ({
          slug: slug(name),
          name,
          is_active: false,
        })),
        { onConflict: "slug", ignoreDuplicates: true },
      )
    ).error
  )
    throw new ImportFailure("The draft categories could not be imported.");
  const brands = await client.from("brands").select("id,name");
  const categories = await client.from("categories").select("id,name");
  if (brands.error || categories.error)
    throw new ImportFailure("Related records could not be read.");
  const rows = productListItems
    .filter((item) => !/placeholder|featured-micropipette/.test(item.slug))
    .map((item) => {
      const detail = productCatalog[item.slug];
      const brand = brands.data.find((row) => row.name === item.brandLabel),
        category = categories.data.find((row) => row.name === item.family);
      if (!brand || !category)
        throw new ImportFailure(
          "An imported product has no matching brand or category.",
        );
      return {
        slug: item.slug,
        title: item.title,
        brand_id: brand.id,
        category_id: category.id,
        model_number: detail?.productCode || null,
        short_description: item.description,
        description: detail?.longOverview.join("\n\n") || item.description,
        specifications: detail
          ? Object.fromEntries(
              detail.specifications.map((row) => [row.label, row.value]),
            )
          : Object.fromEntries(
              item.specs.map((value, index) => [`Detail ${index + 1}`, value]),
            ),
        features:
          detail?.features.map((feature) =>
            [feature.title, feature.desc].filter(Boolean).join(": "),
          ) || [],
        applications: detail?.applications || [],
        channels: item.channelType === "Single Channel" ? 1 : 0,
        mechanism: item.typeLabel,
        is_active: false,
        is_featured: false,
      };
    });
  if (
    rows.length &&
    (
      await client
        .from("products")
        .upsert(rows, { onConflict: "slug", ignoreDuplicates: true })
    ).error
  )
    throw new ImportFailure("The draft products could not be imported.");
  const articles = BLOG_POSTS.map((article) => ({
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    content: article.body.join("\n\n"),
    author: article.author.name,
    tags: article.tags,
    category: article.category,
    is_published: false,
    published_at: null,
  }));
  if (
    articles.length &&
    (
      await client
        .from("blog_articles")
        .upsert(articles, { onConflict: "slug", ignoreDuplicates: true })
    ).error
  )
    throw new ImportFailure("The draft articles could not be imported.");
  const previous = await client.from("resources").select("title");
  if (previous.error)
    throw new ImportFailure("Documents could not be checked.");
  const known = new Set(previous.data.map((row) => row.title));
  const kinds: Record<string, string> = {
    catalogue: "brochure",
    datasheet: "datasheet",
    manual: "manual",
    quality: "certificate",
    guide: "other",
  };
  const resources = RESOURCES_DATA.filter((item) => !known.has(item.title)).map(
    (item) => ({
      title: item.title,
      type: kinds[item.category],
      description: item.description,
      brand_id:
        brands.data.find((row) => slug(row.name) === item.brand)?.id || null,
      file_url: null,
      file_size_kb: null,
      is_public: false,
    }),
  );
  if (
    resources.length &&
    (await client.from("resources").insert(resources)).error
  )
    throw new ImportFailure(
      "The draft document descriptions could not be imported.",
    );
  console.log(
    `Imported prototype content as drafts: ${brandRows.length} brands, ${categoryNames.length} categories, ${rows.length} product definitions, ${articles.length} articles, ${resources.length} new document descriptions. Existing records were preserved; no enquiries, reviews, or files were invented or published.`,
  );
}
run().catch((error) => {
  console.error(
    error instanceof ImportFailure
      ? error.message
      : "Import failed. Provider details were withheld; rerunning preserves existing records.",
  );
  process.exitCode = 1;
});
