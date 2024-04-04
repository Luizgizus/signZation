from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UserCompany
from .serializers import UserCompanySerializer

class CreateUserAPIView(APIView):
    def post(self, request):
        try:
            serializer = UserCompanySerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response("Houve um problema no servidor", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
  
    
    def get(self, request):
        try:
            user = UserCompany.objects.all()
            serializer = UserCompanySerializer(user, many=True)
            return Response(serializer.data)
        except:
            return Response("Houve um problema no servidor", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
  

class ReadUpdateDeleteUserAPIView(APIView):
    def get(self, request, user_id, comapny_id):
        try:
            user = UserCompany.objects.get(pk=user_id)
            serializer = UserCompanySerializer(user)
            return Response(serializer.data)
        except:
            return Response("Houve um problema no servidor", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
  

    def put(self, request, user_id, comapny_id):
        try:
            user = UserCompany.objects.get(pk=user_id)
            serializer = UserCompanySerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response("Houve um problema no servidor", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
  

    def delete(self, request, user_id, comapny_id):
        try:
            user = UserCompany.objects.get(pk=user_id)
            UserCompany.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response("Houve um problema no servidor", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
  