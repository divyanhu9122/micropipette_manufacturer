import styles from "./MicropipetteCategory.module.css";
import MicropipetteCategoryCard from "./MicropipetteCategoryCard";
import { micropipetteCategoryItems } from "./micropipette-category.data";

export default function MicropipetteCategoryGrid() {
  return (
    <div className={styles.categoryGrid}>
      {micropipetteCategoryItems.map((item) => (
        <MicropipetteCategoryCard key={item.id} item={item} />
      ))}
    </div>
  );
}
