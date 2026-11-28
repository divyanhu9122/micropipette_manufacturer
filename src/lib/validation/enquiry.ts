import type { CmsEnquiryPayload } from "@/types/cms";

export interface ValidationError {
  field: keyof CmsEnquiryPayload;
  message: string;
}

export interface ValidatedEnquiry extends CmsEnquiryPayload {
  productSlug?: string;
  productTitle?: string;
  enquiryType: "product" | "universal" | "oem" | "contact";
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  sanitizedData?: ValidatedEnquiry;
}

const EMAIL_REGEX =
  /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
const allowedTypes = [
  "Product Quote",
  "Universal / General",
  "OEM / Private Label",
  "Technical Resource",
] as const;
const enquiryTypes = ["product", "universal", "oem", "contact"] as const;

export function validateEnquiryPayload(
  raw: Partial<CmsEnquiryPayload> | Record<string, unknown>,
): ValidationResult {
  const errors: Record<string, string> = {};
  const input = raw as Record<string, unknown>;
  const read = (field: string, label: string, max: number, min = 0) => {
    const value = input[field];
    if (value === undefined || value === null || value === "") {
      if (min) errors[field] = `${label} is required.`;
      return "";
    }
    if (typeof value !== "string") {
      errors[field] = `${label} must be text.`;
      return "";
    }
    const trimmed = value.trim();
    if (trimmed.length < min)
      errors[field] = `${label} must be at least ${min} characters.`;
    if (trimmed.length > max)
      errors[field] = `${label} cannot exceed ${max} characters.`;
    return trimmed;
  };
  const name = read("name", "Full name", 120, 2);
  const email = read("email", "Email address", 254, 1).toLowerCase();
  if (email && !EMAIL_REGEX.test(email))
    errors.email = "Please provide a valid email address.";
  const company = read("company", "Company name", 150, 2);
  const country = read("country", "Destination country", 80, 2);
  const message = read("message", "Requirement message", 5_000, 10);
  const phone = read("phone", "Phone number", 60);
  const product = read("product", "Requested products", 3_000);
  const quantity = read("quantity", "Quantity", 200);
  const oemSpecifications = read(
    "oemSpecifications",
    "OEM specifications",
    5_000,
  );
  const type = input.type;
  if (!allowedTypes.some((allowed) => allowed === type))
    errors.type = "Please select a valid enquiry channel.";

  const slugValue = input.productSlug ?? input.product_slug;
  const productSlug =
    typeof slugValue === "string" ? slugValue.trim() : undefined;
  if (
    slugValue !== undefined &&
    (!productSlug ||
      productSlug.length > 160 ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(productSlug))
  )
    errors.productSlug = "The product reference is invalid.";
  const titleValue = input.productTitle ?? input.product_title;
  const productTitle =
    typeof titleValue === "string" ? titleValue.trim() : undefined;
  if (
    titleValue !== undefined &&
    (!productTitle || productTitle.length > 3_000)
  )
    errors.productTitle = "The product title is invalid.";
  const explicitType = input.enquiryType ?? input.enquiry_type;
  if (
    explicitType !== undefined &&
    !enquiryTypes.some((allowed) => allowed === explicitType)
  )
    errors.enquiryType = "The enquiry type is invalid.";
  const enquiryType =
    explicitType ??
    (type === "Product Quote"
      ? "product"
      : type === "OEM / Private Label"
        ? "oem"
        : type === "Technical Resource"
          ? "contact"
          : "universal");

  if (Object.keys(errors).length) return { isValid: false, errors };
  return {
    isValid: true,
    errors,
    sanitizedData: {
      name,
      email,
      company,
      country,
      message,
      type: type as CmsEnquiryPayload["type"],
      phone: phone || undefined,
      product: product || undefined,
      quantity: quantity || undefined,
      oemSpecifications: oemSpecifications || undefined,
      productSlug,
      productTitle,
      enquiryType: enquiryType as ValidatedEnquiry["enquiryType"],
    },
  };
}
