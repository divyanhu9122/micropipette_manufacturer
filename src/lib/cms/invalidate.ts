import "server-only";
import { revalidateTag, revalidatePath } from "next/cache";
export function invalidatePublicContent() {
  try {
    revalidateTag("public-cms", { expire: 0 });
    revalidatePath("/", "layout");
    revalidatePath("/sitemap.xml");
  } catch {
    console.warn(
      "[CMS] Cache refresh deferred; public content will refresh on its normal interval.",
    );
  }
}
