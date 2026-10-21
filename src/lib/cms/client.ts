// ============================================================
// CENTRAL STRAPI CMS API CLIENT (STAGE 10 FOUNDATION)
// Server-only client for querying Strapi REST API with fallback
// ============================================================

import { StrapiResponse, StrapiCollectionResponse } from "@/types/cms";

const CMS_URL = process.env.CMS_API_URL?.replace(/\/$/, "");
const CMS_TOKEN = process.env.CMS_API_TOKEN;

export function isCmsConfigured(): boolean {
  return Boolean(CMS_URL && CMS_TOKEN);
}

export interface CmsRequestOptions {
  headers?: Record<string, string>;
  revalidate?: number | false;
  tags?: string[];
  cache?: RequestCache;
}

/**
 * Core typed fetcher for Strapi REST API endpoints.
 * Returns null if CMS is not configured or offline, allowing seamless fallback.
 */
export async function cmsFetch<T>(
  endpoint: string,
  options: CmsRequestOptions = {}
): Promise<T | null> {
  if (!isCmsConfigured()) {
    return null;
  }

  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${CMS_URL}/api${cleanEndpoint}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CMS_TOKEN}`,
        ...options.headers,
      },
      next: {
        revalidate: options.revalidate ?? 3600, // Default 1 hour ISR
        tags: options.tags,
      },
      cache: options.cache,
    });

    if (!response.ok) {
      console.warn(
        `[CMS Client] Request failed: ${response.status} ${response.statusText} for ${url}`
      );
      return null;
    }

    const json = await response.json();
    return json as T;
  } catch (error) {
    console.warn(`[CMS Client] Connection error querying ${url}:`, error);
    return null;
  }
}

/**
 * Core typed mutation helper for POST endpoints (e.g. Enquiries)
 */
export async function cmsMutate<T, B = unknown>(
  endpoint: string,
  body: B,
  options: CmsRequestOptions = {}
): Promise<T | null> {
  if (!isCmsConfigured()) {
    return null;
  }

  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${CMS_URL}/api${cleanEndpoint}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CMS_TOKEN}`,
        ...options.headers,
      },
      body: JSON.stringify({ data: body }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        `[CMS Client] Mutation failed: ${response.status} ${response.statusText}`
      );
      return null;
    }

    const json = await response.json();
    return json as T;
  } catch (error) {
    console.error(`[CMS Client] Mutation error:`, error);
    return null;
  }
}
