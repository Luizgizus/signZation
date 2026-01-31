from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

from .auth import validate_session_token
from .models import User


class SessionTokenAuthentication(BaseAuthentication):
    def authenticate(self, request):
        header = request.headers.get("Authorization", "")
        if not header.startswith("Bearer "):
            return None

        token = header.split(" ", 1)[1].strip()
        if not token:
            return None

        user_id = validate_session_token(token)
        if not user_id:
            raise AuthenticationFailed("Sessão inválida ou expirada.")

        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist as exc:
            raise AuthenticationFailed("Usuário não encontrado.") from exc

        return (user, None)
