import type { NextRequest } from "next/server";
import { staffEndpoint } from "@/lib/auth/request";
import { isStaffRole } from "@/lib/auth/permissions";
import { parseRecordId } from "@/lib/validation/admin";
import { readJsonObject } from "@/lib/http/request";
import { HttpError } from "@/lib/http/errors";
import { databaseError } from "@/lib/http/responses";
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return staffEndpoint(request, "staff:manage", async ({ client }) => {
    const id = parseRecordId((await params).id);
    const body = await readJsonObject(request, 2048);
    if (
      Object.keys(body).some((key) => !["role", "is_active"].includes(key)) ||
      !isStaffRole(body.role) ||
      typeof body.is_active !== "boolean"
    )
      throw new HttpError(
        400,
        "INVALID_INPUT",
        "Choose a valid role and active state.",
      );
    const { data: current, error } = await client
      .from("staff_members")
      .select("email")
      .eq("user_id", id)
      .maybeSingle();
    if (error) databaseError(error, "read staff member");
    if (!current)
      throw new HttpError(404, "NOT_FOUND", "The staff member was not found.");
    const { data, error: saveError } = await client.rpc("set_staff_member", {
      p_user_id: id,
      p_email: current.email,
      p_role: body.role,
      p_is_active: body.is_active,
    });
    if (saveError) databaseError(saveError, "update staff membership");
    return data;
  });
}
