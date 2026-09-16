from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.auth.security import create_access_token, verify_password
from app.core.config import get_settings
from app.core.database import get_db
from app.core.logging import audit
from app.core.rate_limit import limiter
from app.models.user import User
from app.schemas.auth import LoginRequest, TokenResponse, UserOut

router = APIRouter(prefix="/auth", tags=["auth"])
settings = get_settings()


@router.post("/login", response_model=TokenResponse)
@limiter.limit("10/minute")
def login(request: Request, payload: LoginRequest, db: Session = Depends(get_db)) -> TokenResponse:
    user = db.scalar(select(User).where(User.email == payload.email.lower()))

    if user is None or not verify_password(payload.password, user.hashed_password):
        # Deliberately identical error for "no such user" and "wrong password"
        # so login can't be used to enumerate admin email addresses.
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )

    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Account disabled")

    user.last_login_at = datetime.now(timezone.utc)
    db.commit()

    audit("login", actor=user.email)
    token = create_access_token(subject=str(user.id))
    return TokenResponse(access_token=token)


@router.get("/me", response_model=UserOut)
def me(current_user: User = Depends(get_current_user)) -> User:
    return current_user


# --- TEMPORARY diagnostic endpoint -----------------------------------------
# Not part of the product. Added to isolate a production 401 on /login:
# tells us whether a login failure is a genuine DB/hash mismatch (this
# endpoint reports the details) or something failing upstream of the
# database check entirely (Cloudflare Worker / proxy layer). Guarded by
# SECRET_KEY as a query token so it isn't a public info-leak. Never returns
# the password or the full hash. Delete this endpoint once the bug is fixed.
@router.post("/_diag")
@limiter.limit("10/minute")
def diagnostic(
    request: Request, payload: LoginRequest, token: str, db: Session = Depends(get_db)
) -> dict[str, object]:
    if token != settings.secret_key:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    user = db.scalar(select(User).where(User.email == payload.email.lower()))
    result: dict[str, object] = {"found": user is not None}
    if user is not None:
        result["is_active"] = user.is_active
        result["hash_prefix"] = user.hashed_password[:7]
        result["hash_length"] = len(user.hashed_password)
        result["verify_result"] = verify_password(payload.password, user.hashed_password)
    return result
