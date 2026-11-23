import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { createHash, timingSafeEqual } from "node:crypto";

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const secret =
      request.headers.get("authorization")?.match(/^Bearer (.+)$/i)?.[1] ||
      searchParams.get("secret");
    const tag = searchParams.get("tag");
    const path = searchParams.get("path");

    const expectedSecret =
      process.env.REVALIDATION_TOKEN ||
      process.env.REVALIDATE_SECRET ||
      process.env.CMS_API_TOKEN;

    if (
      !expectedSecret ||
      !secret ||
      /^(generate-a-|your-|placeholder)/i.test(expectedSecret) ||
      !timingSafeEqual(
        createHash("sha256").update(secret).digest(),
        createHash("sha256").update(expectedSecret).digest(),
      )
    ) {
      return NextResponse.json(
        { success: false, message: "Unauthorized revalidation token." },
        { status: 401 },
      );
    }

    if (tag) {
      if (tag !== "public-cms")
        return NextResponse.json(
          { success: false, error: "Unsupported cache tag." },
          { status: 400 },
        );
      revalidateTag(tag, { expire: 0 });
      return NextResponse.json({
        revalidated: true,
        tag,
        timestamp: new Date().toISOString(),
      });
    }

    if (path) {
      if (!/^\/(?!\/)/.test(path) || path.length > 1024 || path.includes("\\"))
        return NextResponse.json(
          { success: false, error: "Invalid page path." },
          { status: 400 },
        );
      revalidatePath(path);
      return NextResponse.json({
        revalidated: true,
        path,
        timestamp: new Date().toISOString(),
      });
    }

    // Default: revalidate homepage and products catalog
    revalidateTag("public-cms", { expire: 0 });
    revalidatePath("/", "layout");
    return NextResponse.json({
      revalidated: true,
      scope: "global",
      timestamp: new Date().toISOString(),
    });
  } catch {
    console.error("[API /api/revalidate] Cache refresh failed");
    return NextResponse.json(
      { success: false, error: "Failed to revalidate cache." },
      { status: 500 },
    );
  }
}
