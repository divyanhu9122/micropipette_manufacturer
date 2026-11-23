# Production backend change report

Updated 24 November 2026. This report describes the current implementation; earlier prototype percentages and scratch checks are historical.

## Implemented

- Consolidated the maintained app at the repository root; preserved reference archives and inactive prototypes.
- Connected the intended Supabase project and applied three versioned migrations covering all business data, staff authorization, storage, auditing, shared rate limits and notification jobs.
- Replaced active local-only admin editors/dashboard/enquiries with persistent, paginated API-backed interfaces. Added staff management, managed pages, private uploads and publication controls.
- Connected public catalogue, detail pages, brands, blog, resources, home sections, settings, navigation, search and sitemap to published Supabase data. Removed fabricated fallback detail records and fake download success.
- Added staff password/TOTP flows, SSR session refresh, onboarding/password setup, current membership and session checks, user-scoped APIs and independent RLS/column grants.
- Connected all six enquiry form variants, preserving quantity and OEM requirements. Added confirmed receipts, idempotent retries, private reference attachments, shared limits and durable optional notification delivery.
- Added repeatable offline database/route/workflow tests, opt-in live integration checks, safe connection checks and setup/import commands.

## Verification

The automated test suite currently contains 57 tests. It covers negative access, real PostgreSQL policies/grants, inactive/revoked sessions, editor publication restrictions, sales column limits, category cycles, storage correlation/privacy, upload tokens/bytes, failures and idempotency. The full dependency audit, including development tools, reports zero known vulnerabilities after updating the vulnerable transitive linting dependencies. The production build and TypeScript check pass. The local production server passed 34 HTTP smoke checks and 12 live Supabase integration groups, including TOTP, SSR cookies, one-time onboarding/password setup, publication, role boundaries, private storage, idempotent intake and revocation. All disposable test data/files/accounts were removed. ESLint passes with zero errors and zero warnings. Deployment to the existing Vercel project remains pending access.

## Remaining launch dependencies

- Access to the existing Vercel project, production environment configuration and verified deployment at the existing URL.
- The first admin membership for rajyu2003@gmail.com is prepared. The private one-time link is in ignored .tmp/staff-onboarding.txt; the owner still needs to choose a password and enroll an authenticator.
- Final verified product/brand information, images, PDFs, business contacts and legal/marketing copy. Imported drafts: 3 brands, 4 categories, 12 products, 8 articles and 19 document descriptions; zero were published.
- Email provider/verified sender and optional Supabase SMTP. Until configured, enquiries are stored in the admin inbox and alerts are queued.
- Business decisions for retention, backups, monitoring, storage quotas and any future CAPTCHA/antivirus requirements.

No public customer accounts, checkout, payments or multi-tenant organization layer are included in the agreed scope. Custom visual page-building is not included; the CMS edits supported fields and managed page bodies.
