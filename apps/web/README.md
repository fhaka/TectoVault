# TectoVault — Web (Next.js frontend)

The marketing site and `/admin` panel. See the repo root `README.md` for the full picture
(architecture, Docker, what's real vs. placeholder). This file covers just this app.

## Getting started

```bash
npm install
cp .env.example .env.local   # API_BASE_URL defaults to http://localhost:8000
npm run dev
```

Open http://localhost:3000. The FastAPI backend (`../api`) needs to be running for the contact/
quote/careers forms and the `/admin` panel to work — see `../api/README.md`.

To build for production:

```bash
npm run build
npm run start
```

## Project structure

```
app/
  (marketing)/       Public site routes — has its own layout (header + footer)
  admin/
    login/           Public login page
    (protected)/     Everything behind auth: dashboard, leads, quotes, messages, applications
  api/               Route Handlers: contact/quote/careers (proxy to the backend),
                      admin/login, admin/logout
components/
  ui/                Design-system primitives (button, input, accordion, sheet, ...)
  layout/            Header, footer, nav
  sections/          Page-section building blocks (hero, services grid, final CTA, ...)
  forms/             Contact, request-quote, general application forms
  admin/             Admin panel UI (sidebar, status selects, logout button)
  shared/            Small reusable pieces (Reveal, Section, PageHero, ...)
content/             Structured content: services, solutions, industries, projects, blog, careers
lib/                 site-config, cn(), zod schemas, admin session/auth helpers
```

## Admin panel auth, briefly

- `POST /api/admin/login` calls the backend, then stores the returned JWT in an httpOnly cookie.
- `proxy.ts` (Next.js 16's replacement for `middleware.ts`) redirects unauthenticated visitors
  away from `/admin/*` based on cookie *presence* — it does not verify the JWT itself, since that
  would require shipping the backend's `SECRET_KEY` into the edge runtime.
- The real check happens in `app/admin/(protected)/layout.tsx`: every load calls the backend's
  `/auth/me` with the cookie's token. An expired/invalid token gets a 401 there and the layout
  redirects to `/admin/login`.
- Status updates (leads, applications) are Next.js Server Actions (`lib/admin-actions.ts`) that
  call the backend directly, server-side.

## Internationalization

The spec calls for `en` / `sq` / `it`. Content is English-only for now — introducing `next-intl`
routing (`/en`, `/sq`, `/it`) is best done once real Albanian/Italian copy exists.
