// ============================================================
// TYPED CMS FETCHER HELPERS (STAGE 10)
// High-level query functions with automatic fallback to mock data
// ============================================================

import {
  CmsProduct,
  CmsCategory,
  CmsBrand,
  CmsResource,
  CmsBlogArticle,
  CmsSettings,
  CmsEnquiryPayload,
  CmsEnquiry,
  StrapiCollectionResponse,
  StrapiResponse,
} from "@/types/cms";
import { cmsFetch, cmsMutate } from "./client";
import {
  INITIAL_ADMIN_PRODUCTS,
  INITIAL_ADMIN_CATEGORIES,
  INITIAL_ADMIN_BRANDS,
  INITIAL_ADMIN_RESOURCES,
  INITIAL_ADMIN_BLOG_ARTICLES,
  INITIAL_ADMIN_SETTINGS,
} from "@/features/admin/admin.data";

// ------------------------------------------------------------
// PRODUCTS
// ------------------------------------------------------------

export async function fetchCmsProducts(): Promise<CmsProduct[]> {
  const remote = await cmsFetch<StrapiCollectionResponse<CmsProduct>>(
    "/products?populate=*"
  );
  if (remote?.data && Array.isArray(remote.data)) {
    return remote.data;
  }

  // Graceful fallback to verified prototype products
  return INITIAL_ADMIN_PRODUCTS.map((p, idx) => ({
    id: idx + 1,
    title: p.title,
    slug: p.slug,
    sku: p.code,
    mechanism: "Mechanical (Manual)",
    autoclavability: "Autoclavable Lower Assembly",
    overview: p.overview,
    features: p.features,
    specifications: p.specs,
    displayOrder: p.displayOrder,
  }));
}

export async function fetchCmsProductBySlug(
  slug: string
): Promise<CmsProduct | null> {
  const remote = await cmsFetch<StrapiCollectionResponse<CmsProduct>>(
    `/products?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
  );
  if (remote?.data?.[0]) {
    return remote.data[0];
  }

  const fallback = INITIAL_ADMIN_PRODUCTS.find((p) => p.slug === slug);
  if (!fallback) return null;

  return {
    id: 1,
    title: fallback.title,
    slug: fallback.slug,
    sku: fallback.code,
    mechanism: "Mechanical (Manual)",
    autoclavability: "Autoclavable Lower Assembly",
    overview: fallback.overview,
    features: fallback.features,
    specifications: fallback.specs,
    displayOrder: fallback.displayOrder,
  };
}

// ------------------------------------------------------------
// CATEGORIES
// ------------------------------------------------------------

export async function fetchCmsCategories(): Promise<CmsCategory[]> {
  const remote = await cmsFetch<StrapiCollectionResponse<CmsCategory>>(
    "/categories?populate=*"
  );
  if (remote?.data) return remote.data;

  return INITIAL_ADMIN_CATEGORIES.map((c, idx) => ({
    id: idx + 1,
    name: c.name,
    slug: c.slug,
    description: c.description,
    displayOrder: c.order,
  }));
}

// ------------------------------------------------------------
// BRANDS
// ------------------------------------------------------------

export async function fetchCmsBrands(): Promise<CmsBrand[]> {
  const remote = await cmsFetch<StrapiCollectionResponse<CmsBrand>>(
    "/brands?populate=*"
  );
  if (remote?.data) return remote.data;

  return INITIAL_ADMIN_BRANDS.map((b, idx) => ({
    id: idx + 1,
    name: b.name,
    tagline: b.tagline,
    slug: b.slug,
    summary: b.summary,
    displayOrder: b.displayOrder,
  }));
}

export async function fetchCmsBrandBySlug(
  slug: string
): Promise<CmsBrand | null> {
  const remote = await cmsFetch<StrapiCollectionResponse<CmsBrand>>(
    `/brands?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
  );
  if (remote?.data?.[0]) return remote.data[0];

  const found = INITIAL_ADMIN_BRANDS.find((b) => b.slug === slug);
  if (!found) return null;

  return {
    id: 1,
    name: found.name,
    tagline: found.tagline,
    slug: found.slug,
    summary: found.summary,
    displayOrder: found.displayOrder,
  };
}

