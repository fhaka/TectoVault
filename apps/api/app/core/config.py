from functools import lru_cache

from pydantic import EmailStr
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Central app configuration, populated from environment variables / .env.

    Nothing here has a hard-coded secret default that would be safe to ship —
    SECRET_KEY in particular must be overridden in every real environment.
    """

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # App
    environment: str = "development"
    api_v1_prefix: str = "/api/v1"
    project_name: str = "TectoVault API"

    # Security
    secret_key: str = "dev-only-insecure-secret-change-me"
    access_token_expire_minutes: int = 60 * 24  # 24h — admin session length
    algorithm: str = "HS256"

    # Database
    database_url: str = "postgresql+psycopg://tectovault:tectovault_dev_password@localhost:5432/tectovault_db"

    # CORS — the origin(s) the Next.js frontend is served from
    cors_origins: str = "http://localhost:3000,http://localhost:3100"

    # Email (Resend). If resend_api_key is empty, emails are logged instead of sent —
    # this keeps the app fully functional in dev / before the account is set up,
    # and submissions are never lost because of it (they're persisted first).
    resend_api_key: str = ""
    resend_from_email: str = "TectoVault <onboarding@resend.dev>"
    notification_email: str = "hello@example.com"

    # First admin user, used only by the seed script (scripts/seed_admin.py)
    first_admin_email: EmailStr | None = None
    first_admin_password: str | None = None

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
