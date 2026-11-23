import { createClient } from "@supabase/supabase-js";
import { requireSupabasePublicConfig } from "@/lib/config/supabase";

/** Public, session-free reads. Privileged credentials never enter this module. */
export function createPublicSupabaseClient() {
  const { url, publishableKey } = requireSupabasePublicConfig();
  return createClient(url, publishableKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
