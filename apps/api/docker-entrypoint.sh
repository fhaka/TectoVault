#!/bin/sh
set -e

# Apply any pending migrations before the API starts serving traffic — this
# is what gives docker-compose "just works" parity with a manually-run
# `alembic upgrade head`. Safe to run on every container start: a database
# already at head is a no-op.
echo "Running database migrations..."
alembic upgrade head

# Create the first admin user if it doesn't exist yet. On later starts the
# existing password is left alone, so a redeploy never resets it. To reset
# the password on purpose, also set ADMIN_PASSWORD_RESET=1 for one deploy
# (then remove it again).
if [ -n "$FIRST_ADMIN_EMAIL" ] && [ -n "$FIRST_ADMIN_PASSWORD" ]; then
  if [ "$ADMIN_PASSWORD_RESET" = "1" ]; then
    echo "Resetting admin password (ADMIN_PASSWORD_RESET=1)..."
    python -m scripts.seed_admin
  else
    echo "Ensuring admin user exists..."
    python -m scripts.seed_admin --create-only
  fi
fi

exec "$@"
