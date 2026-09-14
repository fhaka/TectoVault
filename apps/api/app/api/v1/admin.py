import uuid

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.core.database import get_db
from app.core.logging import audit
from app.models.contact_request import ContactRequest
from app.models.enums import ApplicationStatus, LeadStatus
from app.models.job_application import JobApplication
from app.models.lead import Lead
from app.models.quote_request import QuoteRequest
from app.models.user import User
from app.schemas.admin import ApplicationStatusUpdate, DashboardSummary, LeadOut, LeadStatusUpdate
from app.schemas.public import ContactOut, JobApplicationOut, QuoteOut

router = APIRouter(prefix="/admin", tags=["admin"], dependencies=[Depends(get_current_user)])


@router.get("/dashboard", response_model=DashboardSummary)
def dashboard(db: Session = Depends(get_db)) -> DashboardSummary:
    new_leads = db.scalar(select(func.count()).select_from(Lead).where(Lead.status == LeadStatus.NEW)) or 0
    open_quote_requests = db.scalar(select(func.count()).select_from(QuoteRequest)) or 0
    total_contact_messages = db.scalar(select(func.count()).select_from(ContactRequest)) or 0
    new_applications = (
        db.scalar(
            select(func.count()).select_from(JobApplication).where(JobApplication.status == ApplicationStatus.NEW)
        )
        or 0
    )
    recent_leads = db.scalars(select(Lead).order_by(Lead.created_at.desc()).limit(5)).all()

    return DashboardSummary(
        new_leads=new_leads,
        open_quote_requests=open_quote_requests,
        total_contact_messages=total_contact_messages,
        new_applications=new_applications,
        recent_leads=list(recent_leads),
    )


@router.get("/leads", response_model=list[LeadOut])
def list_leads(
    status_filter: LeadStatus | None = Query(default=None, alias="status"),
    limit: int = Query(default=50, le=200),
    offset: int = 0,
    db: Session = Depends(get_db),
) -> list[Lead]:
    query = select(Lead).order_by(Lead.created_at.desc())
    if status_filter:
        query = query.where(Lead.status == status_filter)
    return list(db.scalars(query.limit(limit).offset(offset)).all())


@router.patch("/leads/{lead_id}", response_model=LeadOut)
def update_lead_status(
    lead_id: uuid.UUID,
    payload: LeadStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Lead:
    lead = db.get(Lead, lead_id)
    if lead is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lead not found")

    lead.status = payload.status
    db.commit()
    db.refresh(lead)

    audit("lead_status_update", actor=current_user.email, lead_id=str(lead_id), new_status=payload.status.value)
    return lead


@router.get("/quotes", response_model=list[QuoteOut])
def list_quotes(limit: int = Query(default=50, le=200), offset: int = 0, db: Session = Depends(get_db)) -> list[QuoteRequest]:
    query = select(QuoteRequest).order_by(QuoteRequest.created_at.desc()).limit(limit).offset(offset)
    return list(db.scalars(query).all())


@router.get("/quotes/{quote_id}", response_model=QuoteOut)
def get_quote(quote_id: uuid.UUID, db: Session = Depends(get_db)) -> QuoteRequest:
    quote = db.get(QuoteRequest, quote_id)
    if quote is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Quote request not found")
    return quote


@router.get("/messages", response_model=list[ContactOut])
def list_messages(limit: int = Query(default=50, le=200), offset: int = 0, db: Session = Depends(get_db)) -> list[ContactRequest]:
    query = select(ContactRequest).order_by(ContactRequest.created_at.desc()).limit(limit).offset(offset)
    return list(db.scalars(query).all())


@router.get("/messages/{message_id}", response_model=ContactOut)
def get_message(message_id: uuid.UUID, db: Session = Depends(get_db)) -> ContactRequest:
    message = db.get(ContactRequest, message_id)
    if message is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Message not found")
    return message


@router.get("/applications", response_model=list[JobApplicationOut])
def list_applications(
    status_filter: ApplicationStatus | None = Query(default=None, alias="status"),
    limit: int = Query(default=50, le=200),
    offset: int = 0,
    db: Session = Depends(get_db),
) -> list[JobApplication]:
    query = select(JobApplication).order_by(JobApplication.created_at.desc())
    if status_filter:
        query = query.where(JobApplication.status == status_filter)
    return list(db.scalars(query.limit(limit).offset(offset)).all())


@router.patch("/applications/{application_id}", response_model=JobApplicationOut)
def update_application_status(
    application_id: uuid.UUID,
    payload: ApplicationStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> JobApplication:
    application = db.get(JobApplication, application_id)
    if application is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Application not found")

    application.status = payload.status
    db.commit()
    db.refresh(application)

    audit(
        "application_status_update",
        actor=current_user.email,
        application_id=str(application_id),
        new_status=payload.status.value,
    )
    return application
