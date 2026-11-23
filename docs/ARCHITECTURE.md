# Application and backend boundaries

## Application structure

src/app owns routing, server rendering, metadata and APIs. src/features owns the public and staff interfaces; src/components and src/styles hold shared presentation. There is one maintained Next.js application. Original design/reference folders and unused prototype components are preserved and excluded from normal build/lint work.

Public catalogue pages use src/lib/cms/public.ts: an anonymous, session-free client reads published records through RLS. A tagged cache is refreshed after confirmed CMS writes. Public navigation, search and sitemap share that source. Configured backend failures are surfaced rather than replaced with fake products. An unconfigured build can still compile for CI.

## Authentication and authorization

Supabase Auth handles passwords, signed JWTs and TOTP. The browser and per-request SSR clients use @supabase/ssr cookies; src/proxy.ts refreshes staff/auth sessions and prevents private response caching. API and page guards verify Auth identity, signed claims, current membership and MFA. Never cache a staff client or trust editable user_metadata for roles.

Database predicates independently require aal2, an active auth.sessions row identified by the JWT session_id, and current staff_members permissions. A disabled role or revoked session therefore loses access with an existing JWT. Enrollment/password setup can read only the caller's current membership at aal1.

| Role   | Allowed operations                                                              |
| ------ | ------------------------------------------------------------------------------- |
| Admin  | Content read/write/publish, enquiries, public settings, staff access, audit log |
| Editor | Content read, create/edit drafts; no publishing or editing published records    |
| Sales  | Enquiry read; update status/internal notes; private reference-file download     |

Column grants prevent ordinary staff from altering IDs/timestamps or customer identity. Staff changes use a restricted RPC which rechecks the calling administrator and disallows modifying their own access. Cookies require same-origin writes; authenticated Bearer access is supported for APIs.

The server secret is isolated in server-only modules. Exceptions to user-scoped access are tightly scoped: validated public intake/rate limits/attachment linking, staff Auth provisioning after administrator authorization, and outbox delivery. Staff catalogue/enquiry operations always carry the caller's JWT.

## Database and files

Public schema: staff_members, brands, categories, products, blog_articles, resources, pages, settings, enquiries, audit_events. All have RLS and explicit grants. backend_private contains permission helpers, request_limits and notification_jobs. Its two operational tables intentionally have no ordinary-user policies. Security-definer helpers have a fixed search_path and restricted execution privileges; public RPC wrappers are security invoker.

Products reference one brand and one category; category parents form a checked acyclic hierarchy. Product images/datasheet and resource file URLs reference uploaded files. This implementation does not include the earlier proposed many-to-many application/resource graph. Active migrations are the schema authority; CMS_DATA_ARCHITECTURE.md contains historical design proposals.

Storage buckets are private: images (5 MB), documents (16 MB PDF) and enquiry-attachments (3 MB PDF/PNG/JPEG/WebP). Staff media uploads use their own UUID folder. Public media access is granted only when a published record references that exact object; /api/media issues short-lived URLs. Private enquiry downloads require enquiry permission and use short-lived forced-download links. File type checks are not antivirus scanning.

## Enquiry and email flow

All six public forms use one submission helper. It retains a submission UUID across an ambiguous retry; the database accepts the key once, and identical retries reuse the original receipt. A changed payload with the same key returns a conflict. The API constructs allowed fields, validates size/origin and consumes a shared HMAC-keyed Postgres rate counter before inserting. Customers have no direct enquiry INSERT or SELECT grant.

A database trigger queues a notification in the same transaction as the lead. Resend delivery is optional; failure never reverses an accepted lead. Jobs use leases, bounded retries and provider idempotency keys. A protected daily Vercel cron retries queued jobs. Delivery is at-least-once in failure scenarios; provider deduplication has a limited time window.

Reference files are uploaded after receipt confirmation using a ten-minute signed token scoped to that receipt. Byte/type/size checks, per-IP limits and a configurable global daily upload budget bound public storage use. A failed file upload clearly reports that the enquiry itself is saved. Files and metadata use deterministic hashes and cannot be replaced by sales.

Audit events record actor, operation, table, record ID and time. They are append-only for application staff and avoid copying customer message bodies. They are not a full compliance audit product.

## Verification

Tests cover API guards and failures, actual grants/RLS in embedded PostgreSQL, signed upload tokens, byte limits, retries and honest product presentation. The explicit live test exercises actual Auth, TOTP, SSR cookies, HTTP routes, Data API policies and Storage, with disposable fixtures and cleanup. Production hosting and real email delivery require separate deployment/provider verification.
