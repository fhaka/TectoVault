import uuid
from datetime import datetime

from sqlalchemy import DateTime, Enum, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func

from app.core.database import Base
from app.models.enums import ApplicationStatus


class JobApplication(Base):
    __tablename__ = "job_applications"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    phone: Mapped[str | None] = mapped_column(String(50), nullable=True)
    linkedin: Mapped[str | None] = mapped_column(String(255), nullable=True)
    portfolio: Mapped[str | None] = mapped_column(String(255), nullable=True)
    cover_letter: Mapped[str | None] = mapped_column(Text, nullable=True)
    cv_filename: Mapped[str | None] = mapped_column(String(255), nullable=True)

    # Slug of the job posting applied to, or null for a general application.
    # No FK to a `careers` table yet since that CMS table isn't part of this
    # pass (job postings still live in the frontend's content/careers.ts).
    job_slug: Mapped[str | None] = mapped_column(String(255), nullable=True)

    status: Mapped[ApplicationStatus] = mapped_column(
        Enum(ApplicationStatus, name="application_status"),
        default=ApplicationStatus.NEW,
        nullable=False,
    )
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
