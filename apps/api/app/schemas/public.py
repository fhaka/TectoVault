import uuid
from datetime import datetime

from pydantic import BaseModel, EmailStr, Field, field_validator


class HoneypotMixin(BaseModel):
    # Hidden field real users never fill in; a non-empty value marks the
    # submission as spam. We still return 200 (so bots don't learn anything)
    # but skip persisting/emailing it — see each router.
    website: str = ""


class ContactCreate(HoneypotMixin):
    name: str = Field(min_length=2, max_length=255)
    email: EmailStr
    company: str | None = Field(default=None, max_length=255)
    message: str = Field(min_length=10, max_length=5000)


class ContactOut(BaseModel):
    id: uuid.UUID
    name: str
    email: EmailStr
    company: str | None
    message: str
    created_at: datetime

    model_config = {"from_attributes": True}


class QuoteCreate(HoneypotMixin):
    project_type: str = Field(min_length=1, max_length=50)
    description: str = Field(min_length=20, max_length=5000)
    budget: str = Field(min_length=1, max_length=50)
    timeline: str = Field(min_length=1, max_length=50)
    name: str = Field(min_length=2, max_length=255)
    email: EmailStr
    company: str | None = Field(default=None, max_length=255)
    phone: str | None = Field(default=None, max_length=50)
    company_website: str | None = Field(default=None, max_length=255)
    attachments: list[str] = Field(default_factory=list)

    @field_validator("attachments")
    @classmethod
    def limit_attachments(cls, value: list[str]) -> list[str]:
        if len(value) > 5:
            raise ValueError("A maximum of 5 attachments is allowed.")
        return value


class QuoteOut(BaseModel):
    id: uuid.UUID
    project_type: str
    description: str
    budget: str
    timeline: str
    name: str
    email: EmailStr
    company: str | None
    phone: str | None
    company_website: str | None
    attachments: list[str] | None
    created_at: datetime

    model_config = {"from_attributes": True}


class JobApplicationCreate(HoneypotMixin):
    name: str = Field(min_length=2, max_length=255)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=50)
    linkedin: str | None = Field(default=None, max_length=255)
    portfolio: str | None = Field(default=None, max_length=255)
    cover_letter: str | None = Field(default=None, max_length=5000)
    cv_filename: str | None = Field(default=None, max_length=255)
    job_slug: str | None = Field(default=None, max_length=255)


class JobApplicationOut(BaseModel):
    id: uuid.UUID
    name: str
    email: EmailStr
    phone: str | None
    linkedin: str | None
    portfolio: str | None
    cover_letter: str | None
    cv_filename: str | None
    job_slug: str | None
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}


class SubmissionAck(BaseModel):
    ok: bool = True
