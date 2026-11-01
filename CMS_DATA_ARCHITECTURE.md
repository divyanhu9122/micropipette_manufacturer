# CMS Data Architecture Specification (Stage 8)

> ⚠️ **ARCHITECTURE DECISION UPDATE (November 2026)**  
> The original Strapi v5 + PostgreSQL plan has been replaced with Supabase.  
> Supabase provides PostgreSQL, file storage, and RLS in a single managed service.  
> No separate CMS server is needed. All schemas below are implemented as Supabase tables.

---

> **Document Status**: Complete & Aligned with Phase 4 Admin Prototypes  
> **Target Backend**: Supabase (PostgreSQL 16+, Supabase Storage, Row Level Security)  
> **Database Engine**: PostgreSQL 16+ (Supabase Managed)  
> **Target Object Storage**: Supabase Storage (S3-compatible bucket + global CDN distribution)  
> **Frontend Consumer**: Next.js 16 (App Router) with typed fetchers (`src/lib/cms`) querying Supabase REST / PostgREST API

---

## 1. Architecture Overview & Entity Relationships

The data model is engineered around a **hybrid B2B catalog and inquiry pipeline**. A single technical resource (manual, certificate, brochure) or brand entity can relate to multiple products or categories without duplicating files.

```mermaid
erDiagram
    BRAND ||--o{ PRODUCT : manufactures
    CATEGORY ||--o{ PRODUCT : classifies
    CATEGORY ||--o{ CATEGORY : parent_of
    PRODUCT ||--o{ RESOURCE : references
    BRAND ||--o{ RESOURCE : associates
    CATEGORY ||--o{ RESOURCE : associates
    PRODUCT ||--o{ ENQUIRY : generates
    APPLICATION ||--o{ PRODUCT : highlights
    BLOG_ARTICLE }o--o{ PRODUCT : features
    BLOG_ARTICLE }o--o{ BLOG_ARTICLE : related
```

---

## 2. Content Type Schemas (Supabase PostgreSQL Tables)

### 2.1. Product (`products` table)
*Supabase PostgreSQL table — Core scientific product catalog item.*

| Field | Type | Required | Constraints / Validation | Notes |
| :--- | :--- | :--- | :--- | :--- |
| `title` | String | Yes | Max 255 chars | e.g. "LABXE Micropipette Single Channel" |
| `slug` | UID / Text | Yes | Target: `title`, unique | e.g. `labxe-precision-variable-100-1000` |
| `sku` | String | Yes | Unique, uppercase | e.g. `LABXE-SP-001` |
| `brand` | Relation (M2O) | Yes | Target: `brands` table (Foreign Key) | One of `LABXE`, `SSCIENCES`, `DANWER` |
| `category` | Relation (M2O) | Yes | Target: `categories` table (Foreign Key) | Top-level category |
| `subcategory` | Relation (M2O) | No | Target: `categories` table (Foreign Key) | Child category (e.g. Variable Volume) |
| `channelType` | Enumeration | No | `Single Channel`, `8-Channel`, `12-Channel`, `None` | Product hardware channel configuration |
| `mechanism` | Enumeration | Yes | `Mechanical (Manual)`, `Electronic (Motorized)` | Pipetting drive type |
| `volumeRangeMin` | Decimal | No | >= 0 | Minimum microliter volume (e.g. 0.1) |
| `volumeRangeMax` | Decimal | No | > volumeRangeMin | Maximum microliter volume (e.g. 1000) |
| `volumeUnit` | Enumeration | No | `µL`, `mL` | Default: `µL` |
| `autoclavability` | Enumeration | Yes | `Fully Autoclavable`, `Autoclavable Lower Assembly`, `Non-autoclavable` | ISO 8655 sterilization compliance |
| `overview` | Text | Yes | Short summary (100–350 chars) | Displayed on product cards & summary |
| `features` | JSONB | No | Array of strings | Key bulleted product advantages |
| `specifications` | JSONB (Repeatable) | Yes | `[{ label: string, value: string }]` | Technical table (accuracy, CV%, tip fit) |
| `images` | JSONB / Supabase Storage | Yes | Formats: `.webp`, `.jpg`, `.png` | Product photo gallery |
| `resources` | Relation (M2M) | No | Target: `resources` table (Join Table: `product_resources`) | Linked datasheets, manuals, certificates |
| `relatedProducts`| Relation (M2M) | No | Target: `products` table (Join Table: `related_products`) | Cross-sell / alternative volume models |
| `displayOrder` | Integer | No | Default: 100 | Catalog sort index |
| `seo` | JSONB | No | Target: `shared.seo` | Page-specific title, meta desc, canonical |
| `status` | Text / Enum | Yes | Supabase editorial status | `Draft` / `Published` |

---

### 2.2. Category (`categories` table)
*Supabase PostgreSQL table — Hierarchical product taxonomy.*

