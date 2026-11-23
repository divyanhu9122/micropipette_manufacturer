# Micropipette Manufacturer

A Next.js catalogue and quote enquiry website backed by Supabase PostgreSQL, Auth and private Storage. Customers do not need accounts. Approved staff use password sign-in and a TOTP authenticator at /staff/login.

The maintained application is src/app at the repository root. Preserved design archives, former prototype components and scratch material are reference material, not additional deployed applications. Keep the existing LABXE, SSCIENCES and DANWER brand scope; LABAIDS remains excluded. Technical specifications and compliance claims must be verified by the business before publication.

## Current implementation

- Published products, brands, categories, articles, documents and managed pages come from Supabase. Drafts do not appear in public search, navigation or sitemap. Unknown product/article/brand slugs return 404.
- Persistent admin editors support content, uploads, publication, site settings, enquiries and staff access. Enquiries include status, internal notes and private reference files. The dashboard reads real counts and audit events.
- Admin can publish and manage staff/settings. Editor can create and edit drafts. Sales can read enquiries and update status/notes. All protected operations require current active membership, an active Auth session and verified MFA. RLS enforces permissions independently of Next.js.
- All six public enquiry form variants confirm database persistence before showing success. Shared database limits, idempotent retries and a durable email outbox protect the submission workflow. Optional reference files are private, bounded to 3 MB and available only to admin/sales.
- Email integration is prepared for Resend but delivery is disabled until a provider and verified sender are configured. Staff onboarding can use private one-time links without sending email.

The connected database migrations are in supabase/migrations. Existing prototype data can be imported as unpublished drafts. Final product data, PDFs, business contact details and legal/marketing copy still require the owner's review. Do not publish unverified content.

## Setup

Use Node.js 22 or newer and npm. Dependencies are locked in package-lock.json.

```powershell
npm ci
# Fresh checkout only; do not overwrite an existing .env.local:
Copy-Item .env.example .env.local
```

Fill .env.local privately. Required: NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, SUPABASE_SECRET_KEY, REVALIDATION_TOKEN and CRON_SECRET. The two token values should be independently generated random secrets of at least 32 characters. Legacy anon/service keys remain supported. Never put a server key in NEXT_PUBLIC_ variables or Git.

```powershell
node scripts/check-backend.mjs --remote
npm run dev
```

Read [backend setup](docs/BACKEND_SETUP.md) before connecting a different database. Do not replay migrations blindly on an existing project.

## Staff and content

```powershell
# Trusted local setup, only when no active admin exists:
node scripts/bootstrap-staff.mjs admin@example.com
# Regenerate an access link for an existing active staff member:
node scripts/bootstrap-staff.mjs --reissue admin@example.com
# Optional, idempotent import of original source content as drafts:
npm run content:import-drafts
```

Onboarding links are written to ignored .tmp/staff-onboarding.txt and never printed. Open the link while the application is running, choose a password and enroll an authenticator. Other staff are managed from /admin/staff. No shared/default password is created. Recovery links do not bypass MFA; factor recovery requires the trusted Supabase administrator.

Publish verified brands/categories before their products, then upload real images/PDFs and publish the products/resources. Website settings expose public presentation fields only; provider credentials belong in environment settings. Managed pages can replace home, about, oem, applications and faq bodies, or appear at /pages/your-slug. Theme/layout changes remain code changes.

## Verification

```powershell
npm test
npm run lint
npm run typecheck
npm run build
npm audit --omit=dev
npm run start -- --hostname 127.0.0.1 --port 3010
# In another terminal:
node tests/smoke.mjs http://127.0.0.1:3010
```

Unit/route tests use controlled network fixtures. Database tests replay the actual migrations in embedded PostgreSQL and test grants/RLS for anonymous, unapproved, password-only, admin, editor, sales, disabled and revoked sessions. CI does not require production credentials.

The opt-in live integration test creates clearly labelled disposable Auth accounts, catalogue records, an enquiry and private files in the configured Supabase project, then cleans up only its own fixtures. Run only against an owned local server with email delivery disabled. Production intake requires Vercel's trusted IP headers; to simulate them on a loopback production test server:

```powershell
$env:VERCEL='1'
node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3010
# In a second terminal:
node scripts/test-integration.mjs --allow-live-fixtures
```

Do not expose that simulated server to the network. Do not set VERCEL=1 on an arbitrary public server: implement its trusted-proxy identity handling first.

## Deployment

The intended address remains https://micropipette-manufacturer.vercel.app/. Production deployment requires access to that existing Vercel project. No replacement hosting project is required. Configure production environment values privately, link the existing project, deploy the tested revision and smoke-test the public forms and staff workflows. Do not provide production secrets to untrusted preview builds.

See [architecture](docs/ARCHITECTURE.md), [operations and connection](docs/BACKEND_SETUP.md), and [current change report](docs/CHANGE_REPORT.md).
