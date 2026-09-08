import type { ReactNode } from "react";
import Carousel from "@/components/ui/carousel/Carousel";
import styles from "./ProductCategories.module.css";

export default function ProductCategoryCarousel({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Carousel
      styles={styles}
      label="Product categories, scrollable"
      previousLabel="Previous products"
      nextLabel="Next products"
    >
      {children}
    </Carousel>
  );
}
