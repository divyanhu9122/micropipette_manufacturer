import { HttpError } from "@/lib/http/errors";
export function mediaLocation(bucket: string, path: string[]) {
  if (
    !["images", "documents"].includes(bucket) ||
    !path.length ||
    path.join("/").length > 512 ||
    path.some(
      (part) =>
        !part ||
        part === "." ||
        part === ".." ||
        !/^[a-zA-Z0-9._-]+$/.test(part),
    )
  )
    throw new HttpError(404, "NOT_FOUND", "The file was not found.");
  return { bucket, path: path.join("/") };
}
