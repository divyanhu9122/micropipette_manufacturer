import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabasePublicConfig } from "@/lib/config/supabase";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const config = getSupabasePublicConfig();
  if (config) {
    const client = createServerClient(config.url, config.publishableKey, {
      cookieOptions: {
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      },
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(values, headers) {
          for (const { name, value } of values)
            request.cookies.set(name, value);
          response = NextResponse.next({ request });
          for (const { name, value, options } of values)
            response.cookies.set(name, value, options);
          if (headers)
            for (const [name, value] of Object.entries(headers))
              response.headers.set(name, value);
        },
      },
    });
    // Refresh only here; endpoint/page guards still verify identity and current permissions.
    await client.auth.getClaims();
  }
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Referrer-Policy", "no-referrer");
  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/staff/:path*",
    "/api/admin/:path*",
    "/api/auth/:path*",
    "/auth/:path*",
  ],
};
