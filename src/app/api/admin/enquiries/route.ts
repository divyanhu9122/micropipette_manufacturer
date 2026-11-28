import type { NextRequest } from "next/server";
import { staffEndpoint } from "@/lib/auth/request";
import { databaseError } from "@/lib/http/responses";
import { HttpError } from "@/lib/http/errors";

export async function GET(request: NextRequest) {
  return staffEndpoint(request, "enquiries:read", async ({ client }) => {
    const paginated = request.nextUrl.searchParams.has("page");
    const page = Number(request.nextUrl.searchParams.get("page") || 1);
    const pageSize = Number(
      request.nextUrl.searchParams.get("pageSize") || (paginated ? 25 : 200),
    );
    const search = request.nextUrl.searchParams.get("q")?.trim() || "";
    const status = request.nextUrl.searchParams.get("status");
    if (
      !Number.isInteger(page) ||
      page < 1 ||
      page > 100_000 ||
      !Number.isInteger(pageSize) ||
      pageSize < 1 ||
      pageSize > 200 ||
      search.length > 200 ||
      (status && !["new", "read", "replied", "closed"].includes(status))
    )
      throw new HttpError(
        400,
        "INVALID_INPUT",
        "Choose valid enquiry filters.",
      );
    let query = client
      .from("enquiries")
      .select(
        "id, enquiry_id, name, email, phone, company, country, message, product_slug, product_title, enquiry_type, status, quantity, oem_specifications, internal_notes, attachment_path, attachment_name, attachment_size, created_at",
        { count: "exact" },
      )
      .order("created_at", { ascending: false })
      .order("id");
    if (search)
      query = query.ilike("name", `%${search.replace(/[\\%_]/g, "\\$&")}%`);
    if (status) query = query.eq("status", status);
    const { data, count, error } = await query.range(
      (page - 1) * pageSize,
      page * pageSize - 1,
    );
    if (error) databaseError(error, "list enquiries");
    return paginated
      ? {
          items: data ?? [],
          page,
          pageSize,
          total: count ?? 0,
          hasMore:
            count !== null
              ? page * pageSize < count
              : data?.length === pageSize,
        }
      : data;
  });
}
