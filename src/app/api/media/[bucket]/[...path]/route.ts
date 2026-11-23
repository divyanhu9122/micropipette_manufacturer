import { NextResponse, type NextRequest } from "next/server";
import { createPublicSupabaseClient } from "@/lib/cms/client";
import { mediaLocation } from "@/lib/cms/media";
import { HttpError } from "@/lib/http/errors";
import { errorResponse } from "@/lib/http/responses";
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ bucket: string; path: string[] }> },
) {
  try {
    const parameters = await params;
    const location = mediaLocation(parameters.bucket, parameters.path);
    const { data, error } = await createPublicSupabaseClient()
      .storage.from(location.bucket)
      .createSignedUrl(location.path, 60);
    if (error || !data?.signedUrl)
      throw new HttpError(404, "NOT_FOUND", "The file was not found.");
    const response = NextResponse.redirect(data.signedUrl);
    response.headers.set("Cache-Control", "public,max-age=30");
    response.headers.set("Referrer-Policy", "no-referrer");
    return response;
  } catch (error) {
    return errorResponse(error, "public media");
  }
}
