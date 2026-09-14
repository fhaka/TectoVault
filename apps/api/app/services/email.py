import resend

from app.core.config import get_settings
from app.core.logging import logger

settings = get_settings()
resend.api_key = settings.resend_api_key or None


def send_email(to: str, subject: str, html: str) -> None:
    """Best-effort send. Never raises — a broken email integration must never
    take down (or roll back) a form submission that's already been saved to
    the database. If no API key is configured yet, log instead of sending so
    local/dev and pre-launch environments stay fully functional.
    """
    if not settings.resend_api_key:
        logger.info("[email:not configured] to=%s subject=%s", to, subject)
        return

    try:
        resend.Emails.send(
            {
                "from": settings.resend_from_email,
                "to": [to],
                "subject": subject,
                "html": html,
            }
        )
    except Exception:  # noqa: BLE001 — deliberately broad: email must never break the request
        logger.exception("Failed to send email to %s (subject=%s)", to, subject)


def notify_new_contact(name: str, email: str, message: str) -> None:
    send_email(
        to=settings.notification_email,
        subject=f"New contact message from {name}",
        html=f"<p><strong>{name}</strong> ({email}) wrote:</p><p>{message}</p>",
    )
    send_email(
        to=email,
        subject="We received your message",
        html=(
            f"<p>Hi {name},</p>"
            "<p>Thanks for reaching out — we'll get back to you as soon as possible.</p>"
        ),
    )


def notify_new_quote(name: str, email: str, project_type: str) -> None:
    send_email(
        to=settings.notification_email,
        subject=f"New project request from {name} ({project_type})",
        html=f"<p><strong>{name}</strong> ({email}) requested a quote for: {project_type}</p>",
    )
    send_email(
        to=email,
        subject="We received your project request",
        html=(
            f"<p>Hi {name},</p>"
            "<p>Thanks for the details — we'll review your project and get back to you "
            "shortly with next steps.</p>"
        ),
    )


def notify_new_application(name: str, email: str) -> None:
    send_email(
        to=settings.notification_email,
        subject=f"New job application from {name}",
        html=f"<p><strong>{name}</strong> ({email}) submitted an application.</p>",
    )
    send_email(
        to=email,
        subject="We received your application",
        html=f"<p>Hi {name},</p><p>Thanks for your interest — we'll be in touch if there's a fit.</p>",
    )
