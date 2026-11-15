import enum


class LeadStatus(str, enum.Enum):
    NEW = "new"
    CONTACTED = "contacted"
    QUALIFIED = "qualified"
    PROPOSAL = "proposal"
    NEGOTIATION = "negotiation"
    WON = "won"
    LOST = "lost"


class LeadSource(str, enum.Enum):
    CONTACT = "contact"
    QUOTE = "quote"


class ApplicationStatus(str, enum.Enum):
    NEW = "new"
    REVIEWED = "reviewed"
    CONTACTED = "contacted"
    REJECTED = "rejected"
    HIRED = "hired"


class UserRole(str, enum.Enum):
    ADMIN = "admin"


class PilotStatus(str, enum.Enum):
    """The 30-day pilot programme. A pilot "takes a place" once it is
    accepted (SETTING_UP onwards); APPLIED / CALL_BOOKED / DECLINED don't."""

    APPLIED = "applied"
    CALL_BOOKED = "call_booked"
    SETTING_UP = "setting_up"
    LIVE = "live"
    REVIEW = "review"
    CONVERTED = "converted"
    ENDED = "ended"
    DECLINED = "declined"


PILOT_PLACE_STATUSES = (
    PilotStatus.SETTING_UP,
    PilotStatus.LIVE,
    PilotStatus.REVIEW,
    PilotStatus.CONVERTED,
    PilotStatus.ENDED,
)
