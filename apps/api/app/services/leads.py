from sqlalchemy.orm import Session

from app.models.contact_request import ContactRequest
from app.models.lead import Lead
from app.models.enums import LeadSource
from app.models.quote_request import QuoteRequest


def create_lead_from_contact(db: Session, contact: ContactRequest) -> Lead:
    lead = Lead(
        name=contact.name,
        email=contact.email,
        company=contact.company,
        source=LeadSource.CONTACT,
        contact_request_id=contact.id,
    )
    db.add(lead)
    return lead


def create_lead_from_quote(db: Session, quote: QuoteRequest) -> Lead:
    lead = Lead(
        name=quote.name,
        email=quote.email,
        company=quote.company,
        source=LeadSource.QUOTE,
        service=quote.project_type,
        budget=quote.budget,
        quote_request_id=quote.id,
    )
    db.add(lead)
    return lead