| Field | Type | Required | Constraints | Notes |
| :--- | :--- | :--- | :--- | :--- |
| `name` | String | Yes | Max 100 chars | e.g. "Micropipettes", "Bottle Top Dispensers" |
| `slug` | UID / Text | Yes | Target: `name`, unique | e.g. `micropipettes`, `bottle-top-dispensers` |
| `parent` | Relation (M2O) | No | Target: `categories` table (Foreign Key) | Self-referencing parent category |
| `children` | Relation (O2M) | No | Target: `categories` table (Inverted Foreign Key) | Child subcategories |
| `description` | Text | No | Max 500 chars | Category summary for catalog banner |
| `bannerImage` | Text / Supabase Storage | No | Image asset URL | Header background image |
| `displayOrder` | Integer | Yes | Default: 1 | Navigation sort order |
| `seo` | JSONB | No | Target: `shared.seo` | Category SEO meta |

---

### 2.3. Brand (`brands` table)
*Supabase PostgreSQL table — Verified brand portfolios.*

| Field | Type | Required | Constraints | Notes |
| :--- | :--- | :--- | :--- | :--- |
| `name` | Enumeration | Yes | `LABXE`, `SSCIENCES`, `DANWER` | Strict confirmed brand scope |
| `tagline` | String | Yes | Max 150 chars | e.g. "Technology For Better Science." |
| `slug` | UID / Text | Yes | Target: `name`, unique | `labxe`, `ssciences`, `danwer` |
| `summary` | Text | Yes | Multi-paragraph overview | Brand story and manufacturing focus |
| `logo` | Text / Supabase Storage | Yes | Vector SVG / transparent PNG | Brand identity mark |
| `bannerImage` | Text / Supabase Storage | No | Image asset URL | Brand hero background |
| `displayOrder` | Integer | Yes | Default: 1 | Listing display sequence |
| `products` | Relation (O2M) | No | Target: `products` table | Products under this brand |
| `seo` | JSONB | No | Target: `shared.seo` | Brand landing page SEO |

---

### 2.4. Resource (`resources` table)
*Supabase PostgreSQL table — Central document repository.*

| Field | Type | Required | Constraints | Notes |
| :--- | :--- | :--- | :--- | :--- |
| `title` | String | Yes | Max 200 chars | e.g. "Liquid Handling Master Catalogue" |
| `type` | Enumeration | Yes | `Catalogue`, `Brochure`, `Datasheet`, `Manual`, `Certificate`, `Calibration-related`, `Other` | Resource classification |
| `file` | Text / Supabase Storage | Yes | Allowed: `.pdf`, `.doc`, `.docx` | Supabase Storage hosted downloadable document |
| `downloadLabel` | String | No | Default: "Download Document" | CTA button label |
| `brands` | Relation (M2M) | No | Target: `brands` table | Associated brand(s) |
| `categories` | Relation (M2M) | No | Target: `categories` table | Associated category(ies) |
| `products` | Relation (M2M) | No | Target: `products` table | Associated product(s) |
| `isGated` | Boolean | Yes | Default: `false` | If true, prompts for user email before download |

---

### 2.5. Blog Article (`blog_articles` table)
*Supabase PostgreSQL table — Scientific insights, guides, and SEO content.*

| Field | Type | Required | Constraints | Notes |
| :--- | :--- | :--- | :--- | :--- |
| `title` | String | Yes | Max 255 chars | e.g. "ISO 8655 Gravimetric Testing Explained" |
| `slug` | UID / Text | Yes | Target: `title`, unique | e.g. `iso-8655-gravimetric-testing-explained` |
| `category` | String | Yes | Max 60 chars | e.g. "Liquid Handling", "Product Guidance" |
| `author` | String | Yes | Max 100 chars | Author or editorial credit |
| `publishDate` | Date | Yes | ISO format (`YYYY-MM-DD`) | Display date |
| `readingTime` | String | No | e.g. "5 min read" | Reading duration |
| `excerpt` | Text | Yes | Max 350 chars | Summary for listing card and OpenGraph |
| `content` | Rich Text / Markdown | Yes | Markdown / Supabase Text | Full article body with H2/H3 for TOC |
| `featuredImage` | Text / Supabase Storage | Yes | Image asset URL | Article banner |
| `tags` | JSONB | No | Array of strings | e.g. `["micropipette", "calibration"]` |
| `faq` | JSONB (Repeatable) | No | `[{ question: string, answer: string }]` | Optional article-specific FAQ |
| `relatedProducts`| Relation (M2M) | No | Target: `products` table | Embedded product recommendation cards |
| `seo` | JSONB | No | Target: `shared.seo` | Page-specific SEO |

---

### 2.6. Application (`applications` table)
*Supabase PostgreSQL table — Scientific industry workflows.*

| Field | Type | Required | Constraints | Notes |
| :--- | :--- | :--- | :--- | :--- |
| `name` | String | Yes | Max 100 chars | e.g. "Molecular Biology", "Genomics" |
| `slug` | UID / Text | Yes | Target: `name`, unique | e.g. `molecular-biology` |
| `summary` | Text | Yes | Max 300 chars | Application description |
| `icon` | String | No | Icon identifier | SVG icon name |
| `displayOrder` | Integer | Yes | Default: 1 | Discovery grid order |
| `products` | Relation (M2M) | No | Target: `products` table | Applicable pipettes and consumables |

