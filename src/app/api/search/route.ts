import type { NextRequest } from "next/server";
import { getPublicContent } from "@/lib/cms/public";
import { searchPublishedContent } from "@/lib/cms/search";
export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() || "";
  if (query.length > 200)
    return Response.json({ error: "Search is too long." }, { status: 400 });
  try {
    return Response.json(
      {
        items: searchPublishedContent(await getPublicContent(), query).slice(
          0,
          200,
        ),
      },
      { headers: { "Cache-Control": "public,max-age=30" } },
    );
  } catch {
    return Response.json(
      { error: "Search is temporarily unavailable." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
