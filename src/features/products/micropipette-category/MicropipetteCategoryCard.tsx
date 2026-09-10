import Link from "next/link";
import shared from "@/features/home/product-categories/ProductCategories.module.css";
import oem from "@/features/home/oem/OEMSection.module.css";
import featuredStyles from "@/features/home/featured-products/FeaturedProducts.module.css";
import styles from "./MicropipetteCategory.module.css";
import type { CategoryVisual, MicropipetteCategoryItem } from "./micropipette-category.data";

function CategoryIllustration({ visual }: { visual: CategoryVisual }) {
  if (visual.kind === "multi-pipette") {
    return (
      <div className={`${shared.pipettes} ${styles.multiPipetteScale}`}>
        {Array.from({ length: visual.count }, (_, index) => (
          <div key={index} className={shared.pipette}>
            <div className={shared.pipetteTop} />
            <div className={shared.pipetteBody} />
            <div className={shared.pipetteShaft} />
            <div className={shared.pipetteNozzle} />
          </div>
        ))}
      </div>
    );
  }
  if (visual.kind === "single-pipette") {
    return (
      <div
        className={styles.singlePipette}
        style={{ transform: `rotate(${visual.rotateDeg}deg) scale(${visual.scale})` }}
      >
        <div className={oem.top} />
        <div className={oem.body} />
        <div className={oem.shaft} />
        <div className={oem.nozzle} />
      </div>
    );
  }
  return <div className={`${shared.controller} ${styles.controllerScale}`} />;
}

export default function MicropipetteCategoryCard({
  item,
}: {
  item: MicropipetteCategoryItem;
}) {
  return (
    <article className={`card ${styles.categoryCard}`}>
      <div className={styles.categoryMedia} aria-hidden="true">
        <CategoryIllustration visual={item.visual} />
      </div>
      <div className={styles.categoryBody}>
        <span className={featuredStyles.typeTag}>{item.tag}</span>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <Link className="btn secondary" href={item.href}>
          Explore Category →
        </Link>
      </div>
    </article>
  );
}
