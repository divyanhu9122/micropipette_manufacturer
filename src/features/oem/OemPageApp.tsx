"use client";

import OemHero from "./OemHero";
import OemCapabilities from "./OemCapabilities";
import OemProcess from "./OemProcess";
import OemQuality from "./OemQuality";
import OemInquiryForm from "./OemInquiryForm";
import OemFaq from "./OemFaq";
import styles from "./Oem.module.css";

export default function OemPageApp() {
  const scrollToInquiry = () => {
    const el = document.getElementById("inquiry");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.page}>
      <OemHero onOpenInquiry={scrollToInquiry} />
      <OemCapabilities />
      <OemProcess />
      <OemQuality />
      <OemInquiryForm />
      <OemFaq />
    </div>
  );
}
