from .serializers import UserSerializer
from django.utils import timezone


def create_user(data, actor_id):
    payload = data.copy()
    payload['created_by'] = actor_id
    serializer = UserSerializer(data=payload)
    if serializer.is_valid():
        serializer.save()
    return serializer


def update_user(user, data, actor_id):
    payload = data.copy()
    payload['updated_by'] = actor_id
    if 'created_by' not in payload:
        payload['created_by'] = user.created_by_id

    serializer = UserSerializer(user, data=payload)
    if serializer.is_valid():
        serializer.save()
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
