import logging

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.exceptions import ValidationError

from .models import Document
from .serializers import DocumentSerializer
from .selectors import list_documents, get_document_by_id
from .services import create_document, update_document, delete_document, sign_document

logger = logging.getLogger(__name__)


class SignDocumentAPIView(APIView):
    def post(self, request, document_id):
        try:
            document = get_document_by_id(document_id)
        except Document.DoesNotExist:
            logger.warning("Documento não encontrado para assinatura.", extra={"document_id": document_id})
            return Response({"detail": "Documento não encontrado."}, status=status.HTTP_404_NOT_FOUND)

        if document.signed:
            return Response({"detail": "Documento já assinado."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            serializer = sign_document(document, request.data, request.user.id)
            return Response(serializer.data)
        except ValidationError as exc:
            return Response(exc.detail, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            logger.exception("Erro ao assinar documento.", extra={"document_id": document_id})
            return Response({"detail": "Houve um problema no servidor"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CreateDocumentAPIView(APIView):
    def post(self, request):
        try:
            serializer = create_document(request.data, request.user.id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValidationError as exc:
            return Response(exc.detail, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            logger.exception("Erro ao criar documento.")
            return Response({"detail": "Houve um problema no servidor"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get(self, request):
        try:
            documents = list_documents()
            serializer = DocumentSerializer(documents, many=True)
            return Response(serializer.data)
        except Exception:
            logger.exception("Erro ao listar documentos.")
            return Response({"detail": "Houve um problema no servidor"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ReadUpdateDeleteDocumentAPIView(APIView):
    def get(self, request, document_id):
        try:
            document = get_document_by_id(document_id)
        except Document.DoesNotExist:
            logger.warning("Documento não encontrado.", extra={"document_id": document_id})
            return Response({"detail": "Documento não encontrado."}, status=status.HTTP_404_NOT_FOUND)
        serializer = DocumentSerializer(document)
        return Response(serializer.data)

    def put(self, request, document_id):
        try:
            document = get_document_by_id(document_id)
        except Document.DoesNotExist:
            logger.warning("Documento não encontrado para atualização.", extra={"document_id": document_id})
            return Response({"detail": "Documento não encontrado."}, status=status.HTTP_404_NOT_FOUND)
        try:
            serializer = update_document(document, request.data, request.user.id)
            return Response(serializer.data)
        except ValidationError as exc:
            return Response(exc.detail, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            logger.exception("Erro ao atualizar documento.", extra={"document_id": document_id})
            return Response({"detail": "Houve um problema no servidor"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, document_id):
        try:
            document = get_document_by_id(document_id)
        except Document.DoesNotExist:
            logger.warning("Documento não encontrado para exclusão.", extra={"document_id": document_id})
            return Response({"detail": "Documento não encontrado."}, status=status.HTTP_404_NOT_FOUND)
        try:
            delete_document(document)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception:
            logger.exception("Erro ao deletar documento.", extra={"document_id": document_id})
            return Response({"detail": "Houve um problema no servidor"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
