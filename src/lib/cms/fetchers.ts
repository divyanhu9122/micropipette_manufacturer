import { supabase } from './client'
import type { Brand, Category, Product, BlogArticle, Resource } from '@/types/cms'

// ─── Products ────────────────────────────────────────────────────────────────

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select(`*, brands(*), categories(*)`)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('[CMS] getAllProducts:', error.message)
    return []
  }
  return data as Product[]
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select(`*, brands(*), categories(*)`)
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('sort_order', { ascending: true })
    .limit(8)

  if (error) {
    console.error('[CMS] getFeaturedProducts:', error.message)
    return []
  }
  return data as Product[]
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select(`*, brands(*), categories(*)`)
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('[CMS] getProductBySlug:', error.message)
    return null
  }
  return data as Product
}

export async function getProductsByBrand(brandSlug: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select(`*, brands!inner(*), categories(*)`)
    .eq('brands.slug', brandSlug)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('[CMS] getProductsByBrand:', error.message)
    return []
  }
  return data as Product[]
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select(`*, brands(*), categories!inner(*)`)
    .eq('categories.slug', categorySlug)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('[CMS] getProductsByCategory:', error.message)
    return []
  }
  return data as Product[]
}

export async function getAllProductSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('products')
    .select('slug')
    .eq('is_active', true)

  if (error) {
    console.error('[CMS] getAllProductSlugs:', error.message)
    return []
  }
  return data.map((p) => p.slug)
}

// ─── Brands ──────────────────────────────────────────────────────────────────

export async function getAllBrands(): Promise<Brand[]> {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('[CMS] getAllBrands:', error.message)
    return []
  }
  return data as Brand[]
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('[CMS] getBrandBySlug:', error.message)
    return null
  }
  return data as Brand
}

export async function getAllBrandSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('brands')
    .select('slug')
    .eq('is_active', true)

  if (error) {
    console.error('[CMS] getAllBrandSlugs:', error.message)
    return []
  }
  return data.map((b) => b.slug)
}

// ─── Categories ──────────────────────────────────────────────────────────────

export async function getAllCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('[CMS] getAllCategories:', error.message)
    return []
  }
  return data as Category[]
}

// ─── Blog ────────────────────────────────────────────────────────────────────

export async function getAllBlogArticles(): Promise<Omit<BlogArticle, 'content'>[]> {
  const { data, error } = await supabase
    .from('blog_articles')
    .select('id, slug, title, excerpt, author, tags, cover_image, published_at, read_time_minutes, category')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  if (error) {
    console.error('[CMS] getAllBlogArticles:', error.message)
    return []
  }
  return data as Omit<BlogArticle, 'content'>[]
}

export async function getBlogArticleBySlug(slug: string): Promise<BlogArticle | null> {
  const { data, error } = await supabase
    .from('blog_articles')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error) {
    console.error('[CMS] getBlogArticleBySlug:', error.message)
    return null
  }
  return data as BlogArticle
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('blog_articles')
    .select('slug')
    .eq('is_published', true)

  if (error) {
    console.error('[CMS] getAllBlogSlugs:', error.message)
    return []
  }
  return data.map((a) => a.slug)
}

// ─── Resources ───────────────────────────────────────────────────────────────

export async function getAllResources(): Promise<Resource[]> {
  const { data, error } = await supabase
    .from('resources')
    .select(`*, brands(name, slug)`)
    .eq('is_public', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[CMS] getAllResources:', error.message)
    return []
  }
  return data as Resource[]
}

// ─── Settings ────────────────────────────────────────────────────────────────

export async function getSetting(key: string): Promise<unknown | null> {
  const { data, error } = await supabase
    .from('settings')
    .select('value')
    .eq('key', key)
    .single()

  if (error) return null
  return data?.value ?? null
}
