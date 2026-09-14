# TectoVault — Website + Backend

A premium software-company website and its supporting backend: a Next.js 16 marketing site,
a FastAPI + PostgreSQL API for lead capture, and an admin panel for managing incoming leads,
quote requests, messages and job applications.

Built in two phases, per the master specification:

- **Frontend** (`apps/web`) — Next.js 16 App Router, TypeScript, Tailwind CSS v4, Radix UI,
  Framer Motion, React Hook Form + Zod. The full marketing site (home, services, solutions,
  industries, work, about, process, pricing, contact, request-a-quote, blog, careers, legal)
  plus the `/admin` panel.
- **Backend** (`apps/api`) — FastAPI, PostgreSQL, SQLAlchemy + Alembic, JWT auth. Persists
  contact/quote/careers submissions, tracks them as leads through a pipeline, sends email
  notifications (or logs them in dev), and serves the admin API.

## Project structure

```
apps/
  web/            Next.js frontend (marketing site + /admin panel)
  api/            FastAPI backend (public form endpoints + admin API)
docker-compose.yml
.env.example      Compose-level environment variables
```

See `apps/web/README.md` and `apps/api/README.md` for app-specific detail.

## Quickstart — Docker Compose (recommended)

Requires Docker with internet access (to pull `node:20-alpine`, `python:3.12-slim` and
`postgres:16-alpine`).

```bash
cp .env.example .env   # adjust if needed — the defaults work out of the box
docker compose up --build
```

This starts Postgres, runs migrations and seeds the first admin user automatically (see
`apps/api/docker-entrypoint.sh`), then starts the API and the site.

- Site: http://localhost:3000
- Admin panel: http://localhost:3000/admin (seeded credentials: see `FIRST_ADMIN_EMAIL` /
  `FIRST_ADMIN_PASSWORD` in `.env`, default `admin@tectovault.example` / `ChangeMe123!` — **change
  this before deploying anywhere real**)
- API docs: http://localhost:8000/docs (disabled when `ENVIRONMENT=production`)

> This compose setup is written and syntax-validated (`docker compose config`) but could not be
> fully build-tested in the sandbox this project was built in — that sandbox's network policy
> blocks pulling images from Docker Hub. It follows standard, well-tested patterns (multi-stage
> Next.js `standalone` build, slim Python image, healthchecked Postgres, entrypoint-run
> migrations) and should build cleanly wherever Docker Hub is reachable — but give it a first
> run and a look before relying on it.

## Quickstart — running each app natively (what this project was developed against)

**Backend:**

```bash
cd apps/api
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # set DATABASE_URL to a real Postgres instance
alembic upgrade head
python -m scripts.seed_admin   # creates/updates the admin user from .env
uvicorn app.main:app --reload --port 8000
```

**Frontend** (in a second terminal):

```bash
cd apps/web
npm install
cp .env.example .env.local   # API_BASE_URL defaults to http://localhost:8000
npm run dev
```

Open http://localhost:3000 for the site, http://localhost:3000/admin for the admin panel.

## What's real vs. placeholder

Per the content rules in the spec, nothing here fabricates clients, testimonials, team members,
statistics or results. Where real information isn't available yet:

- **Company details** (`apps/web/lib/site-config.ts`): email, phone, address and social links
  are bracketed placeholders (`[EMAIL]`, `[PHONE]`, etc.) — replace with real values in one place.
- **Case studies** (`apps/web/content/projects.ts`): four sample case studies, clearly labeled
  "Sample project" in the UI, demonstrate the case-study template. Replace with real projects
  (and set `isPlaceholder: false`) as they're completed.
- **Blog / Careers**: empty by design — honest "nothing yet" states rather than fake content.
- **Pricing**: no invented price points — the page explains what drives cost and routes to
  Request a Quote.
- **Testimonials**: omitted entirely rather than fabricated.
- **Admin account**: the seeded admin (`admin@tectovault.example` / `ChangeMe123!`) is a dev-only
  placeholder — replace it before any real deployment.

## How a form submission flows end to end

1. A visitor submits Contact, Request a Quote, or the careers application form.
2. React Hook Form + Zod validate client-side; the form posts JSON to a Next.js Route Handler
   (`app/api/contact`, `app/api/quote`, `app/api/careers`).
3. The Route Handler re-validates server-side, checks the honeypot field, and forwards the
   submission to the FastAPI backend (`POST /api/v1/contact` etc.) — the browser never talks to
   the backend directly.
4. FastAPI validates again (Pydantic), persists the submission (and, for contact/quote
   submissions, an associated `Lead` row for pipeline tracking), then queues a notification
   email in the background. **The submission is always persisted first** — a failed email send
   can never lose it.
5. A honeypot hit (a hidden field only a bot would fill in) gets a normal-looking success
   response but is never persisted or emailed.
6. The admin panel (`/admin`) reads and updates this data through the same backend, authenticated
   via a JWT stored in an httpOnly cookie.

## Admin panel

`/admin` — sign in, then:

- **Dashboard** — counts of new leads, quote requests, messages, applications, plus recent leads.
- **Leads** — every contact + quote submission in one pipeline, filterable by status, with an
  inline status selector (new → contacted → qualified → proposal → negotiation → won/lost).
- **Quote requests** — full detail view per request, including attachment filenames (see below).
- **Messages** — contact-form submissions.
- **Applications** — careers submissions, filterable by status, with inline status updates.

Authentication: the FastAPI backend issues a JWT on login; the Next.js `/api/admin/login` route
stores it in an httpOnly, secure-in-production cookie. `middleware.ts` (compiled to `proxy.ts` —
see note below) does a fast existence check on that cookie to redirect unauthenticated visitors;
the actual authorization check happens on every page load, server-side, against the FastAPI
`/auth/me` endpoint — an expired or forged token is rejected there and the page redirects to
`/admin/login`. The backend's `SECRET_KEY` is never exposed to the frontend.

Note: this project uses Next.js 16, where the `middleware.ts` convention has been renamed to
`proxy.ts` (same behavior, new file name) — already migrated here.

## What's not yet built

- **File storage** — quote attachments and CVs are validated client-side (type/size/count) and
  their filenames are recorded, but the files themselves aren't uploaded anywhere yet. Wiring
  S3 or Cloudflare R2 is a follow-up (the backend's `attachments`/`cv_filename` fields are
  already shaped for it).
- **Internationalization** — the spec calls for `en` / `sq` / `it`; content is English-only for
  now, since introducing `next-intl` routing is best done once real Albanian/Italian copy exists.
- **Content CMS** — services/solutions/industries/projects/blog/careers are still managed as
  structured content in `apps/web/content/*.ts`, not through the admin panel (there's no real
  content yet to justify building editing screens for them — see the phase-2 backend scope
  decision below).
- **Spam protection beyond the honeypot** — Cloudflare Turnstile (or equivalent) is a follow-up;
  the honeypot field is a reasonable first line of defense in the meantime.
- **Analytics + error monitoring** — Sentry / analytics wiring is a follow-up.
- **CI/CD + real hosting** — this repo has Docker + Compose for parity; actual deployment
  (registry, hosting, CI pipeline) is a follow-up.

This scope (core infra + lead capture + admin, no content CMS) was a deliberate choice made
when the backend phase started, since there's no real blog/case-study/careers content yet to
manage.
