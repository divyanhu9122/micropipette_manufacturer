import type { NextRequest } from "next/server";
import { requireStaffRequest } from "@/lib/auth/request";
import { errorResponse, privateJson } from "@/lib/http/responses";

export async function GET(request: NextRequest) {
  try {
    // This endpoint exposes only the caller's membership so they can complete MFA.
    const { staff, requiresMfa } = await requireStaffRequest(
      request,
      "staff:access",
      { requireMfa: false },
    );
    return privateJson({ staff, requiresMfa });
  } catch (error) {
    return errorResponse(error, "staff session");
  }
}
