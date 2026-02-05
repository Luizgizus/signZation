from .serializers import UserSerializer
from django.utils import timezone


def create_user(data, actor_id):
    serializer = UserSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    serializer.save(created_by_id=actor_id)
    return serializer


def update_user(user, data, actor_id):
    serializer = UserSerializer(user, data=data)
    serializer.is_valid(raise_exception=True)
    serializer.save(updated_by_id=actor_id)
    return serializer


def delete_user(user):
    user.delete()


def reset_user_password(user, old_password, new_password):
    if user.password != old_password:
        return False, "Senha antiga inválida."

    user.password = new_password
    user.last_password_redefinition_at = timezone.now()
    user.save()
    return True, None
