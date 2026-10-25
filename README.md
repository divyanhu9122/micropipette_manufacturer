# Micropipette Manufacturer B2B Web Platform

B2B scientific laboratory liquid-handling and precision instrument platform (`MicropipetteManufacturer.in` / `MicropipetteManufacturer.com`). The application provides product catalog discovery, technical specification tables conforming to ISO 8655 gravimetric tolerances, multi-facet filtering, quotation inquiry pipelines (product-specific, universal, and OEM private-label), central technical resource downloads, SEO-indexed technical articles, and an internal Admin CMS management console.

---

## 1. Permitted Brand Scope

The platform strictly represents three confirmed corporate manufacturing brands:

1. **`LABXE`**: Scientific liquid-handling equipment, in-house molding, assembly, single/multichannel pipettes, bottle-top dispensers, and electronic pipette controllers.
2. **`SSCIENCES`** (*Singh Science Systems*): Precision laboratory lines including Mini, Excellent, Science Plus (semi-autoclavable), FAC Plus (fully autoclavable), and multichannel series under the registered tagline *"Technology For Better Science."*
3. **`DANWER`**: High-precision analytical balances, laboratory scales, and precision liquid-handling instruments.

> **Important**: Per project operating rules, `LABAIDS` is strictly excluded from this repository and must never be added.

---

## 2. Technology Stack

- **Core Framework**: Next.js 16.3.4 (App Router)
- **Runtime & UI**: React 19.2.8, strict TypeScript 5
- **Styling**: Vanilla CSS + scoped CSS Modules with custom design tokens (`src/styles/tokens.css`). **Zero TailwindCSS dependency**.
- **Typography**: Google Fonts via `next/font/google` — **Manrope** (headings) and **Inter** (body text and tabular technical data), self-hosted automatically.
- **Server APIs**: Next.js App Router Route Handlers (`/api/enquiries`, `/api/revalidate`).
- **Data Access Layer**: Server-only dual-mode CMS client (`src/lib/cms/`) with graceful mock fallback and on-demand ISR revalidation.
- **Target CMS & DB (Stage 9)**: Strapi v5 Headless CMS + PostgreSQL 16+ (specified in [`CMS_DATA_ARCHITECTURE.md`](CMS_DATA_ARCHITECTURE.md)).

---

## 3. Current Application Capabilities (85 Compiled Routes)

### Public Platform
- **Homepage ([`/`](src/app/page.tsx))**: Hero slider, product categories, brand portfolio showcase, OEM capabilities, applications, featured series, ISO quality standards, customer testimonials, partner marquee, and global quotation modal.
- **Product Catalog ([`/products`](src/app/products/page.tsx))**: Multi-facet interactive filtering (Brand, Volume Range, Autoclavability, Channel Count, Mechanism), keyword search, sorting, and responsive product cards.
- **Product Hierarchy & Details ([`/products/[slug]`](src/app/products/[slug]/page.tsx))**: Dynamic product pages with technical specifications, ISO 8655 accuracy (A%) and precision (CV%) tables, autoclavability badges, downloadable datasheets, and direct quotation modal.
- **Category & Subcategory Routes**: [`/products/micropipettes`](src/app/products/micropipettes/page.tsx) and [`/products/micropipettes/variable-volume`](src/app/products/micropipettes/variable-volume/page.tsx).
- **Brand Portfolios ([`/brands`](src/app/brands/page.tsx))**: Dedicated showcase pages for [`/brands/labxe`](src/app/brands/[slug]/page.tsx), [`/brands/ssciences`](src/app/brands/[slug]/page.tsx), and [`/brands/danwer`](src/app/brands/[slug]/page.tsx).
- **OEM & Private Label Solutions ([`/oem`](src/app/oem/page.tsx))**: Custom injection molding, custom volume ranges, laser branding, calibration tolerances, and embedded consultation form.
- **Applications Listing ([`/applications`](src/app/applications/page.tsx))**: Scientific workflow cards covering Genomics, Cell Culture, PCR/Sequencing, Microbiology, and Clinical Diagnostics.
- **Download Center ([`/resources`](src/app/resources/page.tsx))**: Central document repository for Catalogues, Brochures, Datasheets, Manuals, and ISO Certificates.
- **Blog & Knowledge Hub ([`/blog`](src/app/blog/page.tsx), [`/blog/[slug]`](src/app/blog/[slug]/page.tsx))**: Technical articles with sticky auto-generated Table of Contents, ISO 8655 testing guides, and product cross-references.
- **Company & Inquiry Pages**: About Us ([`/about`](src/app/about/page.tsx)), Contact Us ([`/contact`](src/app/contact/page.tsx)), Universal Quote ([`/request-quote`](src/app/request-quote/page.tsx)), FAQ Hub ([`/faq`](src/app/faq/page.tsx)), Privacy Policy ([`/privacy-policy`](src/app/privacy-policy/page.tsx)), and Terms ([`/terms`](src/app/terms/page.tsx)).
- **Universal Search ([`/search`](src/app/search/page.tsx))**: Instant header search suggestions and dedicated search results view.
- **Resilience & SEO**: Global loading skeleton ([`src/app/loading.tsx`](src/app/loading.tsx)), error boundary ([`src/app/error.tsx`](src/app/error.tsx)), dark 404 page ([`src/app/not-found.tsx`](src/app/not-found.tsx)), dynamic [`robots.ts`](src/app/robots.ts), and dynamic [`sitemap.ts`](src/app/sitemap.ts).

