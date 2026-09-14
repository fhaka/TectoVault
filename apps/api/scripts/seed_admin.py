"""Create (or update the password of) the first admin user.

Usage:
    python -m scripts.seed_admin --email you@example.com --password "..." --name "Flori"

Or set FIRST_ADMIN_EMAIL / FIRST_ADMIN_PASSWORD in .env and run with no args.
There is no public sign-up endpoint by design — admin accounts are only ever
created this way, or later by an existing admin (not implemented yet).
"""

import argparse
import sys

from sqlalchemy import select

from app.auth.security import hash_password
from app.core.config import get_settings
from app.core.database import SessionLocal
from app.models.user import User


def main() -> None:
    settings = get_settings()

    parser = argparse.ArgumentParser()
    parser.add_argument("--email", default=settings.first_admin_email)
    parser.add_argument("--password", default=settings.first_admin_password)
    parser.add_argument("--name", default="Admin")
    args = parser.parse_args()

    if not args.email or not args.password:
        print(
            "Missing email/password. Pass --email/--password, or set "
            "FIRST_ADMIN_EMAIL/FIRST_ADMIN_PASSWORD in .env.",
            file=sys.stderr,
        )
        raise SystemExit(1)

    email = args.email.lower()
    db = SessionLocal()
    try:
        user = db.scalar(select(User).where(User.email == email))
        if user:
            user.hashed_password = hash_password(args.password)
            user.name = args.name
            action = "Updated"
        else:
            user = User(email=email, name=args.name, hashed_password=hash_password(args.password))
            db.add(user)
            action = "Created"
        db.commit()
        print(f"{action} admin user: {email}")
    finally:
        db.close()


if __name__ == "__main__":
    main()
