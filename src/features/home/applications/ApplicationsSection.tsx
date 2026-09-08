import Carousel from "@/components/ui/carousel/Carousel";
// Reuse the approved panel, title, card, media, and carousel styles unchanged.
import shared from "../product-categories/ProductCategories.module.css";
import styles from "./ApplicationsSection.module.css";
import { applications } from "./applications.data";

export default function ApplicationsSection() {
  return (
    <section
      id="applications"
      className={shared.section}
      aria-labelledby="applications-title"
    >
      <div className={shared.wrap}>
        <div className={shared.panel}>
          <h2 id="applications-title" className={shared.title}>
            APPLICATIONS
          </h2>
          <Carousel
            styles={shared}
            label="Applications, scrollable"
            previousLabel="Previous applications"
            nextLabel="Next applications"
          >
            {applications.map((application) => (
              <article key={application.id} className={shared.card}>
                <div className={shared.media} aria-hidden="true">
                  <div className={styles.icon}>{application.icon}</div>
                </div>
                <h3>{application.title}</h3>
                <p>{application.description}</p>
              </article>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
