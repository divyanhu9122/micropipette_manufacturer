import { HttpError } from "@/lib/http/errors";

type Validator = (value: unknown) => unknown;
const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function invalid(message: string): never {
  throw new HttpError(400, "INVALID_INPUT", message);
}

const text =
  (max: number, nullable = false): Validator =>
  (value) => {
    if (nullable && value === null) return null;
    if (
      typeof value !== "string" ||
      value.trim().length > max ||
      (!nullable && !value.trim())
    )
      invalid("A text field is empty or exceeds its length limit.");
    return value.trim();
  };
const boolean: Validator = (value) =>
  typeof value === "boolean"
    ? value
    : invalid("A boolean field must be true or false.");
const number =
  (min: number, max: number, integer = false): Validator =>
  (value) => {
    if (
      typeof value !== "number" ||
      !Number.isFinite(value) ||
      value < min ||
      value > max ||
      (integer && !Number.isInteger(value))
    )
      invalid("A numeric field is outside its allowed range.");
    return value;
  };
const nullable =
  (validator: Validator): Validator =>
  (value) =>
    value === null ? null : validator(value);
const object: Validator = (value) =>
  value && typeof value === "object" && !Array.isArray(value)
    ? value
    : invalid("Specifications must be a JSON object.");
const slug: Validator = (value) =>
  typeof value === "string" &&
  value.length <= 160 &&
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
    ? value
    : invalid("Use a lowercase slug containing words separated by hyphens.");
const uuid: Validator = (value) =>
  typeof value === "string" && uuidPattern.test(value)
    ? value
    : invalid("A valid record ID is required.");
const url: Validator = (value) => {
  if (typeof value !== "string" || value.length > 2_048)
    invalid("A valid image or document URL is required.");
  if (/^\/(?!\/)/.test(value) && !value.includes("\\")) return value;
  try {
    const parsed = new URL(value);
    if (parsed.protocol === "https:" && !parsed.username && !parsed.password)
      return value;
  } catch {
    /* Return a public validation message below. */
  }
  return invalid("Use an HTTPS URL or a local asset path.");
};
const list =
  (validator: Validator, max: number): Validator =>
  (value) => {
    if (!Array.isArray(value) || value.length > max)
      invalid("A list exceeds its allowed size.");
    return value.map(validator);
  };

function parseFields(
  body: Record<string, unknown>,
  fields: Record<string, Validator>,
  required: string[] = [],
) {
  const result: Record<string, unknown> = {};
  if (!Object.keys(body).length)
    invalid("Provide at least one editable field.");
  for (const [key, value] of Object.entries(body)) {
    if (!Object.hasOwn(fields, key))
      invalid(`The field '${key}' cannot be changed by this operation.`);
    try {
      result[key] = fields[key](value);
    } catch (error) {
      if (error instanceof HttpError) {
        throw new HttpError(error.status, error.code, error.message, {
          [key]: error.message,
        });
      }
      throw error;
    }
  }
  for (const key of required)
    if (!Object.hasOwn(result, key)) invalid(`The field '${key}' is required.`);
  return result;
}

export function parseRecordId(id: string) {
  return uuid(id) as string;
}

export function parseProductInput(
  body: Record<string, unknown>,
  creating = false,
) {
  const result = parseFields(
    body,
    {
      title: text(255),
      slug,
      model_number: text(100, true),
      brand_id: uuid,
      category_id: uuid,
      description: text(20_000, true),
      short_description: text(1_000, true),
      volume_min: nullable(number(0, 1_000_000)),
      volume_max: nullable(number(0, 1_000_000)),
      volume_unit: (value) =>
        typeof value === "string" && ["µL", "uL", "mL"].includes(value)
          ? value
          : invalid("Choose a supported volume unit."),
      channels: number(0, 384, true),
      is_autoclavable: boolean,
      autoclave_type: text(100, true),
      mechanism: text(100, true),
      specifications: object,
      accuracy_tolerances: object,
      images: list(url, 20),
      features: list(text(500), 50),
      applications: list(text(200), 50),
      datasheet_url: nullable(url),
      is_featured: boolean,
      is_active: boolean,
      meta_title: text(255, true),
      meta_description: text(500, true),
      sort_order: number(0, 1_000_000, true),
    },
    creating ? ["title", "slug", "brand_id", "category_id"] : [],
  );
  if (
    typeof result.volume_min === "number" &&
    typeof result.volume_max === "number" &&
    result.volume_max < result.volume_min
  )
    throw new HttpError(
      400,
      "INVALID_INPUT",
      "Maximum volume must be at least the minimum volume.",
      { volume_max: "Maximum volume must be at least the minimum volume." },
    );
  if (creating && !Object.hasOwn(result, "is_active")) result.is_active = false;
  return result;
}

