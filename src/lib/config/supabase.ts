import { HttpError } from "@/lib/http/errors";

export interface SupabasePublicConfig {
  url: string;
  publishableKey: string;
}

export function getSupabasePublicConfig(): SupabasePublicConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const publishableKey = (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )?.trim();
  if (
    !url ||
    !publishableKey ||
    /your-project|placeholder/i.test(url) ||
    /^(your-|placeholder)/i.test(publishableKey)
  ) {
    return null;
  }
  try {
    const parsed = new URL(url);
    const local = ["localhost", "127.0.0.1", "[::1]"].includes(parsed.hostname);
    if (
      parsed.username ||
      parsed.password ||
      (parsed.protocol !== "https:" &&
        !(local && process.env.NODE_ENV !== "production"))
    )
      return null;
    return { url: parsed.origin, publishableKey };
  } catch {
    return null;
  }
}

export function requireSupabasePublicConfig() {
  const config = getSupabasePublicConfig();
  if (!config) {
    throw new HttpError(
      503,
      "BACKEND_NOT_CONFIGURED",
      "The backend has not been connected yet. Please try again later.",
    );
  }
  return config;
}
