export type CmsRecord = Record<string, unknown> & { id: string };
export type ContentPage = {
  items: CmsRecord[];
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
};

export class CmsRequestError extends Error {
  constructor(
    message: string,
    public fieldErrors: Record<string, string> = {},
  ) {
    super(message);
  }
}

export async function cmsRequest<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    cache: "no-store",
    credentials: "same-origin",
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });
  const data = await response.json().catch(() => null);
  if (!response.ok || data === null)
    throw new CmsRequestError(
      typeof data?.error === "string"
        ? data.error
        : "The request failed. Please try again.",
      data?.fieldErrors || {},
    );
  return data as T;
}

export async function loadLookup(entity: string, signal: AbortSignal) {
  const records: CmsRecord[] = [];
  for (let page = 1; ; page++) {
    const result = await cmsRequest<ContentPage>(
      `/api/admin/content/${entity}?page=${page}&pageSize=100`,
      { signal },
    );
    records.push(...result.items);
    if (!result.hasMore) break;
  }
  return records;
}
