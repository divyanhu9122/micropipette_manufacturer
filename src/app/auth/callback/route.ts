import { NextResponse, type NextRequest } from "next/server";
import { createServerSupabaseClient } from "@/lib/cms/server";
import { getSiteOrigin } from "@/lib/config/site";
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (code) {
    const client = await createServerSupabaseClient();
    const { error } = await client.auth.exchangeCodeForSession(code);
    if (!error) {
      const response = NextResponse.redirect(
        new URL("/staff/set-password", getSiteOrigin()),
      );
      response.headers.set("Cache-Control", "private,no-store");
      return response;
    }
  }
  const response = NextResponse.redirect(
    new URL("/staff/login?reason=invalid-link", getSiteOrigin()),
  );
  response.headers.set("Cache-Control", "private,no-store");
  return response;
}
