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
