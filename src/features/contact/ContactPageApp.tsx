"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import Link from "next/link";
import styles from "./Contact.module.css";
import CatalogueModal from "@/components/ui/CatalogueModal";

interface FormState {
  contactPerson: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  enquiryType: string;
  preferredBrand: string;
  productCategory: string;
  message: string;
}

interface FormErrors {
  contactPerson?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  country?: string;
  enquiryType?: string;
  message?: string;
}

export default function ContactPageApp() {
  const [formData, setFormData] = useState<FormState>({
    contactPerson: "",
    companyName: "",
    email: "",
    phone: "",
    country: "",
    enquiryType: "",
    preferredBrand: "",
    productCategory: "",
    message: "",
  });

  const [fileName, setFileName] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCatalogueOpen, setIsCatalogueOpen] = useState(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.contactPerson.trim()) {
      errs.contactPerson = "Please enter your full name.";
    }
    if (!formData.companyName.trim()) {
      errs.companyName = "Please enter your company name.";
    }
    if (!formData.email.trim()) {
      errs.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Please enter your phone or WhatsApp number.";
    }
    if (!formData.country.trim()) {
      errs.country = "Please enter your country.";
    }
    if (!formData.enquiryType) {
      errs.enquiryType = "Please select an enquiry type.";
    }
    if (!formData.message.trim()) {
      errs.message = "Please describe your requirement or message.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName("");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Client-side mock submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      contactPerson: "",
      companyName: "",
      email: "",
      phone: "",
      country: "",
      enquiryType: "",
      preferredBrand: "",
      productCategory: "",
      message: "",
    });
    setFileName("");
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className={styles.contactPage}>
      {/* Hero */}
      <section className={styles.contactHero}>
        <div className={`wrap ${styles.contactHeroInner}`}>
          <nav className={styles.contactBreadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className={styles.contactBreadcrumbSep}>›</span>
            <span>Contact Us</span>
          </nav>
          <div className={styles.contactHeroCopy}>
            <h1>Contact Us</h1>
            <p>
              Get in touch for product information, quotations,
              OEM/private-label requirements, bulk enquiries, distributor
              opportunities or technical assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className={styles.contactSection}>
        <div className={`wrap ${styles.contactLayout}`}>
          {/* Aside Information */}
          <aside className={styles.contactInfoPanel}>
            <span className={styles.contactTag}>GET IN TOUCH</span>
            <h2>How Can We Help?</h2>
            <p>
              Choose the most suitable enquiry route and our team can respond
              according to your requirement.
            </p>

            <div className={styles.contactInfoList}>
              <article className={styles.contactInfoItem}>
                <span>01</span>
                <div>
                  <strong>Product Enquiry</strong>
                  <p>
                    Questions about micropipettes, bottle-top dispensers,
                    balances or other scientific products.
                  </p>
                </div>
              </article>
              <article className={styles.contactInfoItem}>
                <span>02</span>
                <div>
                  <strong>OEM & Private Label</strong>
                  <p>
                    Custom branding, private-label, packaging and bulk
                    manufacturing discussions.
                  </p>
                </div>
              </article>
              <article className={styles.contactInfoItem}>
                <span>03</span>
                <div>
                  <strong>Distributor / Business Enquiry</strong>
                  <p>
                    For dealership, distribution, bulk supply or long-term
                    B2B requirements.
                  </p>
                </div>
              </article>
              <article className={styles.contactInfoItem}>
                <span>04</span>
                <div>
                  <strong>Technical Assistance</strong>
                  <p>
                    Product documentation, service, calibration or technical
                    product questions.
                  </p>
                </div>
              </article>
            </div>

            <div className={styles.contactDirect}>
              <div>
                <span>Email</span>
                <strong>[PRIMARY EMAIL FROM CMS]</strong>
              </div>
              <div>
                <span>Phone / WhatsApp</span>
                <strong>[PRIMARY PHONE FROM CMS]</strong>
              </div>
              <div>
                <span>Business Hours</span>
                <strong>[VERIFY BUSINESS HOURS]</strong>
              </div>
            </div>
          </aside>

          {/* Form Panel */}
          <section className={styles.contactFormPanel}>
            <div className={styles.contactFormHead}>
              <span className={styles.contactTag}>SEND AN ENQUIRY</span>
              <h2>Tell Us What You Need</h2>
              <p>
                Fill in the form below and select the type of enquiry that
                best matches your requirement.
              </p>
            </div>

            {isSubmitted ? (
              <div className={styles.successBox} role="status">
                <div className={styles.successIcon} aria-hidden="true">
                  ✓
                </div>
                <h3>Enquiry Submitted Successfully</h3>
                <p>
                  Thank you for contacting us. Your details have been received,
                  and our technical and commercial team will review your
                  request and respond shortly.
                </p>
                <button
                  type="button"
                  className="btn primary"
                  onClick={handleReset}
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
                <div className={styles.contactFormGrid}>
                  <label htmlFor="contactPerson">
                    <span>Contact Person *</span>
                    <input
                      id="contactPerson"
                      name="contactPerson"
                      type="text"
                      placeholder="Enter full name"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      aria-invalid={!!errors.contactPerson}
                      aria-describedby={
                        errors.contactPerson ? "contactPerson-error" : undefined
                      }
                      className={errors.contactPerson ? styles.inputError : ""}
                      required
                    />
                    {errors.contactPerson && (
                      <span
                        id="contactPerson-error"
                        className={styles.fieldError}
                        role="alert"
                      >
                        {errors.contactPerson}
                      </span>
                    )}
                  </label>

                  <label htmlFor="companyName">
                    <span>Company Name *</span>
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      placeholder="Enter company name"
                      value={formData.companyName}
                      onChange={handleChange}
                      aria-invalid={!!errors.companyName}
                      aria-describedby={
                        errors.companyName ? "companyName-error" : undefined
                      }
                      className={errors.companyName ? styles.inputError : ""}
                      required
                    />
                    {errors.companyName && (
                      <span
                        id="companyName-error"
                        className={styles.fieldError}
                        role="alert"
                      >
                        {errors.companyName}
                      </span>
                    )}
                  </label>

                  <label htmlFor="contactEmail">
                    <span>Email *</span>
                    <input
                      id="contactEmail"
                      name="email"
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "contactEmail-error" : undefined
                      }
                      className={errors.email ? styles.inputError : ""}
                      required
                    />
                    {errors.email && (
                      <span
                        id="contactEmail-error"
                        className={styles.fieldError}
                        role="alert"
                      >
                        {errors.email}
                      </span>
                    )}
                  </label>

                  <label htmlFor="contactPhone">
                    <span>Phone / WhatsApp *</span>
                    <input
                      id="contactPhone"
                      name="phone"
                      type="tel"
                      placeholder="+91 ..."
                      value={formData.phone}
                      onChange={handleChange}
                      aria-invalid={!!errors.phone}
                      aria-describedby={
                        errors.phone ? "contactPhone-error" : undefined
                      }
                      className={errors.phone ? styles.inputError : ""}
                      required
                    />
                    {errors.phone && (
                      <span
                        id="contactPhone-error"
                        className={styles.fieldError}
                        role="alert"
                      >
                        {errors.phone}
                      </span>
                    )}
                  </label>

                  <label htmlFor="contactCountry">
                    <span>Country *</span>
                    <input
                      id="contactCountry"
                      name="country"
                      type="text"
                      placeholder="Enter country"
                      value={formData.country}
                      onChange={handleChange}
                      aria-invalid={!!errors.country}
                      aria-describedby={
                        errors.country ? "contactCountry-error" : undefined
                      }
                      className={errors.country ? styles.inputError : ""}
                      required
                    />
                    {errors.country && (
                      <span
                        id="contactCountry-error"
                        className={styles.fieldError}
                        role="alert"
                      >
                        {errors.country}
                      </span>
                    )}
                  </label>

                  <label htmlFor="enquiryType">
                    <span>Enquiry Type *</span>
                    <select
                      id="enquiryType"
                      name="enquiryType"
                      value={formData.enquiryType}
                      onChange={handleChange}
                      aria-invalid={!!errors.enquiryType}
                      aria-describedby={
                        errors.enquiryType ? "enquiryType-error" : undefined
                      }
                      className={errors.enquiryType ? styles.inputError : ""}
                      required
                    >
                      <option value="">Select enquiry type</option>
                      <option value="Product Enquiry">Product Enquiry</option>
                      <option value="Request Quote">Request Quote</option>
                      <option value="OEM / Private Label">
                        OEM / Private Label
                      </option>
                      <option value="Distributor / Dealer Enquiry">
                        Distributor / Dealer Enquiry
                      </option>
                      <option value="Bulk Requirement">
                        Bulk Requirement
                      </option>
                      <option value="Technical Assistance">
                        Technical Assistance
                      </option>
                      <option value="Catalogue / Resource Request">
                        Catalogue / Resource Request
                      </option>
                      <option value="General Enquiry">General Enquiry</option>
                    </select>
                    {errors.enquiryType && (
                      <span
                        id="enquiryType-error"
                        className={styles.fieldError}
                        role="alert"
                      >
                        {errors.enquiryType}
                      </span>
                    )}
                  </label>

                  <label htmlFor="preferredBrand">
                    <span>Preferred Brand</span>
                    <select
                      id="preferredBrand"
                      name="preferredBrand"
                      value={formData.preferredBrand}
                      onChange={handleChange}
                    >
                      <option value="">Select brand</option>
                      <option value="LABXE">LABXE</option>
                      <option value="SSCIENCES">SSCIENCES</option>
                      <option value="DANWER">DANWER</option>
                      <option value="Not Sure / Any Suitable Brand">
                        Not Sure / Any Suitable Brand
                      </option>
                    </select>
                  </label>

                  <label htmlFor="productCategory">
                    <span>Product / Category</span>
                    <input
                      id="productCategory"
                      name="productCategory"
                      type="text"
                      placeholder="Product name or category"
                      value={formData.productCategory}
                      onChange={handleChange}
                    />
                  </label>

                  <label
                    htmlFor="requirementMessage"
                    className={styles.contactSpan2}
                  >
                    <span>Requirement / Message *</span>
                    <textarea
                      id="requirementMessage"
                      name="message"
                      rows={7}
                      placeholder="Tell us about your product, quantity, application, OEM or technical requirement..."
                      value={formData.message}
                      onChange={handleChange}
                      aria-invalid={!!errors.message}
                      aria-describedby={
                        errors.message ? "message-error" : undefined
                      }
                      className={errors.message ? styles.inputError : ""}
                      required
                    />
                    {errors.message && (
                      <span
                        id="message-error"
                        className={styles.fieldError}
                        role="alert"
                      >
                        {errors.message}
                      </span>
                    )}
                  </label>

                  <label
                    htmlFor="referenceFile"
                    className={`${styles.contactSpan2} ${styles.contactUploadField}`}
                  >
                    <span>Upload Reference File</span>
                    <input
                      id="referenceFile"
                      type="file"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.png,.jpg,.jpeg"
                      onChange={handleFileChange}
                    />
                    <small className={styles.contactUploadNote}>
                      {fileName
                        ? `Selected: ${fileName}`
                        : "Optional — specification, logo, product reference, purchase list or technical document."}
                    </small>
                  </label>
                </div>

                <div className={styles.contactSubmit}>
                  <p>
                    Your details will be used only to respond to your enquiry
                    and related business communication.
                  </p>
                  <button
                    className="btn primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting Enquiry..." : "Submit Enquiry →"}
                  </button>
                </div>
              </form>
            )}
          </section>
        </div>
      </section>

      {/* Bottom Cross-link Section */}
      <section className={`${styles.contactSection} ${styles.contactBottomSection}`}>
        <div className={`wrap ${styles.contactBottomGrid}`}>
          <article className={styles.contactBottomItem}>
            <span className={styles.contactTag}>PRODUCTS</span>
            <h3>Looking for a Product?</h3>
            <p>
              Browse the complete product portfolio before sending your
              requirement.
            </p>
            <Link className="btn secondary" href="/products">
              Explore Products →
            </Link>
          </article>

          <article className={styles.contactBottomItem}>
            <span className={styles.contactTag}>OEM</span>
            <h3>Need Your Own Brand?</h3>
            <p>
              Use the dedicated OEM/private-label enquiry workflow for custom
              branding requirements.
            </p>
            <Link className="btn secondary" href="/oem">
              OEM & Private Label →
            </Link>
          </article>

          <article className={styles.contactBottomItem}>
            <span className={styles.contactTag}>RESOURCES</span>
            <h3>Need Technical Documents?</h3>
            <p>
              Access catalogues, datasheets, manuals and other available
              resources.
            </p>
            <button
              type="button"
              className="btn secondary"
              onClick={() => setIsCatalogueOpen(true)}
            >
              Open Download Center →
            </button>
          </article>
        </div>
      </section>

      <CatalogueModal
        isOpen={isCatalogueOpen}
        onClose={() => setIsCatalogueOpen(false)}
      />
    </div>
  );
}
