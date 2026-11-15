from datetime import datetime, timedelta, timezone

from sqlalchemy import delete
from sqlalchemy.orm import Session

from app.models.agent_chat import AgentConversation, AgentMessage
from app.schemas.agent import ChatTurnIn


def purge_old_conversations(db: Session, retention_days: int) -> int:
    """Delete conversations whose last message is older than the retention
    period. Called on every write, so no separate scheduled job is needed."""
    cutoff = datetime.now(timezone.utc) - timedelta(days=retention_days)
    result = db.execute(delete(AgentConversation).where(AgentConversation.last_message_at < cutoff))
    return result.rowcount or 0


def record_turn(db: Session, turn: ChatTurnIn) -> AgentConversation:
    conversation = db.get(AgentConversation, turn.conversation_id)
    if conversation is None:
        conversation = AgentConversation(
            id=turn.conversation_id,
            locale=turn.locale,
            page=turn.page,
            provider=turn.provider,
            message_count=0,
        )
        db.add(conversation)
        db.flush()
    elif turn.provider:
        conversation.provider = turn.provider

    for i, message in enumerate(turn.messages):
        db.add(
            AgentMessage(
                conversation_id=conversation.id,
                position=conversation.message_count + i,
                role=message.role,
                content=message.content,
            )
        )
    conversation.message_count += len(turn.messages)
    conversation.last_message_at = datetime.now(timezone.utc)

    if turn.contact:
        conversation.contact_name = turn.contact.name
        conversation.contact_email = str(turn.contact.email)
        conversation.contact_phone = turn.contact.phone

    return conversation
