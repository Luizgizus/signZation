from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Company
from users.models import User
from users.serializers import UserSerializer
from .serializers import CompanySerializer

class CreateCompanyAPIView(APIView):
    def post(self, request):
        serializer = CompanySerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        company = Company.objects.all()
        serializer = CompanySerializer(company, many=True)
        return Response(serializer.data)

class ReadUpdateDeleteCompanyAPIView(APIView):
    def get(self, request, company_id):
        company = Company.objects.get(pk=company_id)
        serializer = CompanySerializer(company)
        return Response(serializer.data)

    def put(self, request, company_id):
        company = Company.objects.get(pk=company_id)
        serializer = CompanySerializer(company, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, company_id):
        company = Company.objects.get(pk=company_id)
        company.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)