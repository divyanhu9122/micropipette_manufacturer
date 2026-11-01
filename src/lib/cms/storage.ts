import { supabaseAdmin } from './client'

export type StorageBucket = 'documents' | 'images'

export async function uploadFile(
  file: File,
  bucket: StorageBucket
): Promise<string | null> {
  const safeName = file.name.replace(/\s+/g, '-').toLowerCase()
  const fileName = `${Date.now()}-${safeName}`

  const { data, error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    console.error('[Storage] Upload error:', error.message)
    return null
  }

  const { data: urlData } = supabaseAdmin.storage
    .from(bucket)
    .getPublicUrl(data.path)

  return urlData.publicUrl
}

export async function deleteFile(
  filePath: string,
  bucket: StorageBucket
): Promise<boolean> {
  const { error } = await supabaseAdmin.storage
    .from(bucket)
    .remove([filePath])

  if (error) {
    console.error('[Storage] Delete error:', error.message)
    return false
  }
  return true
}
