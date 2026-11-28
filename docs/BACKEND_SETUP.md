# Backend connection and operations

## Connected project

The intended Supabase project is micropipette manufacturer (ref warmibzrbyjisbqcsvqf). Its public API origin is https://warmibzrbyjisbqcsvqf.supabase.co. URL/public key and server secret are stored locally in ignored .env.local; no secret belongs in this document or the repository. The project was initially empty of business tables and Auth users.

Applied migrations, in order:

1. 20261123190523_catalogue_backend.sql — business schema, roles/RLS, audit, shared limits, notification outbox and private storage.
2. 20261123194628_editorial_fields.sql — product features/applications, managed pages, private attachments, category cycles and exact storage policy correlations.
3. 20261123200158_session_membership_guard.sql — current-session checks for initial membership and staff authorization.

The older staff_foundation draft is preserved under supabase/reference and must not be applied. Do not edit already applied migrations or run database reset against this project. Create subsequent migrations with the Supabase CLI, review/test them, apply via the authorized database workflow and compare recorded migration versions. Backups/recovery, plan quotas and Auth settings remain the project owner's operational responsibility.

## Private configuration

Copy .env.example only on a fresh checkout. Keep existing .env.local intact. Required values:

| Variable                             | Purpose                                                                           |
| ------------------------------------ | --------------------------------------------------------------------------------- |
| NEXT_PUBLIC_SUPABASE_URL             | Project API origin                                                                |
| NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY | Public browser key; protected data still requires RLS                             |
| SUPABASE_SECRET_KEY                  | Server-only project key; never expose in client variables                         |
| NEXT_PUBLIC_SITE_URL                 | Local loopback origin for development; existing HTTPS Vercel origin in production |
| REVALIDATION_TOKEN                   | Private random Bearer token for cache refresh                                     |
| CRON_SECRET                          | Separate private random Bearer token for notification retry job                   |
| ENQUIRY_ATTACHMENT_DAILY_LIMIT       | Optional global upload budget, defaults to 10 per UTC day; range 1–1000           |
| NOTIFICATION_EMAIL                   | Private enquiry alert recipient                                                   |
| RESEND_API_KEY / RESEND_FROM_EMAIL   | Optional provider secret and verified plain sender email                          |

Legacy NEXT_PUBLIC_SUPABASE_ANON_KEY and SUPABASE_SERVICE_KEY are accepted. Never use the service role in frontend calls. Check configuration without revealing values:

```powershell
node scripts/check-backend.mjs --remote
# Production configuration also requires HTTPS origins:
node scripts/check-backend.mjs --remote --production
```

The remote check sends HEAD requests only. It verifies connectivity/columns, not policy correctness. npm test replays policy tests without live keys. Keep production and development/preview projects separate before adding real customer data; this initial project currently supports setup and disposable integration testing. Never copy real lead data into test fixtures.

## First administrator and recovery

Use the owner-approved administrator email; admin@example.com below is a placeholder. Bootstrap is trusted local setup, permitted only before an active admin exists:

```powershell
node scripts/bootstrap-staff.mjs admin@example.com
```

The script writes a one-time private link to .tmp/staff-onboarding.txt without sending email or printing tokens. The link uses NEXT_PUBLIC_SITE_URL, so the corresponding application must be running. Open it, confirm access, choose a password and enroll a TOTP authenticator. The link expires according to the project's Auth settings; regenerate it if needed:

```powershell
node scripts/bootstrap-staff.mjs --reissue admin@example.com
```

Other approved staff can be invited, enabled/disabled or assigned admin/editor/sales from /admin/staff. Their link is sensitive and should be delivered privately by the administrator. No shared default password exists. Password recovery preserves the MFA requirement; lost authenticators require trusted Supabase administrator intervention. Public signup does not grant staff membership; disable unused public signup in Supabase Auth settings as operational hardening.

## Content administration

Import the original source content as drafts with npm run content:import-drafts. Reruns preserve existing records by slug and do not overwrite staff edits. This imports source descriptions/technical values for review, not verified manufacturer data. No fake customer enquiry/review, invented specification, sample file or placeholder detail route is published.

Review each brand/category/product/article. Upload final PDFs and images using the CMS. Publish brands/categories before products so visitors can see the correct labels. Documents cannot be published without a file URL. Public settings manage identity/contact/SEO/catalogue links. Managed pages support title, summary, body paragraphs/headings, image and SEO; they do not constitute an arbitrary visual page builder. Final legal text and compliance claims must be approved by the business.

## Email and jobs

The enquiry recipient is configured privately with NOTIFICATION_EMAIL. No provider has been supplied, so notifications remain queued and the admin dashboard identifies delivery as pending. Configure a Resend account, verify the sender's domain, then set RESEND_API_KEY and RESEND_FROM_EMAIL privately. Supabase Auth SMTP is a separate configuration if automatic invitation/password recovery mail is desired; private onboarding links work without it.

vercel.json schedules /api/jobs/notifications daily at 08:00 UTC, authenticated with CRON_SECRET. New leads also attempt immediate delivery when configured. Up to ten queued jobs are claimed per cron request, with leases and up to five attempts per job. Configure monitoring and a higher retry frequency/appropriate hosting plan if enquiry volume or delivery expectations exceed that. No guarantee of exactly-once email delivery is made.

## Files, privacy and operations

Public enquiry files accept PDF/PNG/JPEG/WebP up to 3 MB and are stored privately. Global daily budget defaults to 10 uploads. Admin/sales receive short-lived download links; editors and anonymous users cannot read them. There is no antivirus service. Review storage quotas, orphan-file cleanup and retention before increasing limits. Images/documents are public only while referenced by published content; already issued signed URLs remain valid until their short expiry.

Set a business retention policy for leads, IP addresses, private files, queued jobs and audit records. Keep backups and restoration procedures appropriate to the purchased Supabase plan. Monitor rejected/failed intake, Auth failures, outbox backlog and quotas without logging tokens or enquiry bodies. Rate limiting mitigates common spam but is not a CAPTCHA/WAF. This is a single-organization staff CMS; no multi-tenant customer isolation feature is claimed.

## Existing Vercel deployment

Keep https://micropipette-manufacturer.vercel.app/. The logged-in CLI account rajuyadav03 currently cannot access its project. The owner is arranging access. Link that existing project when it becomes visible, set Production environment variables privately and deploy the tested revision. Do not create a replacement URL or publish secrets in Git/PRs/preview environments. Verify public routes, enquiry persistence and upload, sign-in/MFA, role permissions and private-cache headers after deployment. The GitHub branch can be reviewed before changing the live site.
