from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Document
from .serializers import DocumentSerializer

class SignDocumentAPIView(APIView):
    def post(self, request, document_id):
        try:
            document = Document.objects.get(pk=document_id)   
        except Document.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        if document.signed:
            return Response({"Message": "Documento já assinado"},status=status.HTTP_400_BAD_REQUEST)
        else: 
            request.data['name'] = document.name
            request.data['signed'] = True
            serializer = DocumentSerializer(document, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateDocumentAPIView(APIView):
    def post(self, request):
        try:
            serializer = DocumentSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response("Houve um problema no servidor", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
  
    
    def get(self, request):
        try:
            documents = Document.objects.all()
            serializer = DocumentSerializer(documents, many=True)
            return Response(serializer.data)
        except:
            return Response("Houve um problema no servidor", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
  

class ReadUpdateDeleteDocumentAPIView(APIView):
    def get(self, request, document_id):
        try:
            document = Document.objects.get(pk=document_id)
        except Document.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = DocumentSerializer(document)
        return Response(serializer.data)

    def put(self, request, document_id):
        try:
            document = Document.objects.get(pk=document_id)
        except Document.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = DocumentSerializer(document, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, document_id):
        try:
            document = Document.objects.get(pk=document_id)
        except Document.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        document.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)