### Admin CMS Prototypes ([`/admin`](src/app/admin/page.tsx))
- **Dashboard ([`/admin`](src/app/admin/page.tsx))**: Metrics overview (Total Products, Pending Inquiries, Approvals), quick actions, and recent activity logs.
- **Product Management ([`/admin/products`](src/app/admin/products/page.tsx))**: Searchable product table with status badges and full **Add/Edit Product Editor** modal.
- **Taxonomy Manager ([`/admin/categories`](src/app/admin/categories/page.tsx))**: Category hierarchy tree view with child counts and SEO editing controls.
- **Brand Manager ([`/admin/brands`](src/app/admin/brands/page.tsx))**: Brand portfolio cards for LABXE, SSCIENCES, and DANWER with linked product counters.
- **Resource Registry ([`/admin/resources`](src/app/admin/resources/page.tsx))**: Central document registry with multi-entity association (Brand / Category / Product).
- **Blog Publishing ([`/admin/blog`](src/app/admin/blog/page.tsx))**: Article manager with reading-time metrics, status filters, and modal editor.
- **Enquiry Inbox ([`/admin/enquiries`](src/app/admin/enquiries/page.tsx))**: Incoming B2B quote requests table with status pills (New, Open, Responded, Closed) and detail viewer.
- **Site Settings & SERP Preview ([`/admin/settings`](src/app/admin/settings/page.tsx))**: Global identity settings, contact channels, and live Google SERP preview.

### Server API Pipeline
- **`POST /api/enquiries`**: In-memory IP rate limiter (max 5 submissions per minute per IP), invisible honeypot spam guard (`website_hp`, `hp_check`), server-side RFC 5322 regex validation, and standardized quotation ID generation (`ENQ-XXXXXX-XXXX`).
- **`POST /api/revalidate`**: Token-secured cache revalidation webhook supporting path and tag invalidation.

---

## 4. Local Development & Verification

### Prerequisites
- Node.js 20+ (recommended: Node 22 or Node 24 LTS)
- npm

### Installation
```sh
npm install
```

### Environment Configuration
Copy `.env.example` to `.env.local`:
```sh
cp .env.example .env.local
```

| Variable | Description | Default / Local Development |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public site domain URL | `http://localhost:3000` |
| `CMS_API_URL` | Strapi REST API endpoint | Leave blank for prototype mock fallback |
| `CMS_API_TOKEN` | Strapi server-to-server token | Leave blank for prototype mock fallback |
| `REVALIDATE_SECRET` | Token for `/api/revalidate` webhook | Optional in local development |

### Running the Application
```sh
# Start local development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for the public website, or [http://localhost:3000/admin](http://localhost:3000/admin) for the admin console.

### Code Quality & Verification Commands
```sh
# 1. Run ESLint code quality checks
npm run lint

# 2. Run strict TypeScript type-checking
npm run typecheck

# 3. Format code / check formatting
npm run format
npm run format:check

# 4. Create production build
npm run build

# 5. Start production server
npm run start
```

### Automated Test Suite
The repository includes a 59-assertion automated verification runner testing the validation engine, live API endpoints, and CMS fallback fetchers:
```sh
# Note: Ensure the development server is running on port 3000 before running the suite
node scratch/test_suite.mjs
```

---

## 5. Current CMS State: Dual-Mode Architecture

The frontend uses a dual-mode data architecture (`src/lib/cms/`):

1. **Online Mode (CMS Configured)**: When `CMS_API_URL` and `CMS_API_TOKEN` are defined in the environment, the server-side client queries Strapi REST endpoints directly with on-demand ISR revalidation.
2. **Offline / Fallback Mode (Default)**: When Strapi is not running or credentials are blank, typed fetchers (`src/lib/cms/fetchers.ts`) seamlessly fall back to verified internal datasets (`admin.data.ts`) with zero runtime errors and zero downtime.

---

## 6. Next Development Milestone & Known Limitations

- **Current Milestone**: Transitioning to **Stage 9 — Strapi v5 Headless CMS & PostgreSQL Initialization**.
- **Architecture Blueprint**: Refer to [`CMS_DATA_ARCHITECTURE.md`](CMS_DATA_ARCHITECTURE.md) for full schema definitions, field constraints, entity relationship diagrams, database indexes, and API permissions.
- **Known Limitations**:
  - Live external Strapi instance and PostgreSQL database are not yet initialized (all data currently served via fallback mock datasets).
  - Transactional email dispatch (SMTP / AWS SES / Resend) for submitted inquiries is deferred to production deployment; submissions currently log receipts on the server.
  - S3-compatible object storage and CDN for PDF spec sheet distribution are scheduled for Stage 11.
