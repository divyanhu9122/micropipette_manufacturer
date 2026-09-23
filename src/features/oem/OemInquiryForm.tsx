"use client";

import { useState } from "react";
import styles from "./Oem.module.css";

const CUSTOMIZATION_OPTIONS = [
  "Company Name / Logo Pad Printing",
  "High-Precision Laser Marking",
  "Custom Color-Coded Volume Push Buttons",
  "Private-Label Packaging & Manuals",
  "Branded Calibration Certificates",
  "Custom Volume Range / Tip Cone Geometry",
];

export default function OemInquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    country: "",
    annualVolume: "200-500",
    productFamily: "Variable Volume Micropipettes",
    customizations: [] as string[],
    message: "",
  });

  const handleCustomizationToggle = (opt: string) => {
    setFormData((prev) => {
      const exists = prev.customizations.includes(opt);
      return {
        ...prev,
        customizations: exists
          ? prev.customizations.filter((c) => c !== opt)
          : [...prev.customizations, opt],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="inquiry" className={styles.inquirySection} aria-labelledby="oem-inquiry-title">
      <div className={styles.wrap}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionEyebrow}>Direct Factory Access</div>
          <h2 id="oem-inquiry-title" className={styles.sectionTitle}>
            Request an OEM / Private Label Proposal
          </h2>
          <p className={styles.sectionDesc}>
            Submit your private label specifications below. Our OEM technical
            director will prepare a customized quotation, MOQ breakdown, and
            artwork guidelines within 1 business day.
          </p>
        </div>

        <div className={styles.inquiryCard}>
          {submitted ? (
            <div className={styles.formSuccessAlert}>
              <h3 className={styles.formSuccessTitle}>
                OEM Inquiry Received Successfully
              </h3>
              <p>
                Thank you for contacting our OEM division,{" "}
                <strong>{formData.contactName || "Partner"}</strong>. Our
                contract manufacturing team has received your inquiry for{" "}
                <strong>{formData.companyName || "your company"}</strong>. An OEM
                proposal and technical feasibility review will be delivered to{" "}
                <strong>{formData.email}</strong> within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="oem-company">
                    Company / Organization Name *
                  </label>
                  <input
                    id="oem-company"
                    type="text"
                    required
                    className={styles.formInput}
                    placeholder="e.g., BioLab Technologies Inc."
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="oem-name">
                    Contact Person Name *
                  </label>
                  <input
                    id="oem-name"
                    type="text"
                    required
                    className={styles.formInput}
                    placeholder="e.g., Dr. Jane Smith"
                    value={formData.contactName}
                    onChange={(e) =>
                      setFormData({ ...formData, contactName: e.target.value })
                    }
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="oem-email">
                    Corporate Email Address *
                  </label>
                  <input
                    id="oem-email"
                    type="email"
                    required
                    className={styles.formInput}
                    placeholder="e.g., j.smith@biolab.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="oem-phone">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    id="oem-phone"
                    type="tel"
                    className={styles.formInput}
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="oem-country">
                    Country / Destination Market *
                  </label>
                  <input
                    id="oem-country"
                    type="text"
                    required
                    className={styles.formInput}
                    placeholder="e.g., United States, Germany, India"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="oem-volume">
                    Estimated Annual Volume (Units) *
                  </label>
                  <select
                    id="oem-volume"
                    className={styles.formSelect}
                    value={formData.annualVolume}
                    onChange={(e) =>
                      setFormData({ ...formData, annualVolume: e.target.value })
                    }
                  >
                    <option value="50-200">50 – 200 units (Standard OEM)</option>
                    <option value="200-500">200 – 500 units (Custom Packaging)</option>
                    <option value="500-2000">500 – 2,000 units (Full Custom Tooling)</option>
                    <option value="2000+">2,000+ units (High Volume Contract)</option>
                  </select>
                </div>

                <div className={styles.formGroupFull}>
                  <label className={styles.formLabel} htmlFor="oem-family">
                    Primary Product Line of Interest *
                  </label>
                  <select
                    id="oem-family"
                    className={styles.formSelect}
                    value={formData.productFamily}
                    onChange={(e) =>
                      setFormData({ ...formData, productFamily: e.target.value })
                    }
                  >
                    <option value="Variable Volume Micropipettes">
                      Variable Volume Micropipettes
                    </option>
                    <option value="Fixed Volume Micropipettes">
                      Fixed Volume Micropipettes
                    </option>
                    <option value="Multichannel Micropipettes (8 & 12 Channel)">
                      Multichannel Micropipettes (8 &amp; 12 Channel)
                    </option>
                    <option value="Electronic Micropipettes & Controllers">
                      Electronic Micropipettes &amp; Controllers
                    </option>
                    <option value="Pipette Tips & Laboratory Consumables">
                      Pipette Tips &amp; Laboratory Consumables
                    </option>
                    <option value="Bottle Top Dispensers">
                      Bottle Top Dispensers
                    </option>
                  </select>
                </div>

                <div className={styles.formGroupFull}>
                  <span className={styles.formLabel}>
                    Customization Services Required
                  </span>
                  <div className={styles.checkboxGroup}>
                    {CUSTOMIZATION_OPTIONS.map((opt) => (
                      <label key={opt} className={styles.checkLabel}>
                        <input
                          type="checkbox"
                          className={styles.checkInput}
                          checked={formData.customizations.includes(opt)}
                          onChange={() => handleCustomizationToggle(opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className={styles.formGroupFull}>
                  <label className={styles.formLabel} htmlFor="oem-msg">
                    Project Details &amp; Specific Requirements
                  </label>
                  <textarea
                    id="oem-msg"
                    className={styles.formTextarea}
                    placeholder="Specify target volume ranges, preferred colorways, packaging requirements, or timeline..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>
              </div>

              <button type="submit" className={styles.formSubmitBtn}>
                Submit OEM Inquiry →
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
