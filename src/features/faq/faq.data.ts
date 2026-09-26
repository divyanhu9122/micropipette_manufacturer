export interface FaqItem {
  id: string;
  category: "products" | "support" | "oem" | "resources" | "business";
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: "products" | "support" | "oem" | "resources" | "business";
  label: string;
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  { id: "products", label: "Products" },
  { id: "support", label: "Calibration & Support" },
  { id: "oem", label: "OEM & Private Label" },
  { id: "resources", label: "Resources" },
  { id: "business", label: "Business Enquiries" },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    category: "products",
    question: "How do I choose the right micropipette for my application?",
    answer:
      "Start with the required volume range, single-channel or multichannel format, and whether your workflow needs a variable-volume, fixed-volume, mechanical or electronic model. Product pages should provide the technical specifications needed for comparison.",
  },
  {
    id: "faq-2",
    category: "products",
    question: "Can I compare micropipettes from different brands on this website?",
    answer:
      "The website is structured to help users browse products by category, subcategory and brand. Final comparison fields should be generated from verified product data stored in the CMS.",
  },
  {
    id: "faq-3",
    category: "support",
    question: "Where can I find calibration or service information?",
    answer:
      "Calibration, service and technical-support information should be available on the relevant product page or through the support/contact workflow. Any model-specific service instructions should come from verified product documentation.",
  },
  {
    id: "faq-4",
    category: "support",
    question: "Can I request technical assistance before purchasing?",
    answer:
      "Yes. You can send the product name, intended application and your technical requirement through the enquiry form so the appropriate product or support information can be shared.",
  },
  {
    id: "faq-5",
    category: "oem",
    question: "Do you support OEM and private-label micropipette requirements?",
    answer:
      "OEM and private-label enquiries are supported through the dedicated OEM workflow. Requirements can include custom company or logo printing, private-label branding and related product or packaging information where applicable.",
  },
  {
    id: "faq-6",
    category: "oem",
    question: "What information should I provide for an OEM enquiry?",
    answer:
      "Provide your company and contact details, product or category, preferred brand or own-brand requirement, expected quantity, branding or packaging requirement, target market, expected date and any reference file that helps explain the project.",
  },
  {
    id: "faq-7",
    category: "resources",
    question: "Where can I download catalogues, datasheets and manuals?",
    answer:
      "Available documents are organized in the Resources / Download Center. Datasheets and manuals can be offered as direct downloads, while selected complete, OEM or distributor catalogues may use a short enquiry form before download.",
  },
  {
    id: "faq-8",
    category: "resources",
    question: "Are all documents available for every product?",
    answer:
      "Availability depends on the product and the verified documents uploaded in the CMS. Only current and approved files should be displayed for download.",
  },
  {
    id: "faq-9",
    category: "business",
    question: "How can I request a quotation or bulk supply information?",
    answer:
      "Use the Request Quote or Contact Us form and provide the product, quantity, country and any additional requirement. This allows the enquiry to be routed with the relevant commercial information.",
  },
  {
    id: "faq-10",
    category: "business",
    question: "Can distributors or dealers send business enquiries?",
    answer:
      "Yes. Distributor, dealer and other B2B enquiries can be submitted through the Contact Us form by selecting the appropriate enquiry type and providing the relevant market and product requirement.",
  },
];
