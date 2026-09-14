#!/bin/sh
set -e

# Apply any pending migrations before the API starts serving traffic — this
# is what gives docker-compose "just works" parity with a manually-run
# `alembic upgrade head`. Safe to run on every container start: a database
# already at head is a no-op.
echo "Running database migrations..."
alembic upgrade head

# Optionally seed the first admin user (idempotent — see scripts/seed_admin.py,
# it updates the existing user if one already exists). Only runs when both
# FIRST_ADMIN_EMAIL and FIRST_ADMIN_PASSWORD are set, which they are by
# default in docker-compose.yml for local dev; leave them unset in
# production once the real admin account exists.
if [ -n "$FIRST_ADMIN_EMAIL" ] && [ -n "$FIRST_ADMIN_PASSWORD" ]; then
  echo "Seeding admin user..."
  python -m scripts.seed_admin
fi

exec "$@"
