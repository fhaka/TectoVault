import hmac

from fastapi import APIRouter, Depends, Header, HTTPException, status
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.core.database import get_db
from app.schemas.agent import ChatTurnIn
from app.schemas.public import SubmissionAck
from app.services.agent_chats import purge_old_conversations, record_turn

router = APIRouter(prefix="/internal/agent", tags=["internal"])


def require_agent_log_key(x_agent_log_key: str = Header(default="")) -> None:
    """Only the website's server knows this key. Without it configured on
    the API, chat logging is off rather than open to anyone."""
    expected = get_settings().agent_log_key
    if not expected:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Chat logging is not configured")
    if not hmac.compare_digest(x_agent_log_key.encode(), expected.encode()):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid key")


@router.post("/turns", response_model=SubmissionAck, dependencies=[Depends(require_agent_log_key)])
def log_turn(payload: ChatTurnIn, db: Session = Depends(get_db)) -> SubmissionAck:
    purge_old_conversations(db, get_settings().chat_retention_days)
    record_turn(db, payload)
    db.commit()
    return SubmissionAck()
