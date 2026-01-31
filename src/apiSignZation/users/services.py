from .serializers import UserSerializer


def create_user(data):
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
    return serializer


def update_user(user, data):
    serializer = UserSerializer(user, data=data)
    if serializer.is_valid():
        serializer.save()
    return serializer


def delete_user(user):
    user.delete()
