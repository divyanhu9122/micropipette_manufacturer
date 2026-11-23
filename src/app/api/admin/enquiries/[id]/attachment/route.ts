import { NextResponse, type NextRequest } from "next/server";
import { requireStaffRequest } from "@/lib/auth/request";
import { parseRecordId } from "@/lib/validation/admin";
import { HttpError } from "@/lib/http/errors";
import { errorResponse, databaseError } from "@/lib/http/responses";
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { client } = await requireStaffRequest(request, "enquiries:read");
    const id = parseRecordId((await params).id);
    const { data, error } = await client
      .from("enquiries")
      .select("attachment_path,attachment_name")
      .eq("id", id)
      .maybeSingle();
    if (error) databaseError(error, "read reference file");
    if (!data?.attachment_path)
      throw new HttpError(404, "NOT_FOUND", "No reference file is available.");
    const result = await client.storage
      .from("enquiry-attachments")
      .createSignedUrl(data.attachment_path, 60, {
        download: data.attachment_name || true,
      });
    if (result.error || !result.data?.signedUrl)
      throw new HttpError(
        404,
        "NOT_FOUND",
        "The reference file is unavailable.",
      );
    const response = NextResponse.redirect(result.data.signedUrl);
    response.headers.set("Cache-Control", "private,no-store");
    response.headers.set("Vary", "Cookie,Authorization");
    response.headers.set("Referrer-Policy", "no-referrer");
    return response;
  } catch (error) {
    return errorResponse(error, "download reference file");
  }
}
