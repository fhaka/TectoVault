import uuid
from datetime import datetime

from sqlalchemy import ARRAY, DateTime, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.core.database import Base


class QuoteRequest(Base):
    __tablename__ = "quote_requests"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    project_type: Mapped[str] = mapped_column(String(50), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    budget: Mapped[str] = mapped_column(String(50), nullable=False)
    timeline: Mapped[str] = mapped_column(String(50), nullable=False)

    name: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    company: Mapped[str | None] = mapped_column(String(255), nullable=True)
    phone: Mapped[str | None] = mapped_column(String(50), nullable=True)
    company_website: Mapped[str | None] = mapped_column(String(255), nullable=True)

    # File *names* only for now — actual upload storage (S3/R2) is a follow-up;
    # see README "What's next". Never silently dropped: names are always saved.
    attachments: Mapped[list[str] | None] = mapped_column(ARRAY(String), nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    lead: Mapped["Lead | None"] = relationship(back_populates="quote_request")
