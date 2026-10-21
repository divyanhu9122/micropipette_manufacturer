// ============================================================
// B2B ENQUIRY VALIDATION UTILITY (STAGE 12 PREPARATION)
// Strict sanitization and validation for quotation requests
// ============================================================

import { CmsEnquiryPayload } from "@/types/cms";

export interface ValidationError {
  field: keyof CmsEnquiryPayload;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  sanitizedData?: CmsEnquiryPayload;
}

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export function validateEnquiryPayload(
  raw: Partial<CmsEnquiryPayload>
): ValidationResult {
  const errors: Record<string, string> = {};

  const name = String(raw.name || "").trim();
  const email = String(raw.email || "").trim().toLowerCase();
  const company = String(raw.company || "").trim();
  const country = String(raw.country || "").trim();
  const message = String(raw.message || "").trim();
  const type = raw.type;

  // Name validation
  if (!name) {
    errors.name = "Full name is required.";
  } else if (name.length < 2) {
    errors.name = "Full name must be at least 2 characters.";
  } else if (name.length > 120) {
    errors.name = "Full name cannot exceed 120 characters.";
  }

  // Email validation
  if (!email) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Please provide a valid corporate or academic email address.";
  }

  // Company validation
  if (!company) {
    errors.company = "Company, hospital, or institutional name is required.";
  } else if (company.length < 2) {
    errors.company = "Company name must be at least 2 characters.";
  }

  // Country validation
  if (!country) {
    errors.country = "Destination country is required.";
  }

  // Message validation
  if (!message) {
    errors.message = "Specification or message details are required.";
  } else if (message.length < 10) {
    errors.message = "Please provide at least 10 characters detailing your requirement.";
  } else if (message.length > 5000) {
    errors.message = "Requirement message cannot exceed 5000 characters.";
  }

  // Enquiry type check
  const allowedTypes: CmsEnquiryPayload["type"][] = [
    "Product Quote",
    "Universal / General",
    "OEM / Private Label",
    "Technical Resource",
  ];

  if (!type || !allowedTypes.includes(type)) {
    errors.type = "Please select a valid enquiry channel.";
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
    sanitizedData: isValid
      ? {
          name,
          email,
          phone: raw.phone ? String(raw.phone).trim() : undefined,
          company,
          country,
          type: type as CmsEnquiryPayload["type"],
          product: raw.product ? String(raw.product).trim() : undefined,
          quantity: raw.quantity ? String(raw.quantity).trim() : undefined,
          message,
          oemSpecifications: raw.oemSpecifications
            ? String(raw.oemSpecifications).trim()
            : undefined,
        }
      : undefined,
  };
}