// ------------------------------------------------------------
// RESOURCES
// ------------------------------------------------------------

export async function fetchCmsResources(): Promise<CmsResource[]> {
  const remote = await cmsFetch<StrapiCollectionResponse<CmsResource>>(
    "/resources?populate=*"
  );
  if (remote?.data) return remote.data;

  return INITIAL_ADMIN_RESOURCES.map((r, idx) => ({
    id: idx + 1,
    title: r.title,
    type: r.type,
    downloadLabel: r.downloadLabel,
    isGated: false,
  }));
}

// ------------------------------------------------------------
// BLOG ARTICLES
// ------------------------------------------------------------

export async function fetchCmsBlogArticles(): Promise<CmsBlogArticle[]> {
  const remote = await cmsFetch<StrapiCollectionResponse<CmsBlogArticle>>(
    "/blog-articles?sort=publishDate:desc&populate=*"
  );
  if (remote?.data) return remote.data;

  return INITIAL_ADMIN_BLOG_ARTICLES.map((a, idx) => ({
    id: idx + 1,
    title: a.title,
    slug: a.slug,
    category: a.category,
    author: a.author,
    publishDate: a.date,
    excerpt: a.excerpt,
    content: a.content,
    tags: a.tags,
  }));
}

export async function fetchCmsBlogArticleBySlug(
  slug: string
): Promise<CmsBlogArticle | null> {
  const remote = await cmsFetch<StrapiCollectionResponse<CmsBlogArticle>>(
    `/blog-articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
  );
  if (remote?.data?.[0]) return remote.data[0];

  const found = INITIAL_ADMIN_BLOG_ARTICLES.find((a) => a.slug === slug);
  if (!found) return null;

  return {
    id: 1,
    title: found.title,
    slug: found.slug,
    category: found.category,
    author: found.author,
    publishDate: found.date,
    excerpt: found.excerpt,
    content: found.content,
    tags: found.tags,
  };
}

// ------------------------------------------------------------
// SETTINGS
// ------------------------------------------------------------

export async function fetchCmsSettings(): Promise<CmsSettings> {
  const remote = await cmsFetch<StrapiResponse<CmsSettings>>("/setting");
  if (remote?.data) return remote.data;

  return {
    siteName: INITIAL_ADMIN_SETTINGS.siteName,
    siteTagline: INITIAL_ADMIN_SETTINGS.tagline,
    defaultDescription: INITIAL_ADMIN_SETTINGS.defaultDescription,
    defaultTitlePattern: INITIAL_ADMIN_SETTINGS.defaultTitlePattern,
    defaultRobots: INITIAL_ADMIN_SETTINGS.defaultRobots,
    contactEmail: INITIAL_ADMIN_SETTINGS.contactEmail,
    contactPhone: INITIAL_ADMIN_SETTINGS.contactPhone,
    address: INITIAL_ADMIN_SETTINGS.address,
    linkedin: INITIAL_ADMIN_SETTINGS.linkedin,
    twitter: INITIAL_ADMIN_SETTINGS.twitter,
  };
}

// ------------------------------------------------------------
// ENQUIRY SUBMISSION (MUTATION)
// ------------------------------------------------------------

export async function submitCmsEnquiry(
  payload: CmsEnquiryPayload
): Promise<{ success: boolean; id?: string }> {
  const remote = await cmsMutate<StrapiResponse<CmsEnquiry>, CmsEnquiryPayload>(
    "/enquiries",
    payload
  );

  if (remote?.data?.id) {
    return { success: true, id: String(remote.data.id) };
  }

  // Local prototype logging fallback when CMS is not yet connected
  console.info(
    "[Enquiry Handler] Mocking local enquiry submission receipt:",
    payload
  );
  return { success: true, id: `local-enq-${Date.now()}` };
}
