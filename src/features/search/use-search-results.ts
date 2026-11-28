"use client";
import { useEffect, useState } from "react";
import type { SearchItem } from "./search.data";

export function useSearchResults(query: string, debounce = 0) {
  const term = query.trim();
  const [result, setResult] = useState<{
    query: string;
    items: SearchItem[];
    error: string;
  } | null>(null);
  useEffect(() => {
    if (!term) return;
    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(term)}`, {
        signal: controller.signal,
      })
        .then(async (response) => {
          if (!response.ok) throw new Error();
          const data = await response.json();
          if (!Array.isArray(data.items)) throw new Error();
          if (!controller.signal.aborted)
            setResult({ query: term, items: data.items, error: "" });
        })
        .catch(() => {
          if (!controller.signal.aborted)
            setResult({
              query: term,
              items: [],
              error:
                "Search is temporarily unavailable. Please try again shortly.",
            });
        });
    }, debounce);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [term, debounce]);
  const current = result?.query === term ? result : null;
  return {
    items: term ? current?.items || [] : [],
    loading: Boolean(term && !current),
    error: term ? current?.error || "" : "",
  };
}
