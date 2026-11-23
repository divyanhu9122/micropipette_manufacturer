import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { requireSupabasePublicConfig } from "@/lib/config/supabase";

/** A separate client per request keeps one staff member's session out of another's. */
export async function createServerSupabaseClient({ readOnly = false } = {}) {
  const { url, publishableKey } = requireSupabasePublicConfig();
  const store = await cookies();
  return createServerClient(url, publishableKey, {
    cookieOptions: {
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    },
    cookies: {
      getAll: () => store.getAll(),
      setAll(values) {
        // Server Components cannot write cookies; Proxy refreshes them before rendering.
        if (!readOnly)
          for (const { name, value, options } of values)
            store.set(name, value, options);
      },
    },
  });
}
