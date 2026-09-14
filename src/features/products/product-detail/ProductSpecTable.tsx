import styles from "./ProductDetail.module.css";
import type { ProductDetailSpec } from "./product-detail.data";

interface ProductSpecTableProps {
  specifications: ProductDetailSpec[];
}

export default function ProductSpecTable({
  specifications,
}: ProductSpecTableProps) {
  return (
    <section className={styles.pdPanel} id="specifications">
      <h2 className={styles.sectionTitle}>TECHNICAL SPECIFICATIONS</h2>
      <div className={styles.pdSpecTableWrap}>
        <table className={styles.pdSpecTable}>
          <tbody>
            {specifications.map((spec, idx) => (
              <tr key={`${spec.label}-${idx}`}>
                <th scope="row">{spec.label}</th>
                <td>{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
