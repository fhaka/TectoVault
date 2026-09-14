import logging
import sys

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s %(message)s",
    stream=sys.stdout,
)

logger = logging.getLogger("tectovault")
audit_logger = logging.getLogger("tectovault.audit")


def audit(action: str, actor: str, **details: object) -> None:
    """Log a sensitive admin action (status change, login, etc).

    Kept as structured log lines rather than a dedicated audit_logs table —
    deliberately avoiding an extra table for a single-admin studio site (see
    spec section 21, "do not create unnecessary tables"). Revisit if/when
    multiple admin users with different roles are introduced.
    """
    audit_logger.info("action=%s actor=%s %s", action, actor, details)
