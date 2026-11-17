"""Work the API does every time it starts, whatever way it is run (Docker
image, Render "Python" service, plain uvicorn):

1. Apply database migrations, so new tables always exist.
2. Make sure the admin account exists (from FIRST_ADMIN_EMAIL /
   FIRST_ADMIN_PASSWORD). An existing password is only changed when
   ADMIN_PASSWORD_RESET=1, so a normal redeploy never resets it.

Both steps log clearly what they did, so problems show up in the host's logs.
"""

from pathlib import Path

from alembic import command
from alembic.config import Config
from sqlalchemy import select

from app.auth.security import hash_password
from app.core.config import get_settings
from app.core.database import SessionLocal
from app.core.logging import logger
from app.models.user import User

API_ROOT = Path(__file__).resolve().parents[2]


def run_migrations() -> None:
    # No ini file on purpose: alembic's env.py would otherwise reconfigure
    # (and silence) the app's loggers. The database URL comes from settings.
    cfg = Config()
    cfg.set_main_option("script_location", str(API_ROOT / "alembic"))
    logger.info("Startup: applying database migrations")
    command.upgrade(cfg, "head")
    logger.info("Startup: database schema is up to date")


def ensure_admin() -> None:
    settings = get_settings()
    email = (settings.first_admin_email or "").lower()
    password = settings.first_admin_password
    if not email or not password:
        logger.info("Startup: FIRST_ADMIN_EMAIL/FIRST_ADMIN_PASSWORD not set, admin account left as is")
        return

    db = SessionLocal()
    try:
        user = db.scalar(select(User).where(User.email == email))
        if user is None:
            db.add(User(email=email, name="Admin", hashed_password=hash_password(password)))
            db.commit()
            logger.info("Startup: created admin account %s", email)
        elif settings.admin_password_reset:
            user.hashed_password = hash_password(password)
            user.is_active = True
            db.commit()
            logger.info("Startup: admin password RESET for %s (remove ADMIN_PASSWORD_RESET now)", email)
        else:
            logger.info(
                "Startup: admin account %s exists, password unchanged (set ADMIN_PASSWORD_RESET=1 to reset it)",
                email,
            )
        others = db.scalars(select(User.email).where(User.email != email)).all()
        if others:
            logger.info("Startup: other admin accounts in the database: %s", ", ".join(others))
    finally:
        db.close()


def on_startup() -> None:
    try:
        run_migrations()
    except Exception:
        logger.exception("Startup: database migrations FAILED")
        raise
    try:
        ensure_admin()
    except Exception:
        # Never keep the API down because of the admin account.
        logger.exception("Startup: could not check the admin account")
