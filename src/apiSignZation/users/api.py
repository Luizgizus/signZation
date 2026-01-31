import logging

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny

from .models import User
from .serializers import UserSerializer
from .selectors import list_users, get_user_by_id, get_user_by_email
from .services import create_user, update_user, delete_user
from .auth import create_session_token, SESSION_TTL_SECONDS

logger = logging.getLogger(__name__)


class CreateUserAPIView(APIView):
    def post(self, request):
        try:
            serializer = create_user(request.data)
            if serializer.is_valid():
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            logger.exception("Erro ao criar usuário.")
            return Response("Houve um problema no servidor", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get(self, request):
        try:
            users = list_users()
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data)
        except Exception:
            logger.exception("Erro ao listar usuários.")
            return Response("Houve um problema no servidor", status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ReadUpdateDeleteUserAPIView(APIView):
    def get(self, request, user_id):
        try:
            user = get_user_by_id(user_id)
            serializer = UserSerializer(user)
            return Response(serializer.data)
        except Exception:
            logger.exception("Erro ao buscar usuário.", extra={"user_id": user_id})
            return Response("Houve um problema no servidor", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, user_id):
        try:
            user = get_user_by_id(user_id)
            serializer = update_user(user, request.data)
            if serializer.is_valid():
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            logger.exception("Erro ao atualizar usuário.", extra={"user_id": user_id})
            return Response("Houve um problema no servidor", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, user_id):
        try:
            user = get_user_by_id(user_id)
            delete_user(user)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception:
            logger.exception("Erro ao deletar usuário.", extra={"user_id": user_id})
            return Response("Houve um problema no servidor", status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email", "").strip()
        password = request.data.get("password", "")

        if not email or not password:
            return Response({"detail": "Email e senha são obrigatórios."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = get_user_by_email(email)
        except User.DoesNotExist:
            return Response({"detail": "Credenciais inválidas."}, status=status.HTTP_400_BAD_REQUEST)

        if user.password != password:
            return Response({"detail": "Credenciais inválidas."}, status=status.HTTP_400_BAD_REQUEST)

        token = create_session_token(user.id)
        return Response(
            {
                "token": token,
                "expires_in": SESSION_TTL_SECONDS,
                "user": UserSerializer(user).data,
            },
            status=status.HTTP_200_OK,
        )
