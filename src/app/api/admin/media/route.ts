import { NextResponse, type NextRequest } from "next/server";
import { requireStaffRequest } from "@/lib/auth/request";
import { mediaLocation } from "@/lib/cms/media";
import { HttpError } from "@/lib/http/errors";
import { errorResponse } from "@/lib/http/responses";
export async function GET(request: NextRequest) {
  try {
    const { client } = await requireStaffRequest(request, "content:read");
    const location = mediaLocation(
      request.nextUrl.searchParams.get("bucket") || "",
      (request.nextUrl.searchParams.get("path") || "").split("/"),
    );
    const { data, error } = await client.storage
      .from(location.bucket)
      .createSignedUrl(location.path, 60);
    if (error || !data?.signedUrl)
      throw new HttpError(404, "NOT_FOUND", "The file was not found.");
    const response = NextResponse.redirect(data.signedUrl);
    response.headers.set("Cache-Control", "private,no-store");
    response.headers.set("Vary", "Cookie,Authorization");
    response.headers.set("Referrer-Policy", "no-referrer");
    return response;
  } catch (error) {
    return errorResponse(error, "staff media preview");
  }
}
