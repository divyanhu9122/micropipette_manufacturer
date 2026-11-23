import type { NextRequest } from "next/server";
import { staffEndpoint } from "@/lib/auth/request";
import { assertCanPublish } from "@/lib/auth/publishing";
import { hasPermission } from "@/lib/auth/permissions";
import { HttpError } from "@/lib/http/errors";
import { readJsonObject } from "@/lib/http/request";
import { databaseError } from "@/lib/http/responses";
import { parseProductInput, parseRecordId } from "@/lib/validation/admin";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Context) {
  return staffEndpoint(request, "content:write", async ({ client, staff }) => {
    const id = parseRecordId((await params).id);
    const input = parseProductInput(await readJsonObject(request));
    assertCanPublish(staff.role, input.is_active);
    let query = client.from("products").update(input).eq("id", id);
    // Enforce the draft condition in the write itself, avoiding a check-then-write race.
    if (!hasPermission(staff.role, "content:publish"))
      query = query.eq("is_active", false);
    const { data, error } = await query.select().maybeSingle();
    if (error) databaseError(error, "update product");
    if (!data)
      throw new HttpError(404, "NOT_FOUND", "No editable product was found.");
    return data;
  });
}

export async function DELETE(request: NextRequest, { params }: Context) {
  return staffEndpoint(request, "content:publish", async ({ client }) => {
    const id = parseRecordId((await params).id);
    const { data, error } = await client
      .from("products")
      .update({ is_active: false })
      .eq("id", id)
      .select("id")
      .maybeSingle();
    if (error) databaseError(error, "unpublish product");
    if (!data)
      throw new HttpError(404, "NOT_FOUND", "The product was not found.");
    return { success: true };
  });
}
