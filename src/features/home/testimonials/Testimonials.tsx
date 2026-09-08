import PartnerReveal from "../partners/PartnerReveal";
import reveal from "../partners/TrustedCompanies.module.css";
import shared from "../product-categories/ProductCategories.module.css";
import TestimonialCarousel from "./TestimonialCarousel";
import styles from "./Testimonials.module.css";

// Sample copy from the confirmed prototype, not genuine customer endorsements.
const samples = [
  {
    quote:
      "Sample testimonial: dependable product quality, responsive communication and smooth support throughout the buying process.",
    detail: "Distributor Partner • Country",
  },
  {
    quote:
      "Sample testimonial: the team provided clear technical guidance and supported our laboratory requirements professionally.",
    detail: "Laboratory / Institution • Country",
  },
  {
    quote:
      "Sample testimonial: a positive OEM experience with clear communication, branding support and dependable coordination.",
    detail: "OEM / Private Label Partner • Country",
  },
  {
    quote:
      "Sample testimonial: product selection was straightforward and the sales response helped us complete procurement efficiently.",
    detail: "Procurement Team • Country",
  },
] as const;

export default function Testimonials() {
  return (
    <div className={shared.wrap}>
      <PartnerReveal
        id="testimonials"
        titleId="testimonials-title"
        className={styles.section}
      >
        <h2
          id="testimonials-title"
          className={`${shared.title} ${reveal.title}`}
        >
          WHAT OUR CUSTOMERS ARE SAYING
        </h2>
        <p id="testimonials-warning" className={styles.subtitle}>
          Sample testimonial layout for preview only. Replace these placeholders
          with genuine customer feedback before publishing.
        </p>
        <TestimonialCarousel count={samples.length}>
          {samples.map((sample) => (
            <article
              key={sample.detail}
              className={styles.card}
              aria-describedby="testimonials-warning"
              data-placeholder="true"
            >
              <div className={styles.quote} aria-hidden="true">
                “
              </div>
              <blockquote>{sample.quote}</blockquote>
              <div className={styles.meta}>
                <strong>Customer Name</strong>
                <span>{sample.detail}</span>
              </div>
            </article>
          ))}
        </TestimonialCarousel>
      </PartnerReveal>
    </div>
  );
}
