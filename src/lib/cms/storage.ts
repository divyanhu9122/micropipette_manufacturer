import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

export type StorageBucket = "documents" | "images";

export async function uploadFile(
  file: File,
  bucket: StorageBucket,
  client: SupabaseClient,
): Promise<string | null> {
  const safeName = file.name.replace(/\s+/g, "-").toLowerCase();
  const fileName = `${Date.now()}-${safeName}`;

  const { data, error } = await client.storage
    .from(bucket)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("[Storage] Upload error:", error.message);
    return null;
  }

  const { data: urlData } = client.storage.from(bucket).getPublicUrl(data.path);

  return urlData.publicUrl;
}

export async function deleteFile(
  filePath: string,
  bucket: StorageBucket,
  client: SupabaseClient,
): Promise<boolean> {
  const { error } = await client.storage.from(bucket).remove([filePath]);

  if (error) {
    console.error("[Storage] Delete error:", error.message);
    return false;
  }
  return true;
}
