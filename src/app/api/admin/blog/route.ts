import type { NextRequest } from "next/server";
import { staffEndpoint } from "@/lib/auth/request";
import { assertCanPublish } from "@/lib/auth/publishing";
import { readJsonObject } from "@/lib/http/request";
import { databaseError } from "@/lib/http/responses";
import { parseBlogInput } from "@/lib/validation/admin";

export async function GET(request: NextRequest) {
  return staffEndpoint(request, "content:read", async ({ client }) => {
    const { data, error } = await client
      .from("blog_articles")
      .select(
        "id, slug, title, author, tags, is_published, published_at, created_at",
      )
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) databaseError(error, "list articles");
    return data;
  });
}

export async function POST(request: NextRequest) {
  return staffEndpoint(
    request,
    "content:write",
    async ({ client, staff }) => {
      const input = parseBlogInput(
        await readJsonObject(request, 131_072),
        true,
      );
      assertCanPublish(staff.role, input.is_published);
      const { data, error } = await client
        .from("blog_articles")
        .insert(input)
        .select()
        .single();
      if (error) databaseError(error, "create article");
      return data;
    },
    201,
  );
}
