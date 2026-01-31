from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer

class CreateUserAPIView(APIView):
    def post(self, request):
        try:
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response("Houve um problema no servidor", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def get(self, request):
        try:
            user = User.objects.all()
            serializer = UserSerializer(user, many=True)
            return Response(serializer.data)
        except:
            return Response("Houve um problema no servidor", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ReadUpdateDeleteUserAPIView(APIView):
    def get(self, request, user_id):
        try:
            user = User.objects.get(pk=user_id)
            serializer = UserSerializer(user)
            return Response(serializer.data)
        except:
            return Response("Houve um problema no servidor", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
  

    def put(self, request, user_id):
        try:
            user = User.objects.get(pk=user_id)
            serializer = UserSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response("Houve um problema no servidor", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
  

    def delete(self, request, user_id):
        try:
            user = User.objects.get(pk=user_id)
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response("Houve um problema no servidor", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
  