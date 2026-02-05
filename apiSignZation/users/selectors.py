from .models import User


def list_users():
    return User.objects.filter(deleted=False)


def get_user_by_id(user_id):
    return User.objects.get(pk=user_id, deleted=False)


def get_user_by_email(email):
    return User.objects.get(email=email, deleted=False)
