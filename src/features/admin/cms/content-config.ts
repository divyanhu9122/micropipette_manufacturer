export type ContentEntity =
  | "products"
  | "brands"
  | "categories"
  | "blog"
  | "resources"
  | "pages"
  | "settings";
export type ContentField = {
  key: string;
  label: string;
  type?:
    "textarea" | "number" | "checkbox" | "json" | "lines" | "select" | "date";
  required?: boolean;
  nullable?: boolean;
  options?: string[];
  lookup?: "brands" | "categories";
  upload?: "images" | "documents";
  default?: string | number | boolean;
  hint?: string;
};
export type ContentDefinition = {
  title: string;
  table: string;
  nameField: string;
  publication: string;
  fields: ContentField[];
};
const slug: ContentField = {
  key: "slug",
  label: "URL slug",
  required: true,
  hint: "Lowercase words separated by hyphens.",
};
const seo: ContentField[] = [
  { key: "meta_title", label: "Search title", nullable: true },
  {
    key: "meta_description",
    label: "Search description",
    type: "textarea",
    nullable: true,
  },
];
const publication = (key: string): ContentField => ({
  key,
  label: "Published on the website",
  type: "checkbox",
  default: false,
});
const order: ContentField = {
  key: "sort_order",
  label: "Display order",
  type: "number",
  default: 0,
};

