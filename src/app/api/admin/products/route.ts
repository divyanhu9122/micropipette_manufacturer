import type { NextRequest } from "next/server";
import { staffEndpoint } from "@/lib/auth/request";
import { assertCanPublish } from "@/lib/auth/publishing";
import { readJsonObject } from "@/lib/http/request";
import { databaseError } from "@/lib/http/responses";
import { parseProductInput } from "@/lib/validation/admin";

export async function GET(request: NextRequest) {
  return staffEndpoint(request, "content:read", async ({ client }) => {
    const { data, error } = await client
      .from("products")
      .select("*, brands(name, slug), categories(name, slug)")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) databaseError(error, "list products");
    return data;
  });
}

export async function POST(request: NextRequest) {
  return staffEndpoint(
    request,
    "content:write",
    async ({ client, staff }) => {
      const input = parseProductInput(await readJsonObject(request), true);
      assertCanPublish(staff.role, input.is_active);
      const { data, error } = await client
        .from("products")
        .insert(input)
        .select()
        .single();
      if (error) databaseError(error, "create product");
      return data;
    },
    201,
  );
}
