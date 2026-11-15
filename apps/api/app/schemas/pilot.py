import uuid
from datetime import datetime

from pydantic import BaseModel, Field

from app.models.enums import PilotStatus


class PilotAvailability(BaseModel):
    total: int
    taken: int
    left: int
    open: bool


class PilotOut(BaseModel):
    id: uuid.UUID
    quote_request_id: uuid.UUID | None
    name: str
    email: str
    company: str | None
    phone: str | None
    status: PilotStatus
    started_at: datetime | None
    notes: str | None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class PilotUpdate(BaseModel):
    status: PilotStatus | None = None
    notes: str | None = Field(default=None, max_length=5000)
    started_at: datetime | None = None
