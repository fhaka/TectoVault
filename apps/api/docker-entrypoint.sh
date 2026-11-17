#!/bin/sh
set -e

# Apply any pending migrations before the API starts serving traffic — this
# is what gives docker-compose "just works" parity with a manually-run
# `alembic upgrade head`. Safe to run on every container start: a database
# already at head is a no-op.
echo "Running database migrations..."
alembic upgrade head

# The admin account (FIRST_ADMIN_EMAIL / FIRST_ADMIN_PASSWORD, and
# ADMIN_PASSWORD_RESET=1 to reset a password) is handled by the app itself at
# startup — see app/core/startup.py — so it works however the API is run.

exec "$@"
