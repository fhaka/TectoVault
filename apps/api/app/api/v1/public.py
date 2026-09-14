from fastapi import APIRouter, BackgroundTasks, Depends, Request
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.logging import logger
from app.core.rate_limit import limiter
from app.models.contact_request import ContactRequest
from app.models.job_application import JobApplication
from app.models.quote_request import QuoteRequest
from app.schemas.public import (
    ContactCreate,
    JobApplicationCreate,
    QuoteCreate,
    SubmissionAck,
)
from app.services import email
from app.services.leads import create_lead_from_contact, create_lead_from_quote

router = APIRouter(tags=["public"])


@router.post("/contact", response_model=SubmissionAck)
@limiter.limit("5/minute")
def submit_contact(
    request: Request,
    payload: ContactCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
) -> SubmissionAck:
    if payload.website:
        logger.info("Honeypot triggered on /contact — ignoring silently")
        return SubmissionAck()

    contact = ContactRequest(name=payload.name, email=payload.email, company=payload.company, message=payload.message)
    db.add(contact)
    db.flush()  # assigns contact.id without committing yet
    create_lead_from_contact(db, contact)
    db.commit()

    # Submission is safely persisted before we ever touch email — a failed
    # send (see services/email.py) can never lose the lead.
    background_tasks.add_task(email.notify_new_contact, contact.name, contact.email, contact.message)

    return SubmissionAck()


@router.post("/quotes", response_model=SubmissionAck)
@limiter.limit("5/minute")
def submit_quote(
    request: Request,
    payload: QuoteCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
) -> SubmissionAck:
    if payload.website:
        logger.info("Honeypot triggered on /quotes — ignoring silently")
        return SubmissionAck()

    quote = QuoteRequest(
        project_type=payload.project_type,
        description=payload.description,
        budget=payload.budget,
        timeline=payload.timeline,
        name=payload.name,
        email=payload.email,
        company=payload.company,
        phone=payload.phone,
        company_website=payload.company_website,
        attachments=payload.attachments or None,
    )
    db.add(quote)
    db.flush()
    create_lead_from_quote(db, quote)
    db.commit()

    background_tasks.add_task(email.notify_new_quote, quote.name, quote.email, quote.project_type)

    return SubmissionAck()


@router.post("/careers/applications", response_model=SubmissionAck)
@limiter.limit("5/minute")
def submit_application(
    request: Request,
    payload: JobApplicationCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
) -> SubmissionAck:
    if payload.website:
        logger.info("Honeypot triggered on /careers/applications — ignoring silently")
        return SubmissionAck()

    application = JobApplication(
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        linkedin=payload.linkedin,
        portfolio=payload.portfolio,
        cover_letter=payload.cover_letter,
        cv_filename=payload.cv_filename,
        job_slug=payload.job_slug,
    )
    db.add(application)
    db.commit()

    background_tasks.add_task(email.notify_new_application, application.name, application.email)

    return SubmissionAck()
