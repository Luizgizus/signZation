from django.conf import settings
from django.core.signing import TimestampSigner, BadSignature, SignatureExpired

SESSION_TTL_SECONDS = getattr(settings, "SESSION_TTL_SECONDS", 60 * 60 * 3)

_signer = TimestampSigner(salt="user-session")


def create_session_token(user_id: int) -> str:
    return _signer.sign(str(user_id))


def validate_session_token(token: str) -> int | None:
    try:
        value = _signer.unsign(token, max_age=SESSION_TTL_SECONDS)
        return int(value)
    except (BadSignature, SignatureExpired, ValueError):
        return None
