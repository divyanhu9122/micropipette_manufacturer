// Source of truth: organized file/02-public-prototypes/
// MicropipetteManufacturer_Phase3_Product_Listing_Refined_v17_Sort_Above_Results.html
// Status: LOCKED prototype. All product content below is placeholder text,
// copied verbatim from the confirmed prototype pending verified business data.

export type ProductFamily =
  | "Micropipettes"
  | "Pipette Tips"
  | "Bottle Top Dispensers"
  | "Pipette Controllers"
  | "Balances"
  | "Laboratory Instruments";

export type ProductBrand = "LABXE" | "SSCIENCES" | "DANWER";

export type SortValue = "featured" | "az" | "za";

export interface SortOption {
  value: SortValue;
  label: string;
}

export interface ProductListItem {
  id: string;
  /** Intended Product Detail route segment; that page is not migrated yet. */
  slug: string;
  /** Displayed brand tag text. Placeholder in the confirmed prototype. */
  brandLabel: string;
  /** Displayed product type tag text. Placeholder in the confirmed prototype. */
  typeLabel: string;
  title: string;
  description: string;
  specs: readonly string[];
}

export const productFamilies: readonly ProductFamily[] = [
  "Micropipettes",
  "Pipette Tips",
  "Bottle Top Dispensers",
  "Pipette Controllers",
  "Balances",
  "Laboratory Instruments",
];

export const productBrands: readonly ProductBrand[] = [
  "LABXE",
  "SSCIENCES",
  "DANWER",
];

// Product Family filter labels that already have an approved destination
// page link to it (Next.js Link, not a homepage anchor). Families without an
// approved route yet (Pipette Tips, Bottle Top Dispensers, Pipette
// Controllers, Balances, Laboratory Instruments) stay plain, non-linked
// filter labels until their own category pages are migrated.
export const productFamilyRoutes: Partial<Record<ProductFamily, string>> = {
  Micropipettes: "/products/micropipettes",
};

export const sortOptions: readonly SortOption[] = [
  { value: "featured", label: "Sort: Featured" },
  { value: "az", label: "Name A→Z" },
  { value: "za", label: "Name Z→A" },
];

// The confirmed prototype renders six identical placeholder product cards;
// only the id/slug differ so each has a stable React key and CTA target.
const PLACEHOLDER_CARD = {
  brandLabel: "Brand",
  typeLabel: "Product Type",
  title: "Product Name / Model",
  description:
    "Product description will be added after verified product data is provided.",
  specs: ["Specification", "Specification"],
} as const;

export const productListItems: readonly ProductListItem[] = Array.from(
  { length: 6 },
  (_, index) => ({
    id: `placeholder-${index + 1}`,
    slug: `placeholder-${index + 1}`,
    ...PLACEHOLDER_CARD,
  }),
);

// Prototype value; production will use CMS/API result count.
export const prototypeTotalPages = 5;
