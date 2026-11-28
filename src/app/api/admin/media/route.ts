import { NextResponse, type NextRequest } from "next/server";
import { requireStaffRequest } from "@/lib/auth/request";
import { mediaLocation } from "@/lib/cms/media";
import { HttpError } from "@/lib/http/errors";
import { errorResponse } from "@/lib/http/responses";
import { staffEndpoint } from "@/lib/auth/request";
import { readJsonObject } from "@/lib/http/request";
import { createPrivilegedSupabaseClient } from "@/lib/cms/admin";
import { pendingMediaLocation } from "@/lib/cms/pending-media";
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

// Restricted housekeeping for discarded uploads, never a general media-delete API.
export async function DELETE(request: NextRequest) {
  return staffEndpoint(request, "content:write", async ({ staff }) => {
    const body = await readJsonObject(request, 16_384);
    if (
      !Array.isArray(body.files) ||
      !body.files.length ||
      body.files.length > 25
    )
      throw new HttpError(
        400,
        "INVALID_INPUT",
        "Choose up to 25 pending uploads.",
      );
    const locations = body.files.map((value) =>
      pendingMediaLocation(value, staff.id),
    );
    const client = createPrivilegedSupabaseClient();
    for (const file of locations) {
      const references = await Promise.all([
        client
          .from("products")
          .select("id")
          .contains("images", [file.url])
          .limit(1),
        ...[
          ["products", "datasheet_url"],
          ["brands", "logo_url"],
          ["blog_articles", "cover_image"],
          ["pages", "image_url"],
          ["resources", "file_url"],
        ].map(([table, field]) =>
          client.from(table).select("id").eq(field, file.url).limit(1),
        ),
        client
          .from("settings")
          .select("value")
          .in("key", ["site", "contact", "seo", "navigation"]),
      ]);
      if (references.some((result) => result.error))
        throw new HttpError(
          503,
          "CLEANUP_UNAVAILABLE",
          "File references could not be checked. Your editor is still open; retry shortly.",
        );
      const settings = references.at(-1)?.data as
        { value: Record<string, unknown> }[] | null;
      if (
        references.slice(0, -1).some((result) => result.data?.length) ||
        settings?.some((row) => Object.values(row.value).includes(file.url))
      )
        continue;
      const { error } = await client.storage
        .from(file.bucket)
        .remove([file.path]);
      if (error)
        throw new HttpError(
          503,
          "CLEANUP_UNAVAILABLE",
          "The pending file could not be removed. Retry shortly.",
        );
    }
    return { success: true };
  });
}
