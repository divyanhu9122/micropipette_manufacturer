import { NextRequest, NextResponse } from "next/server";
import { validateEnquiryPayload } from "@/lib/validation/enquiry";
import { submitCmsEnquiry } from "@/lib/cms/fetchers";

// In-memory rate limiting map (IP -> timestamp array) for basic DOS / spam mitigation
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // max 5 submissions per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // 1. IP Rate Limiting Check
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown-ip";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many submission attempts. Please wait a minute and try again.",
        },
        { status: 429 }
      );
    }

    // 2. Parse Body
    const body = await request.json();

    // 3. Spam Honeypot Check (if bot filled invisible field)
    if (body.website_hp || body.hp_check) {
      console.warn(`[Spam Guard] Honeypot triggered from IP ${ip}`);
      // Return 200 to confuse bots without actually processing
      return NextResponse.json(
        { success: true, message: "Enquiry received." },
        { status: 200 }
      );
    }

    // 4. Server-side Validation
    const validation = validateEnquiryPayload(body);
    if (!validation.isValid || !validation.sanitizedData) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed. Please correct the highlighted fields.",
          fieldErrors: validation.errors,
        },
        { status: 400 }
      );
    }

    // 5. Submit to Strapi CMS / Data Pipeline
    const submissionResult = await submitCmsEnquiry(validation.sanitizedData);

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for your enquiry. Our technical sales team will review your specifications and respond shortly.",
        enquiryId: submissionResult.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[API /api/enquiries] Unexpected error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected server error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}
