import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");
    const tag = searchParams.get("tag");
    const path = searchParams.get("path");

    const expectedSecret =
      process.env.REVALIDATE_SECRET || process.env.CMS_API_TOKEN;

    if (!expectedSecret || secret !== expectedSecret) {
      return NextResponse.json(
        { success: false, message: "Unauthorized revalidation token." },
        { status: 401 }
      );
    }

    if (tag) {
      revalidateTag(tag, "default");
      return NextResponse.json({
        revalidated: true,
        tag,
        timestamp: new Date().toISOString(),
      });
    }

    if (path) {
      revalidatePath(path);
      return NextResponse.json({
        revalidated: true,
        path,
        timestamp: new Date().toISOString(),
      });
    }

    // Default: revalidate homepage and products catalog
    revalidatePath("/");
    revalidatePath("/products");
    return NextResponse.json({
      revalidated: true,
      scope: "global",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[API /api/revalidate] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to revalidate cache." },
      { status: 500 }
    );
  }
}
