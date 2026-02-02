from .models import User


def list_users():
    return User.objects.all()


def get_user_by_id(user_id):
    return User.objects.get(pk=user_id)


def get_user_by_email(email):
    return User.objects.get(email=email)
