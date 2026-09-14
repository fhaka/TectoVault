# TectoVault — API (FastAPI backend)

Public form endpoints (contact/quote/careers) and an admin API (auth, leads, quotes, messages,
applications). See the repo root `README.md` for the full picture.

## Getting started

```bash
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # set DATABASE_URL to a real Postgres instance
alembic upgrade head
python -m scripts.seed_admin   # creates/updates the admin user from FIRST_ADMIN_EMAIL/PASSWORD in .env
uvicorn app.main:app --reload --port 8000
```

Interactive docs at http://localhost:8000/docs (disabled when `ENVIRONMENT=production`).

## Project structure

```
app/
  core/            Settings, DB engine/session, logging + audit log, rate limiter
  models/          SQLAlchemy models (User, Lead, ContactRequest, QuoteRequest, JobApplication)
  schemas/         Pydantic request/response shapes (public + admin)
  auth/            Password hashing, JWT issue/decode, get_current_user dependency
  services/        Email sending (Resend, no-op if unconfigured), lead creation
  api/v1/          Route modules: auth, public (contact/quotes/careers), admin
alembic/           Migrations
scripts/           seed_admin.py — idempotent first-admin-user creation
```

## Data model

Every contact or quote submission also creates a `Lead` row — a unified pipeline view so the
admin has one place to track a prospect regardless of which form they came through, while the
original submission (with its full detail) stays in its own table. Job applications are tracked
separately with their own status pipeline (new → reviewed/contacted → rejected/hired).

## Design decisions worth knowing

- **Persist first, email second.** Every public endpoint writes to the database *before*
  attempting to send a notification email (via a `BackgroundTasks` job). A failed or unconfigured
  email provider (`RESEND_API_KEY` unset) never loses a submission — it just logs instead of
  sending.
- **Honeypot spam protection.** Each public schema includes a hidden `website` field real users
  never fill in. A non-empty value gets a normal `200 {"ok": true}` response (so a bot learns
  nothing) but is silently dropped — never persisted or emailed.
- **Rate limiting.** All three public endpoints are limited to 5 requests/minute per IP
  (`slowapi`) — protects against basic abuse without needing infrastructure like Cloudflare.
- **Generic auth errors.** `/auth/login` returns the same "Incorrect email or password" message
  whether the email doesn't exist or the password is wrong, so failed attempts can't be used to
  enumerate valid accounts.
- **Audit logging.** Admin actions that change state (status updates) are logged as structured
  log lines (`app/core/logging.py`) rather than a dedicated database table — a deliberate
  scope-reduction for this phase; promoting these to a table later is a small, additive change.
- **Errors never leak internals.** Both validation errors and unhandled exceptions are caught by
  handlers in `app/main.py` that return a clean, consistent shape — no stack traces or raw
  Pydantic internals reach the client.

## Running tests / trying the API by hand

```bash
curl http://localhost:8000/health

curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@tectovault.example","password":"ChangeMe123!"}'

curl -X POST http://localhost:8000/api/v1/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","message":"Hello there, at least ten chars.","website":""}'
```

## What's not yet built

See the root README's "What's not yet built" section — file storage for attachments/CVs,
Turnstile-grade spam protection, and a content CMS are all deliberately out of scope for this
phase.
