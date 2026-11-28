import type { NextRequest } from "next/server";
import { staffEndpoint } from "@/lib/auth/request";
import { HttpError } from "@/lib/http/errors";
import { readJsonObject } from "@/lib/http/request";
import { databaseError } from "@/lib/http/responses";
import { parseEnquiryUpdate, parseRecordId } from "@/lib/validation/admin";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return staffEndpoint(request, "enquiries:write", async ({ client }) => {
    const id = parseRecordId((await params).id);
    const input = parseEnquiryUpdate(await readJsonObject(request));
    const { data, error } = await client
      .from("enquiries")
      .update(input)
      .eq("id", id)
      .select("id, enquiry_id, status, internal_notes")
      .maybeSingle();
    if (error) databaseError(error, "update enquiry");
    if (!data)
      throw new HttpError(404, "NOT_FOUND", "The enquiry was not found.");
    return data;
  });
}
