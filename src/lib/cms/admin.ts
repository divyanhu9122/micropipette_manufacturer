import "server-only";
import { createClient } from "@supabase/supabase-js";
import { requireSupabasePublicConfig } from "@/lib/config/supabase";
import { HttpError } from "@/lib/http/errors";

/** Only trusted server workflows may bypass RLS. Never use this for staff CRUD. */
export function createPrivilegedSupabaseClient() {
  const { url } = requireSupabasePublicConfig();
  const secret = (
    process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_KEY
  )?.trim();
  if (!secret || /^(your-|placeholder)/i.test(secret)) {
    throw new HttpError(
      503,
      "BACKEND_NOT_CONFIGURED",
      "The backend has not been connected yet. Please try again later.",
    );
  }
  return createClient(url, secret, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
