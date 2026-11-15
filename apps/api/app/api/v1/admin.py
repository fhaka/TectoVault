import uuid
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.core.database import get_db
from app.core.logging import audit
from app.models.contact_request import ContactRequest
from app.models.agent_chat import AgentConversation, AgentMessage
from app.models.enums import ApplicationStatus, LeadStatus, PilotStatus
from app.models.job_application import JobApplication
from app.models.lead import Lead
from app.models.pilot import Pilot
from app.models.quote_request import QuoteRequest
from app.models.user import User
from app.schemas.admin import ApplicationStatusUpdate, DashboardSummary, LeadOut, LeadStatusUpdate
from app.schemas.agent import ChatDetailOut, ChatSummaryOut
from app.schemas.pilot import PilotOut, PilotUpdate
from app.schemas.public import ContactOut, JobApplicationOut, QuoteOut
from app.api.v1.public import pilot_availability_for

PILOT_DAYS = 30
ACTIVE_PILOT_STATUSES = (PilotStatus.SETTING_UP, PilotStatus.LIVE, PilotStatus.REVIEW)

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

    now = datetime.now(timezone.utc)
    chats_last_7_days = (
        db.scalar(
            select(func.count())
            .select_from(AgentConversation)
            .where(AgentConversation.started_at >= now - timedelta(days=7))
        )
        or 0
    )
    new_pilot_applications = (
        db.scalar(select(func.count()).select_from(Pilot).where(Pilot.status == PilotStatus.APPLIED)) or 0
    )
    active_pilots = (
        db.scalar(select(func.count()).select_from(Pilot).where(Pilot.status.in_(ACTIVE_PILOT_STATUSES))) or 0
    )
    pilots_review_due = (
        db.scalar(
            select(func.count())
            .select_from(Pilot)
            .where(
                (Pilot.status == PilotStatus.REVIEW)
                | (
                    (Pilot.status == PilotStatus.LIVE)
                    & (Pilot.started_at <= now - timedelta(days=PILOT_DAYS))
                )
            )
        )
        or 0
    )

    return DashboardSummary(
        new_leads=new_leads,
        open_quote_requests=open_quote_requests,
        total_contact_messages=total_contact_messages,
        new_applications=new_applications,
        recent_leads=list(recent_leads),
        chats_last_7_days=chats_last_7_days,
        new_pilot_applications=new_pilot_applications,
        active_pilots=active_pilots,
        pilots_review_due=pilots_review_due,
        pilot_places_left=pilot_availability_for(db).left,
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


# --- Pilot programme -------------------------------------------------------


@router.get("/pilots", response_model=list[PilotOut])
def list_pilots(
    status_filter: PilotStatus | None = Query(default=None, alias="status"),
    db: Session = Depends(get_db),
) -> list[Pilot]:
    query = select(Pilot).order_by(Pilot.created_at.desc())
    if status_filter:
        query = query.where(Pilot.status == status_filter)
    return list(db.scalars(query.limit(200)).all())


@router.patch("/pilots/{pilot_id}", response_model=PilotOut)
def update_pilot(
    pilot_id: uuid.UUID,
    payload: PilotUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Pilot:
    pilot = db.get(Pilot, pilot_id)
    if pilot is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pilot not found")

    fields = payload.model_fields_set
    if "status" in fields and payload.status is not None:
        pilot.status = payload.status
        # The 30 days start the first time the agent goes live.
        if payload.status == PilotStatus.LIVE and pilot.started_at is None:
            pilot.started_at = datetime.now(timezone.utc)
    if "started_at" in fields:
        pilot.started_at = payload.started_at
    if "notes" in fields:
        pilot.notes = payload.notes or None

    db.commit()
    db.refresh(pilot)
    audit(
        "pilot_update",
        actor=current_user.email,
        pilot_id=str(pilot_id),
        new_status=pilot.status.value,
    )
    return pilot


# --- AI agent conversations -----------------------------------------------


def _with_previews(db: Session, conversations: list[AgentConversation]) -> list[ChatSummaryOut]:
    ids = [c.id for c in conversations]
    previews: dict[uuid.UUID, str] = {}
    if ids:
        rows = db.execute(
            select(AgentMessage.conversation_id, AgentMessage.content)
            .where(AgentMessage.conversation_id.in_(ids), AgentMessage.role == "user")
            .order_by(AgentMessage.conversation_id, AgentMessage.position)
            .distinct(AgentMessage.conversation_id)
        ).all()
        previews = {row[0]: row[1][:160] for row in rows}
    out = []
    for c in conversations:
        item = ChatSummaryOut.model_validate(c)
        item.preview = previews.get(c.id)
        out.append(item)
    return out


@router.get("/chats", response_model=list[ChatSummaryOut])
def list_chats(
    with_contact: bool = False,
    limit: int = Query(default=50, le=200),
    offset: int = 0,
    db: Session = Depends(get_db),
) -> list[ChatSummaryOut]:
    query = select(AgentConversation).order_by(AgentConversation.last_message_at.desc())
    if with_contact:
        query = query.where(AgentConversation.contact_email.is_not(None))
    conversations = list(db.scalars(query.limit(limit).offset(offset)).all())
    return _with_previews(db, conversations)


@router.get("/chats/{conversation_id}", response_model=ChatDetailOut)
def get_chat(conversation_id: uuid.UUID, db: Session = Depends(get_db)) -> ChatDetailOut:
    conversation = db.get(AgentConversation, conversation_id)
    if conversation is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Conversation not found")
    detail = ChatDetailOut.model_validate(conversation)
    detail.preview = next((m.content[:160] for m in conversation.messages if m.role == "user"), None)
    return detail


@router.delete("/chats/{conversation_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_chat(
    conversation_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> None:
    conversation = db.get(AgentConversation, conversation_id)
    if conversation is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Conversation not found")
    db.delete(conversation)
    db.commit()
    audit("chat_delete", actor=current_user.email, conversation_id=str(conversation_id))
