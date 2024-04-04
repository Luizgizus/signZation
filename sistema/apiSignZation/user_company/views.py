from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UserCompany
from .serializers import UserCompanySerializer

class CreateUserAPIView(APIView):
    def post(self, request):
        serializer = UserCompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        user = UserCompany.objects.all()
        serializer = UserCompanySerializer(user, many=True)
        return Response(serializer.data)

class ReadUpdateDeleteUserAPIView(APIView):
    def get(self, request, user_id):
        user = UserCompany.objects.get(pk=user_id)
        serializer = UserCompanySerializer(user)
        return Response(serializer.data)

    def put(self, request, user_id):
        user = UserCompany.objects.get(pk=user_id)
        serializer = UserCompanySerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, user_id):
        user = UserCompany.objects.get(pk=user_id)
        UserCompany.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)