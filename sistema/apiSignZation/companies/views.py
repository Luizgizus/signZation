from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Company
from .serializers import CompanySerializer

class CreateCompanyAPIView(APIView):
    def post(self, request):
        try:
            serializer = CompanySerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response("Houve um problema no servidor", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
  
    
    def get(self, request):
        try:
            company = Company.objects.all()
            serializer = CompanySerializer(company, many=True)
            return Response(serializer.data)
        except:
            return Response("Houve um problema no servidor", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
  

class ReadUpdateDeleteCompanyAPIView(APIView):
    def get(self, request, company_id):
        try:
            company = Company.objects.get(pk=company_id)
            serializer = CompanySerializer(company)
            return Response(serializer.data)
        except:
            return Response("Houve um problema no servidor", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
  

    def put(self, request, company_id):
        try:
            company = Company.objects.get(pk=company_id)
            serializer = CompanySerializer(company, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response("Houve um problema no servidor", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
  

    def delete(self, request, company_id):
        try:
            company = Company.objects.get(pk=company_id)
            company.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response("Houve um problema no servidor", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
  