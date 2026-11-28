# Website QA fixes and remaining launch work

Review date: 29 November 2026, Asia/Kolkata.

The catalogue and enquiry backend is connected. This change addresses the code defects from the public and authenticated admin review. Real business content and an email provider are still required before a complete catalogue launch. Existing draft records were kept unpublished.

## Public website fixes

| Review items | Result                                                                                                                                                                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| QA-01, QA-05 | Empty catalogue and document-library states explain availability and offer an enquiry route. Approved products, categories and PDFs still need to be supplied and published.                                                                |
| QA-02, QA-03 | The general quote selector uses published Supabase catalogue records and stable product slugs. It starts without a selected product or quantity. Category filters are explicitly separate from requested items.                             |
| QA-04        | Contact details come from public settings, including business hours. Missing details are hidden and the enquiry form remains available. Contact email format is validated.                                                                  |
| QA-06, QA-07 | Unfinished leadership/photo placeholders are hidden. About brand cards use published brands, so unpublished brand destinations are not linked. Approved images and leadership copy can be added through managed pages.                      |
| QA-08, QA-09 | Hero actions use real product/resource routes. Missing official-brand URLs are hidden and brand product links apply the brand filter. Download and request wording follows file availability.                                               |
| QA-10, QA-11 | Canonicals use the configured origin, duplicate title branding is removed, sitemap output avoids an extra route cache and is explicitly invalidated by content changes. The CMS cache version was refreshed to discard obsolete build data. |
| QA-12        | Quote and catalogue dialogs move focus inside, trap Tab, make background content inert, close with Escape and return focus to the opener.                                                                                                   |
| QA-13, QA-14 | Collapsed FAQ answers are semantically hidden. Model search, quantities and removal controls have accessible names.                                                                                                                         |
| QA-15        | Search distinguishes loading, failure and an actual empty result, and discards responses for cancelled searches.                                                                                                                            |
| QA-16, QA-17 | Customer copy replaces CMS instructions. Hero slides advance manually and inactive slide actions are inert; reduced-motion preferences disable their transition.                                                                            |
| QA-18        | Empty states distinguish unavailable inventory from filtered results. Contact and quote/catalogue confirmations show the saved enquiry reference.                                                                                           |

## Admin fixes

| Review items       | Result                                                                                                                                                                                                                                             |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ADMIN-01           | Dirty forms require confirmation before Close editor, opening another record or following a navigation link; unloading the page also prompts. Failed saves preserve entered values.                                                                |
| ADMIN-02, ADMIN-03 | Narrow headers use module titles with constrained account controls. Closed mobile navigation is hidden from focus and accessibility tools; the toggle exposes its state and Escape closes the drawer.                                              |
| ADMIN-04           | Files are selected locally and uploaded only during Save. Cancelling an unsaved form therefore creates no storage object. Failed saves attempt restricted cleanup of the caller's own unreferenced uploads; reference-check failures stop cleanup. |
| UI-01              | Settings use named fields and simple specifications use key/value controls. An advanced JSON view remains for complex data and recovery.                                                                                                           |
| UI-02              | Saved records have private staff previews. Uploaded images have thumbnails and PDF links use the authenticated media endpoint.                                                                                                                     |
| UI-03, UI-04       | Dashboard totals distinguish published content and drafts, show launch checks and display record identity and staff actor information in recent changes.                                                                                           |
| UI-05, UI-06       | Validation errors identify affected fields and focus them after saving stops. Upload/save progress is distinct, and prototype browser titles are removed.                                                                                          |
| SRC-01             | Public favicon and social-image settings are connected to metadata. The default favicon was moved to public assets so file-based metadata cannot override the configured icon.                                                                     |

The cleanup API requires active staff membership, the appropriate content permission, MFA and same-origin protection. Its privileged client is used only for bounded reference checks and storage cleanup; normal staff content writes still use the staff user's session and RLS. Referenced files are retained, including references from drafts and settings.

## Verification

- 65 backend, configuration, workflow and database-policy tests pass, including cleanup authorization, preservation of referenced media and failure handling.
- Six server-rendered UI regression tests cover catalogue options/default selections, contact settings/fallbacks, About links/placeholders and structured settings controls.
- Production build, lint and TypeScript checks pass.
- The local production smoke suite passed 34 checks without creating enquiries or sending email.
- Browser checks confirmed empty quote selection, dialog focus/Tab/Escape/return focus, FAQ semantic visibility, brand destinations, search loading then results, manual hero navigation and a 390-pixel phone viewport without horizontal document overflow.

Separate editor/sales production accounts, real published product/PDF journeys, delivered email, physical devices and other browsers require further acceptance checks. Production admin checks after deployment are recorded separately in the local QA evidence.

## Remaining owner actions

1. Supply and approve the real catalogue, specifications, product images and PDFs. Publish approved brands/categories and then their products/resources. Do not publish placeholder records to fill an empty page.
2. Enter the public company email, phone, address and business hours in Settings and publish the settings group. Supply approved leadership/company content if that section is wanted.
3. Set up an email provider and verified sender. For the existing Resend integration, configure `RESEND_API_KEY`, `RESEND_FROM_EMAIL` and `NOTIFICATION_EMAIL` in production. The durable enquiry inbox works without these; email delivery remains pending. Follow [backend setup](BACKEND_SETUP.md).
4. Enable Supabase leaked-password protection where the project plan supports it. The connected database tools do not expose Auth configuration changes. See [Supabase password security](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection).
5. Replace the authenticator setup secret previously shared in chat if it is still active. The account owner must perform credential/MFA changes; no password, factor or staff permission was changed by these fixes.

The framing-hardening item OPS-02 is implemented with `frame-ancestors 'none'`, `X-Frame-Options: DENY`, `nosniff`, referrer and permissions policies. This is a limited CSP; it does not claim nonce-based script protection.
