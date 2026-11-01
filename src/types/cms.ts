// ─── Brand ───────────────────────────────────────────────────────────────────

export interface Brand {
  id: string
  slug: string
  name: string
  tagline: string | null
  description: string | null
  logo_url: string | null
  website: string | null
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

// ─── Category ────────────────────────────────────────────────────────────────

export interface Category {
  id: string
  slug: string
  name: string
  parent_id: string | null
  description: string | null
  icon: string | null
  sort_order: number
  is_active: boolean
  created_at: string
}

// ─── Product ─────────────────────────────────────────────────────────────────

export interface Product {
  id: string
  slug: string
  title: string
  model_number: string | null
  brand_id: string
  category_id: string
  description: string | null
  short_description: string | null
  volume_min: number | null
  volume_max: number | null
  volume_unit: string
  channels: number
  is_autoclavable: boolean
  autoclave_type: string | null
  mechanism: string | null
  specifications: Record<string, unknown>
  accuracy_tolerances: Record<string, unknown>
  images: string[]
  datasheet_url: string | null
  is_featured: boolean
  is_active: boolean
  meta_title: string | null
  meta_description: string | null
  sort_order: number
  created_at: string
  updated_at: string
  // Joined relations — present when fetched with .select('*, brands(*), categories(*)')
  brands?: Brand
  categories?: Category
}

// ─── Blog Article ─────────────────────────────────────────────────────────────

export interface BlogArticle {
  id: string
  slug: string
  title: string
  content: string | null
  excerpt: string | null
  author: string
  cover_image: string | null
  tags: string[]
  category: string | null
  read_time_minutes: number | null
  is_published: boolean
  published_at: string | null
  meta_title: string | null
  meta_description: string | null
  created_at: string
  updated_at: string
}

// ─── Resource ─────────────────────────────────────────────────────────────────

export interface Resource {
  id: string
  title: string
  type: 'brochure' | 'manual' | 'datasheet' | 'certificate' | 'other'
  file_url: string | null
  file_size_kb: number | null
  brand_id: string | null
  description: string | null
  is_public: boolean
  download_count: number
  created_at: string
  brands?: Pick<Brand, 'name' | 'slug'>
}

// ─── Enquiry ──────────────────────────────────────────────────────────────────

export interface Enquiry {
  id: string
  enquiry_id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  country: string | null
  message: string
  product_slug: string | null
  product_title: string | null
  enquiry_type: 'product' | 'universal' | 'oem' | 'contact'
  status: 'new' | 'read' | 'replied' | 'closed'
  ip_address: string | null
  created_at: string
}

// ─── Settings ─────────────────────────────────────────────────────────────────

export interface SiteSettings {
  title: string
  description: string
}

// ─── Legacy Enquiry Payload Compatibility ────────────────────────────────────

export interface CmsEnquiryPayload {
  name: string
  email: string
  phone?: string
  company: string
  country: string
  type:
    | "Product Quote"
    | "Universal / General"
    | "OEM / Private Label"
    | "Technical Resource"
  product?: string
  quantity?: string
  message: string
  oemSpecifications?: string
}
