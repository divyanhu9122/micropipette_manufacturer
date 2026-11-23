import type { Product, Brand, BlogArticle, Resource } from "@/types/cms";
import type { ProductDetailItem } from "@/features/products/product-detail/product-detail.data";
import type { ProductListItem } from "@/features/products/product-listing/product-listing.data";
import type { BlogPost } from "@/features/blog/blog.data";
import type {
  BrandDetailItem,
  BrandListingCard,
} from "@/features/brands/brands.data";
import type { ResourceItem } from "@/features/resources/resources.data";

const paragraphs = (value: string | null) =>
  (value || "")
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
export function volumeRange(product: Product) {
  if (product.volume_min === null || product.volume_max === null)
    return "Not specified";
  return `${product.volume_min} – ${product.volume_max} ${product.volume_unit}`;
}
const channelLabel = (channels: number) =>
  channels > 1
    ? `${channels} channels`
    : channels === 1
      ? "Single Channel"
      : "Not specified";
export function productListItem(product: Product): ProductListItem {
  const family =
    product.categories?.slug === "micropipettes"
      ? "Micropipette"
      : product.categories?.name || "Laboratory Instruments";
  return {
    id: product.id,
    slug: product.slug,
    brandLabel: product.brands?.name || "",
    typeLabel: product.mechanism || product.categories?.name || "",
    title: product.title,
    description: product.short_description || product.description || "",
    specs: [
      volumeRange(product),
      channelLabel(product.channels),
      product.autoclave_type || (product.is_autoclavable ? "Autoclavable" : ""),
    ].filter(Boolean),
    family,
    subtype: product.mechanism || undefined,
    channelType:
      product.channels > 1
        ? "Multichannel"
        : product.channels === 1
          ? "Single Channel"
          : undefined,
    volumeRange: volumeRange(product),
    imageUrl: product.images[0],
  };
}
export function productDetail(
  product: Product,
  all: Product[] = [],
): ProductDetailItem {
  const specifications = Object.entries(product.specifications)
    .filter(([, value]) =>
      ["string", "number", "boolean"].includes(typeof value),
    )
    .map(([label, value]) => ({ label, value: String(value) }));
  for (const [label, value] of Object.entries(
    product.accuracy_tolerances || {},
  )) {
    if (value !== null && value !== undefined)
      specifications.push({
        label: `Tolerance — ${label}`,
        value:
          typeof value === "object" ? JSON.stringify(value) : String(value),
      });
  }
  return {
    id: product.id,
    slug: product.slug,
    title: product.title,
    brand: product.brands?.name || "",
    typeLabel: product.mechanism || product.categories?.name || "",
    shortOverview: product.short_description || "",
    productCode: product.model_number || "",
    category: product.categories?.name || "",
    keySpecs: {
      volumeRange: volumeRange(product),
      increment: String(product.specifications.Increment ?? "Not specified"),
      channel: channelLabel(product.channels),
      autoclavable:
        product.autoclave_type ||
        (product.is_autoclavable ? "Autoclavable" : "Not specified"),
    },
    longOverview: paragraphs(product.description),
    specifications,
    features: (product.features || []).map((title, index) => ({
      num: String(index + 1).padStart(2, "0"),
      title,
      desc: "",
    })),
    applications: product.applications || [],
    downloads: product.datasheet_url
      ? [
          {
            title: "Product datasheet",
            format: "PDF",
            size: "",
            url: product.datasheet_url,
          },
        ]
      : [],
    relatedSlugs: all
      .filter(
        (other) =>
          other.id !== product.id && other.category_id === product.category_id,
      )
      .slice(0, 3)
      .map((other) => other.slug),
    images: product.images,
  };
}
export function blogPost(article: BlogArticle): BlogPost {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt || "",
    body: paragraphs(article.content),
    category: article.category || "Articles",
    tags: article.tags,
    author: { name: article.author, role: "Editorial team" },
    publishedDate: article.published_at || article.created_at,
    readingTime: `${article.read_time_minutes || Math.max(1, Math.ceil((article.content || "").split(/\s+/).length / 200))} min read`,
    featured: false,
  };
}
export function brandCard(brand: Brand): BrandListingCard {
  return {
    id: brand.id,
    slug: brand.slug,
    name: brand.name,
    badge: brand.tagline || "",
    logoClass: ["labxe", "ssciences", "danwer"].includes(brand.slug)
      ? (brand.slug as "labxe" | "ssciences" | "danwer")
      : undefined,
    shortIntro: brand.description || "",
    tags: [],
    logoUrl: brand.logo_url || undefined,
  };
}
export function brandDetail(
  brand: Brand,
  products: Product[],
  resources: Resource[],
): BrandDetailItem {
  return {
    id: brand.id,
    slug: brand.slug,
    name: brand.name,
    brandLogoClass: brand.slug,
    badge: "",
    tagline: brand.tagline || "",
    shortIntro: brand.description || "",
    tags: [],
    aboutStory: paragraphs(brand.description),
    facts: [],
    featuredProducts: products
      .filter((p) => p.brand_id === brand.id)
      .slice(0, 6)
      .map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        brandTag: brand.name,
        description: p.short_description || "",
        typeLabel: p.mechanism || "",
      })),
    capabilities: [],
    resources: resources
      .filter((r) => r.brand_id === brand.id && r.file_url)
      .map((r) => ({
        id: r.id,
        title: r.title,
        format: "PDF",
        size: r.file_size_kb ? `${r.file_size_kb} KB` : "",
        url: r.file_url!,
      })),
    officialWebsiteUrl: brand.website || "",
  };
}
export function resourceItem(resource: Resource): ResourceItem {
  const categories: Record<string, ResourceItem["category"]> = {
    brochure: "catalogue",
    manual: "manual",
    datasheet: "datasheet",
    certificate: "quality",
    other: "guide",
  };
  return {
    id: resource.id,
    title: resource.title,
    category: categories[resource.type],
    brand: resource.brands?.slug || "all",
    format: "PDF",
    fileSize: resource.file_size_kb ? `${resource.file_size_kb} KB` : "",
    description: resource.description || "",
    url: resource.file_url || undefined,
  };
}
