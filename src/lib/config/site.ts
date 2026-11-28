export function getSiteOrigin() {
  const value =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://micropipette-manufacturer.vercel.app";
  try {
    const url = new URL(value);
    const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
    if (
      url.username ||
      url.password ||
      url.search ||
      url.hash ||
      url.pathname !== "/" ||
      (url.protocol !== "https:" && !(local && url.protocol === "http:"))
    )
      throw new Error();
    return url.origin;
  } catch {
    throw new Error("The website origin is not configured correctly.");
  }
}
