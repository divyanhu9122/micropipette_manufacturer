import type { NextRequest } from "next/server";
import { staffEndpoint } from "@/lib/auth/request";
import { readJsonObject } from "@/lib/http/request";
import { databaseError } from "@/lib/http/responses";
import { parseBrandInput } from "@/lib/validation/admin";

export async function GET(request: NextRequest) {
  return staffEndpoint(request, "content:read", async ({ client }) => {
    const { data, error } = await client
      .from("brands")
      .select("*")
      .order("sort_order", { ascending: true })
      .limit(200);
    if (error) databaseError(error, "list brands");
    return data;
  });
}

export async function POST(request: NextRequest) {
  return staffEndpoint(
    request,
    "content:publish",
    async ({ client }) => {
      const input = parseBrandInput(await readJsonObject(request));
      const { data, error } = await client
        .from("brands")
        .insert(input)
        .select()
        .single();
      if (error) databaseError(error, "create brand");
      return data;
    },
    201,
  );
}