---

### 2.7. FAQ (`faqs` table)
*Supabase PostgreSQL table — Global and category-associated FAQs.*

| Field | Type | Required | Constraints | Notes |
| :--- | :--- | :--- | :--- | :--- |
| `question` | String | Yes | Max 255 chars | Question statement |
| `answer` | Text | Yes | Markdown-supported | Verified technical answer |
| `category` | Enumeration | Yes | `General`, `Products`, `OEM`, `Calibration`, `Shipping` | Filter group |
| `displayOrder` | Integer | Yes | Default: 1 | Display sequence |

---

### 2.8. Enquiry (`enquiries` table)
*Supabase PostgreSQL table — Incoming B2B quote and contact requests.*

| Field | Type | Required | Constraints | Notes |
| :--- | :--- | :--- | :--- | :--- |
| `name` | String | Yes | Max 120 chars | Contact person |
| `email` | Email / String | Yes | Valid email format | Contact email address |
| `phone` | String | No | Phone number | Optional country-code telephone |
| `company` | String | Yes | Max 150 chars | Organization / Institution |
| `country` | String | Yes | Max 80 chars | Country of destination |
| `type` | Enumeration | Yes | `Product Quote`, `Universal / General`, `OEM / Private Label`, `Technical Resource` | Distinct enquiry channel |
| `product` | String | No | Product title or SKU | Set if product-specific quote |
| `quantity` | String | No | e.g. "50 units" | Estimated order volume |
| `message` | Text | Yes | Multi-line text | Specific user requirement |
| `oemSpecifications` | Text | No | Detailed OEM specs | Custom branding, colors, volume ranges |
| `status` | Enumeration | Yes | `New`, `Open`, `Responded`, `Closed` | Supabase Dashboard / Admin workflow status |
| `internalNotes` | Text | No | Internal only | Admin notes (protected by Supabase RLS; never exposed to public API) |

---

### 2.9. Settings (`settings` table / Single Row)
*Supabase PostgreSQL table (Single Row) — Global website identity, SEO defaults, and contact points.*

| Field | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| `siteName` | String | Yes | "MicropipetteManufacturer.com" |
| `siteTagline` | String | Yes | "Precision. Performance. Partnership." |
| `defaultDescription` | Text | Yes | Fallback search description |
| `defaultTitlePattern` | String | Yes | `{page_title} \| MicropipetteManufacturer.com` |
| `defaultRobots` | String | Yes | "Index, follow" |
| `contactEmail` | Email | Yes | "sales@micropipettemanufacturer.com" |
| `contactPhone` | String | Yes | "+91 98200 00000" |
| `address` | Text | Yes | Manufacturing plant address |
| `linkedin` | URL | No | Official LinkedIn URL |
| `twitter` | URL | No | Official Twitter/X URL |

---

### 2.10. Shared Component: SEO (`shared.seo`)

| Field | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| `metaTitle` | String | No | Target length: 50–65 chars |
| `metaDescription` | Text | No | Target length: 120–160 chars |
| `canonicalUrl` | String | No | Custom canonical override |
| `robotsDirective` | String | No | e.g. `noindex, nofollow` |
| `shareImage` | Text / Supabase Storage | No | OpenGraph / Twitter card image URL |
| `schemaJson` | JSONB | No | Optional custom JSON-LD schema snippet |

---

## 3. Database Indexing Strategy (PostgreSQL)

To ensure sub-millisecond query execution in production:

1. **Unique Indexes**:
   * `products.slug`, `products.sku`
   * `categories.slug`
   * `brands.slug`
   * `blog_articles.slug`
   * `applications.slug`
2. **Foreign Key Indexes**:
   * `products.brand_id`, `products.category_id`
   * `categories.parent_id`
   * `enquiries.created_at`, `enquiries.status`
3. **Full-Text Search Index (GIN)**:
   * `to_tsvector('english', products.title || ' ' || products.overview)`

---

## 4. API Security, Row Level Security (RLS) & Access Control

Supabase provides PostgreSQL Row Level Security (RLS) to enforce granular read/write permissions directly at the database engine level.

* **Public / Anon Access (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)**:
  * Allowed: `SELECT` (read-only) via Supabase REST / PostgREST API on `products`, `categories`, `brands`, `resources`, `blog_articles`, `applications`, `faqs`, and `settings` where `status = 'Published'`.
  * Allowed: `INSERT` on `enquiries` table (screened by spam honeypot and rate limiter in Next.js Route Handler).
  * Denied: All `UPDATE`, `DELETE`, and access to sensitive internal columns (e.g. `internalNotes` on `enquiries` is protected by RLS policy).
* **Service Role / Admin Token (`SUPABASE_SERVICE_KEY`)**:
  * Used server-side by Next.js Server Components, API route handlers, and ISR revalidation pipelines with `NEXT_PUBLIC_SUPABASE_URL` to bypass RLS for administrative operations or reading draft content.
  * Never exposed to client-side bundles or browsers.
* **Supabase Dashboard**:
  * Used for administrative content creation, editorial workflow management, enquiry inbox triage, and database schema administration with Supabase Auth RBAC.
