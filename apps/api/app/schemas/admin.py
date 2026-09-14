import uuid
from datetime import datetime

from pydantic import BaseModel

from app.models.enums import ApplicationStatus, LeadSource, LeadStatus


class LeadOut(BaseModel):
    id: uuid.UUID
    name: str
    email: str
    company: str | None
    source: LeadSource
    service: str | None
    budget: str | None
    status: LeadStatus
    created_at: datetime
    updated_at: datetime
    contact_request_id: uuid.UUID | None
    quote_request_id: uuid.UUID | None

    model_config = {"from_attributes": True}


class LeadStatusUpdate(BaseModel):
    status: LeadStatus


class ApplicationStatusUpdate(BaseModel):
    status: ApplicationStatus


class DashboardSummary(BaseModel):
    new_leads: int
    open_quote_requests: int
    total_contact_messages: int
    new_applications: int
    recent_leads: list[LeadOut]
