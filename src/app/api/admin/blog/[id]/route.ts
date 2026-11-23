import type { NextRequest } from "next/server";
import { staffEndpoint } from "@/lib/auth/request";
import { assertCanPublish } from "@/lib/auth/publishing";
import { hasPermission } from "@/lib/auth/permissions";
import { HttpError } from "@/lib/http/errors";
import { readJsonObject } from "@/lib/http/request";
import { databaseError } from "@/lib/http/responses";
import { parseBlogInput, parseRecordId } from "@/lib/validation/admin";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Context) {
  return staffEndpoint(request, "content:write", async ({ client, staff }) => {
    const id = parseRecordId((await params).id);
    const input = parseBlogInput(await readJsonObject(request, 131_072));
    assertCanPublish(staff.role, input.is_published);
    let query = client.from("blog_articles").update(input).eq("id", id);
    if (!hasPermission(staff.role, "content:publish"))
      query = query.eq("is_published", false);
    const { data, error } = await query.select().maybeSingle();
    if (error) databaseError(error, "update article");
    if (!data)
      throw new HttpError(404, "NOT_FOUND", "No editable article was found.");
    return data;
  });
}

export async function DELETE(request: NextRequest, { params }: Context) {
  return staffEndpoint(request, "content:publish", async ({ client }) => {
    const id = parseRecordId((await params).id);
    const { data, error } = await client
      .from("blog_articles")
      .update({ is_published: false })
      .eq("id", id)
      .select("id")
      .maybeSingle();
    if (error) databaseError(error, "unpublish article");
    if (!data)
      throw new HttpError(404, "NOT_FOUND", "The article was not found.");
    return { success: true };
  });
}
