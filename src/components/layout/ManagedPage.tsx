import Image from "next/image";
import PublicFrame from "./PublicFrame";
import InnerPageHero from "./InnerPageHero";
import type { CmsPage } from "@/lib/cms/public";
export default function ManagedPage({ page }: { page: CmsPage }) {
  return (
    <PublicFrame>
      <InnerPageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: page.title }]}
        title={page.title}
        description={page.description || ""}
      />
      <section
        className="wrap"
        style={{ padding: "48px 20px", maxWidth: 1040 }}
      >
        {page.image_url && (
          <Image
            unoptimized
            src={page.image_url}
            alt={page.title}
            width={1000}
            height={550}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              marginBottom: 24,
            }}
          />
        )}
        {page.body
          .split(/\n\s*\n/)
          .filter(Boolean)
          .map((part, index) =>
            part.startsWith("## ") ? (
              <h2 key={index}>{part.slice(3)}</h2>
            ) : (
              <p
                key={index}
                style={{ whiteSpace: "pre-wrap", lineHeight: 1.8 }}
              >
                {part}
              </p>
            ),
          )}
      </section>
    </PublicFrame>
  );
}