export function parseBlogInput(
  body: Record<string, unknown>,
  creating = false,
) {
  const result = parseFields(
    body,
    {
      title: text(255),
      slug,
      content: text(100_000, true),
      excerpt: text(1_000, true),
      author: text(100),
      cover_image: nullable(url),
      tags: list(text(80), 30),
      category: text(100, true),
      read_time_minutes: nullable(number(1, 1_440, true)),
      is_published: boolean,
      published_at: nullable((value) =>
        typeof value === "string" &&
        /^\d{4}-\d{2}-\d{2}(T.*)?$/.test(value) &&
        Number.isFinite(Date.parse(value))
          ? value
          : invalid("A valid publication date is required."),
      ),
      meta_title: text(255, true),
      meta_description: text(500, true),
    },
    creating ? ["title", "slug", "author"] : [],
  );
  if (creating && !Object.hasOwn(result, "is_published"))
    result.is_published = false;
  return result;
}

export function parseBrandInput(
  body: Record<string, unknown>,
  creating = true,
) {
  return parseFields(
    body,
    {
      name: text(100),
      slug,
      tagline: text(255, true),
      description: text(20_000, true),
      logo_url: nullable(url),
      website: nullable(url),
      is_active: boolean,
      sort_order: number(0, 1_000_000, true),
      meta_title: text(255, true),
      meta_description: text(500, true),
    },
    creating ? ["name", "slug"] : [],
  );
}

export function parseCategoryInput(
  body: Record<string, unknown>,
  creating = false,
) {
  return parseFields(
    body,
    {
      name: text(100),
      slug,
      parent_id: nullable(uuid),
      description: text(20_000, true),
      icon: text(100, true),
      is_active: boolean,
      sort_order: number(0, 1_000_000, true),
      meta_title: text(255, true),
      meta_description: text(500, true),
    },
    creating ? ["name", "slug"] : [],
  );
}

export function parseResourceInput(
  body: Record<string, unknown>,
  creating = false,
) {
  return parseFields(
    body,
    {
      title: text(255),
      type: (value) =>
        typeof value === "string" &&
        ["brochure", "manual", "datasheet", "certificate", "other"].includes(
          value,
        )
          ? value
          : invalid("Choose a supported document type."),
      file_url: nullable(url),
      file_size_kb: nullable(number(0, 1_000_000, true)),
      brand_id: nullable(uuid),
      description: text(20_000, true),
      is_public: boolean,
    },
    creating ? ["title", "type"] : [],
  );
}

export function parsePageInput(
  body: Record<string, unknown>,
  creating = false,
) {
  return parseFields(
    body,
    {
      title: text(255),
      slug,
      description: text(5_000, true),
      body: text(100_000),
      image_url: nullable(url),
      is_active: boolean,
      meta_title: text(255, true),
      meta_description: text(500, true),
    },
    creating ? ["title", "slug", "body"] : [],
  );
}

export function parseSettingsInput(
  body: Record<string, unknown>,
  creating = false,
) {
  const groups: Record<string, Record<string, Validator>> = {
    site: {
      name: text(100, true),
      tagline: text(255, true),
      description: text(500, true),
      logo: nullable(url),
      favicon: nullable(url),
    },
    contact: {
      email: (value) => {
        const parsed = text(254, true)(value);
        if (
          parsed &&
          (typeof parsed !== "string" ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parsed))
        )
          invalid("Enter a valid contact email address.");
        return parsed;
      },
      phone: text(80, true),
      address: text(1_000, true),
      businessHours: text(255, true),
      linkedin: nullable(url),
      twitter: nullable(url),
    },
    seo: {
      title: text(255, true),
      description: text(500, true),
      image: nullable(url),
    },
    navigation: { catalogueUrl: nullable(url) },
  };
  if (typeof body.key !== "string" || !Object.hasOwn(groups, body.key))
    invalid("Choose a supported settings group.");
  const group = body.key as string;
  return parseFields(
    body,
    {
      key: (value) =>
        value === group ? value : invalid("Settings group does not match."),
      value: (value) => {
        object(value);
        return Object.keys(value as object).length
          ? parseFields(value as Record<string, unknown>, groups[group])
          : {};
      },
      is_public: boolean,
    },
    creating ? ["key", "value"] : [],
  );
}

export function parseEnquiryUpdate(body: Record<string, unknown>) {
  return parseFields(body, {
    status: (value) =>
      typeof value === "string" &&
      ["new", "read", "replied", "closed"].includes(value)
        ? value
        : invalid("Choose a supported enquiry status."),
    internal_notes: text(10_000, true),
  });
}
