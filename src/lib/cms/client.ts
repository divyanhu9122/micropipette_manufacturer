import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_KEY || 'placeholder-service-key'

// Public client — safe for Server Components and API routes
// Uses anon key — respects Row Level Security policies
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client — bypasses RLS, for server-side write operations only
// NEVER import this in any Client Component or expose to the browser
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
