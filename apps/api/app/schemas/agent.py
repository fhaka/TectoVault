import uuid
from datetime import datetime
from typing import Literal

from pydantic import BaseModel, EmailStr, Field


class ChatMessageIn(BaseModel):
    role: Literal["user", "assistant", "event"]
    content: str = Field(min_length=1, max_length=8000)


class ChatContactIn(BaseModel):
    name: str = Field(min_length=2, max_length=255)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=50)


class ChatTurnIn(BaseModel):
    """One exchange in a conversation, sent by the website's server."""

    conversation_id: uuid.UUID
    locale: Literal["en", "sq"] = "en"
    page: str | None = Field(default=None, max_length=255)
    provider: str | None = Field(default=None, max_length=100)
    messages: list[ChatMessageIn] = Field(default_factory=list, max_length=10)
    contact: ChatContactIn | None = None


class ChatMessageOut(BaseModel):
    role: str
    content: str
    created_at: datetime

    model_config = {"from_attributes": True}


class ChatSummaryOut(BaseModel):
    id: uuid.UUID
    locale: str
    page: str | None
    provider: str | None
    message_count: int
    contact_name: str | None
    contact_email: str | None
    contact_phone: str | None
    started_at: datetime
    last_message_at: datetime
    preview: str | None = None

    model_config = {"from_attributes": True}


class ChatDetailOut(ChatSummaryOut):
    messages: list[ChatMessageOut]
