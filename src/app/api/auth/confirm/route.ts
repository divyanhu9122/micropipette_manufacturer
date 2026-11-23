import type { NextRequest } from "next/server";
import { createServerSupabaseClient } from "@/lib/cms/server";
import { assertSameOrigin, readJsonObject } from "@/lib/http/request";
import { HttpError } from "@/lib/http/errors";
import { privateJson, errorResponse } from "@/lib/http/responses";
export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request);
    const body = await readJsonObject(request, 2048);
    if (
      typeof body.tokenHash !== "string" ||
      !/^[A-Za-z0-9_-]{20,512}$/.test(body.tokenHash) ||
      (body.type !== "invite" && body.type !== "recovery")
    )
      throw new HttpError(
        400,
        "INVALID_INPUT",
        "This sign-in link is invalid.",
      );
    const client = await createServerSupabaseClient();
    const { error } = await client.auth.verifyOtp({
      token_hash: body.tokenHash,
      type: body.type,
    });
    if (error)
      throw new HttpError(
        400,
        "INVALID_LINK",
        "This sign-in link has expired or is invalid.",
      );
    return privateJson({ success: true });
  } catch (error) {
    return errorResponse(error, "confirm staff access");
  }
}
