import PublicFrame from "@/components/layout/PublicFrame";
import { getPublicContent } from "@/lib/cms/public";
import ResourcesApp from "@/features/resources/ResourcesApp";
import { resourceItem } from "@/lib/cms/presentation";
export const revalidate = 60;
export const metadata = {
  title: "Resources & downloads",
  alternates: { canonical: "/resources" },
};
export default async function ResourcesPage() {
  const { resources } = await getPublicContent();
  return (
    <PublicFrame>
      <ResourcesApp resources={resources.map(resourceItem)} />
    </PublicFrame>
  );
}
