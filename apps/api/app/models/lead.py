import uuid
from datetime import datetime

from sqlalchemy import DateTime, Enum, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.core.database import Base
from app.models.enums import LeadSource, LeadStatus


class Lead(Base):
    """Unified CRM pipeline row. Created automatically alongside every
    contact_request and quote_request submission, so the admin has one place
    (Leads) to track and move a prospect through the pipeline, while the
    original submission (with its full detail) stays in its own table.
    """

    __tablename__ = "leads"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    company: Mapped[str | None] = mapped_column(String(255), nullable=True)
    source: Mapped[LeadSource] = mapped_column(Enum(LeadSource, name="lead_source"), nullable=False)
    service: Mapped[str | None] = mapped_column(String(100), nullable=True)
    budget: Mapped[str | None] = mapped_column(String(50), nullable=True)
    status: Mapped[LeadStatus] = mapped_column(
        Enum(LeadStatus, name="lead_status"), default=LeadStatus.NEW, nullable=False
    )
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    contact_request_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("contact_requests.id"), nullable=True
    )
    quote_request_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("quote_requests.id"), nullable=True
    )

    contact_request: Mapped["ContactRequest | None"] = relationship(back_populates="lead")
    quote_request: Mapped["QuoteRequest | None"] = relationship(back_populates="lead")
