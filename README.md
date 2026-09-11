# Micropipette Manufacturer

## Project Overview

B2B scientific laboratory product platform. Public UX prototypes already exist and are visual contracts for later migration.

## Current Status

# micropipette_manufacturer

Production frontend foundation is beginning. Phase 4 Admin/CMS UX is being completed in parallel under TL review; the supplied local register marks the included admin prototype modules approved. Reconcile that status with the context pack before admin work.

## Technology Stack

Next.js 16, React 19, strict TypeScript, App Router, npm, global CSS/design tokens and future CSS Modules. Inter is the body/interface font; Manrope is the heading font. Strapi, PostgreSQL and S3-compatible storage with CDN are later phases.

## Local Development

Use Node.js 24 LTS and npm (bootstrap validated with Node 24.17.0 and npm 11.13.0). Run from this repository's `frontend` directory:

```sh
npm install
npm run dev
```

Open http://localhost:3000. In Windows PowerShell, use `npm.cmd` if execution policy blocks `npm.ps1`.

```sh
npm run lint
npm run typecheck
npm run format:check
npm run build
npm run start
```

`typecheck` generates Next.js route types before strict checking, including on a fresh clone. `start` requires a successful build. Use `npm run format` to format source/configuration. Google font downloads require network access during build; fonts are then self-hosted by Next.js.

## Project Structure

```text
frontend/                   # Current local Git repository root
  public/                   # Existing starter assets, preserved
  src/
    app/                    # Minimal root layout and holding page
    styles/                 # Approved tokens and global baseline
  .env.example
  eslint.config.mjs
  next.config.ts
  package.json
  package-lock.json
  tsconfig.json
```

Create `components/{layout,navigation,ui,forms,media}`, `features/{products,brands,applications,resources,blog,enquiries}`, `lib/{cms,seo,validation}`, `config`, `hooks` and `types` under `src` when implementation needs them. No empty tracked scaffolding is required.

## Environment Variables

Optionally copy `.env.example` to `.env.local` in this directory. Blank variables are sufficient for Phase 0; no CMS is connected.

| Variable               | Purpose                                                                         |
| ---------------------- | ------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Public site URL, safe for browser exposure.                                     |
| `CMS_API_URL`          | Server/CMS endpoint for later integration.                                      |
| `CMS_API_TOKEN`        | Private server-side token; never expose in client code or with a public prefix. |

Never commit real environment files or credentials.

## Git Workflow

The Team Lead controls architecture, merges and production releases. Intended workflow: `feature/*` into `develop`, then approved production-ready changes into `main`. TL manages final Git actions and branch policy. Phase 0 performs no commits, pushes, merges, releases or repository permission changes.

The workspace parent is not currently a Git repository. The context pack and organized prototypes are sibling directories outside this repository. TL must decide their version-control placement.

## Source-of-Truth Rule

Read `../micropipette_codex_context_pack/AGENTS.md`, `CODEX_START_HERE.md` and its three `docs` files before implementation. The project operating contract applies alongside this repository's Next.js `AGENTS.md`.

The context pack's `docs/SOURCE_OF_TRUTH.md` still has unresolved filenames. `../organized file/SOURCE_OF_TRUTH.md` has an explicit approved-file register. TL must reconcile these before migration; do not guess or overwrite either register. These sibling references are local handoff material and are not included in a standalone frontend clone.

Approved prototypes must not be redesigned during migration. Preserve exact confirmed HTML and verify the latest source before each module.

## Current Development Phase

Phase 0: Repository & Development Environment Bootstrap. The root route is only a neutral holding page. No Homepage migration has started.

## Important Do-Not-Do Rules

- Do not modify approved public or Admin HTML, invent business claims, or redesign approved UI.
- Do not introduce Tailwind or a component library without approval.
- Do not implement CMS, APIs, authentication, enquiries, analytics, infrastructure or production hosting in Phase 0.
- Final Strapi schemas must wait for relevant Admin/CMS UX approval.
- Do not use broad substring selectors such as `[class*="card"]`.
- Do not proceed to another phase without TL review.
*Divyanshu*
