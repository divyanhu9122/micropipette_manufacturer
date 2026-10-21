// ============================================================
// STRAPI CMS TYPE DEFINITIONS (STAGE 8 & 10)
// Matching CMS_DATA_ARCHITECTURE.md
// ============================================================

export interface StrapiMediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface StrapiMedia {
  id: number;
  documentId?: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  };
  url: string;
}

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiMeta {
  pagination?: StrapiPagination;
}

export interface StrapiResponse<T> {
  data: T;
  meta?: StrapiMeta;
}

export interface StrapiCollectionResponse<T> {
  data: T[];
  meta: StrapiMeta;
}

// ==========================================
// SHARED COMPONENTS
// ==========================================

export interface SharedSeo {
  id?: number;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  robotsDirective?: string;
  shareImage?: StrapiMedia;
  schemaJson?: Record<string, unknown>;
}

export interface ProductSpecItem {
  id?: number;
  label: string;
  value: string;
}

// ==========================================
// CORE ENTITY DATA MODELS
// ==========================================

export interface CmsBrand {
  id: number;
  documentId?: string;
  name: "LABXE" | "SSCIENCES" | "DANWER";
  tagline: string;
  slug: string;
  summary: string;
  logo?: StrapiMedia;
  bannerImage?: StrapiMedia;
  displayOrder: number;
  seo?: SharedSeo;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface CmsCategory {
  id: number;
  documentId?: string;
  name: string;
  slug: string;
  parent?: CmsCategory;
  children?: CmsCategory[];
  description?: string;
  bannerImage?: StrapiMedia;
  displayOrder: number;
  seo?: SharedSeo;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface CmsResource {
  id: number;
  documentId?: string;
  title: string;
  type:
    | "Catalogue"
    | "Brochure"
    | "Datasheet"
    | "Manual"
    | "Certificate"
    | "Calibration-related"
    | "Other"
    | "Other Technical File";
  file?: StrapiMedia;
  downloadLabel: string;
  brands?: CmsBrand[];
  categories?: CmsCategory[];
  products?: CmsProduct[];
  isGated: boolean;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface CmsProduct {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  sku: string;
  brand?: CmsBrand;
  category?: CmsCategory;
  subcategory?: CmsCategory;
  channelType?: "Single Channel" | "8-Channel" | "12-Channel" | "None";
  mechanism: "Mechanical (Manual)" | "Electronic (Motorized)";
  volumeRangeMin?: number;
  volumeRangeMax?: number;
  volumeUnit?: "µL" | "mL";
  autoclavability:
    | "Fully Autoclavable"
    | "Autoclavable Lower Assembly"
    | "Non-autoclavable";
  overview: string;
  features?: string[];
  specifications: ProductSpecItem[];
  images?: StrapiMedia[];
  resources?: CmsResource[];
  relatedProducts?: CmsProduct[];
  displayOrder: number;
  seo?: SharedSeo;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface CmsBlogArticle {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  publishDate: string;
  readingTime?: string;
  excerpt: string;
  content: string;
  featuredImage?: StrapiMedia;
  tags?: string[];
  faq?: Array<{ question: string; answer: string }>;
  relatedProducts?: CmsProduct[];
  seo?: SharedSeo;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface CmsApplication {
  id: number;
  documentId?: string;
  name: string;
  slug: string;
  summary: string;
  icon?: string;
  displayOrder: number;
  products?: CmsProduct[];
}

export interface CmsFaq {
  id: number;
  documentId?: string;
  question: string;
  answer: string;
  category: "General" | "Products" | "OEM" | "Calibration" | "Shipping";
  displayOrder: number;
}

export interface CmsEnquiryPayload {
  name: string;
  email: string;
  phone?: string;
  company: string;
  country: string;
  type:
    | "Product Quote"
    | "Universal / General"
    | "OEM / Private Label"
    | "Technical Resource";
  product?: string;
  quantity?: string;
  message: string;
  oemSpecifications?: string;
}

export interface CmsEnquiry extends CmsEnquiryPayload {
  id: number;
  documentId?: string;
  status: "New" | "Open" | "Responded" | "Closed";
  internalNotes?: string;
  createdAt: string;
}

export interface CmsSettings {
  siteName: string;
  siteTagline: string;
  defaultDescription: string;
  defaultTitlePattern: string;
  defaultRobots: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  linkedin?: string;
  twitter?: string;
}