export const CONTENT_DEFINITIONS: Record<ContentEntity, ContentDefinition> = {
  products: {
    title: "Products",
    table: "products",
    nameField: "title",
    publication: "is_active",
    fields: [
      { key: "title", label: "Product name", required: true },
      slug,
      { key: "model_number", label: "Model number", nullable: true },
      {
        key: "brand_id",
        label: "Brand",
        type: "select",
        lookup: "brands",
        required: true,
      },
      {
        key: "category_id",
        label: "Category",
        type: "select",
        lookup: "categories",
        required: true,
      },
      {
        key: "short_description",
        label: "Short overview",
        type: "textarea",
        nullable: true,
      },
      {
        key: "description",
        label: "Full overview",
        type: "textarea",
        nullable: true,
      },
      {
        key: "features",
        label: "Features — one per line",
        type: "lines",
        default: "",
      },
      {
        key: "applications",
        label: "Applications — one per line",
        type: "lines",
        default: "",
      },
      {
        key: "volume_min",
        label: "Minimum volume",
        type: "number",
        nullable: true,
      },
      {
        key: "volume_max",
        label: "Maximum volume",
        type: "number",
        nullable: true,
      },
      {
        key: "volume_unit",
        label: "Volume unit",
        type: "select",
        options: ["µL", "uL", "mL"],
        default: "µL",
      },
      { key: "channels", label: "Channels", type: "number", default: 1 },
      {
        key: "is_autoclavable",
        label: "Autoclavable",
        type: "checkbox",
        default: false,
      },
      { key: "autoclave_type", label: "Autoclave details", nullable: true },
      { key: "mechanism", label: "Product type", nullable: true },
      {
        key: "specifications",
        label: "Specifications",
        type: "json",
        default: "{}",
        hint: 'Labels and values, for example {"Accuracy":"±1%"}. Only enter verified specifications.',
      },
      {
        key: "accuracy_tolerances",
        label: "Accuracy tolerances",
        type: "json",
        default: "{}",
      },
      {
        key: "images",
        label: "Product images — one URL per line",
        type: "lines",
        upload: "images",
        default: "",
      },
      {
        key: "datasheet_url",
        label: "Datasheet",
        upload: "documents",
        nullable: true,
      },
      {
        key: "is_featured",
        label: "Featured on the homepage",
        type: "checkbox",
        default: false,
      },
      order,
      publication("is_active"),
      ...seo,
    ],
  },
  brands: {
    title: "Brands",
    table: "brands",
    nameField: "name",
    publication: "is_active",
    fields: [
      { key: "name", label: "Brand name", required: true },
      slug,
      { key: "tagline", label: "Tagline", nullable: true },
      {
        key: "description",
        label: "Description",
        type: "textarea",
        nullable: true,
      },
      {
        key: "logo_url",
        label: "Brand logo",
        upload: "images",
        nullable: true,
      },
      { key: "website", label: "Official website", nullable: true },
      order,
      publication("is_active"),
      ...seo,
    ],
  },
  categories: {
    title: "Categories",
    table: "categories",
    nameField: "name",
    publication: "is_active",
    fields: [
      { key: "name", label: "Category name", required: true },
      slug,
      {
        key: "parent_id",
        label: "Parent category",
        type: "select",
        lookup: "categories",
        nullable: true,
      },
      {
        key: "description",
        label: "Description",
        type: "textarea",
        nullable: true,
      },
      { key: "icon", label: "Icon label", nullable: true },
      order,
      publication("is_active"),
      ...seo,
    ],
  },
  blog: {
    title: "Articles",
    table: "blog_articles",
    nameField: "title",
    publication: "is_published",
    fields: [
      { key: "title", label: "Article title", required: true },
      slug,
      { key: "author", label: "Author", required: true },
      { key: "excerpt", label: "Summary", type: "textarea", nullable: true },
      {
        key: "content",
        label: "Article — separate paragraphs with a blank line",
        type: "textarea",
        nullable: true,
      },
      { key: "category", label: "Category", nullable: true },
      { key: "tags", label: "Tags — one per line", type: "lines", default: "" },
      {
        key: "cover_image",
        label: "Cover image",
        upload: "images",
        nullable: true,
      },
      {
        key: "published_at",
        label: "Publication date",
        type: "date",
        nullable: true,
      },
      {
        key: "read_time_minutes",
        label: "Reading time in minutes",
        type: "number",
        nullable: true,
      },
      publication("is_published"),
      ...seo,
    ],
  },
  resources: {
    title: "Documents",
    table: "resources",
    nameField: "title",
    publication: "is_public",
    fields: [
      { key: "title", label: "Document title", required: true },
      {
        key: "type",
        label: "Document type",
        type: "select",
        options: ["brochure", "manual", "datasheet", "certificate", "other"],
        default: "brochure",
      },
      {
        key: "file_url",
        label: "PDF file",
        upload: "documents",
        nullable: true,
      },
      {
        key: "file_size_kb",
        label: "File size in KB",
        type: "number",
        nullable: true,
      },
      {
        key: "brand_id",
        label: "Brand",
        type: "select",
        lookup: "brands",
        nullable: true,
      },
      {
        key: "description",
        label: "Description",
        type: "textarea",
        nullable: true,
      },
      publication("is_public"),
    ],
  },
  pages: {
    title: "Website pages",
    table: "pages",
    nameField: "title",
    publication: "is_active",
    fields: [
      { key: "title", label: "Page heading", required: true },
      {
        ...slug,
        hint: "Use home, about, oem, applications, or faq to replace a standard page. Other slugs appear at /pages/your-slug.",
      },
      {
        key: "description",
        label: "Introduction",
        type: "textarea",
        nullable: true,
      },
      {
        key: "body",
        label: "Page content — separate paragraphs with a blank line",
        type: "textarea",
        required: true,
      },
      {
        key: "image_url",
        label: "Page image",
        upload: "images",
        nullable: true,
      },
      publication("is_active"),
      ...seo,
    ],
  },
  settings: {
    title: "Website settings",
    table: "settings",
    nameField: "key",
    publication: "is_public",
    fields: [
      {
        key: "key",
        label: "Settings group",
        type: "select",
        options: ["site", "contact", "seo", "navigation"],
        required: true,
      },
      {
        key: "value",
        label: "Public settings",
        type: "json",
        default: "{}",
        hint: "site: name, tagline, description, logo, favicon. contact: email, phone, address, linkedin, twitter. seo: title, description, image. navigation: catalogueUrl. Values are text. Never put credentials here.",
      },
      publication("is_public"),
    ],
  },
};

export function isContentEntity(entity: string): entity is ContentEntity {
  return Object.hasOwn(CONTENT_DEFINITIONS, entity);
}
