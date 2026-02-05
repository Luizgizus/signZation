import logging

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.exceptions import ValidationError

from .models import Company
from .selectors import list_companies, get_company_by_id
from .services import create_company, update_company, delete_company
from .serializers import CompanySerializer

logger = logging.getLogger(__name__)


class CreateCompanyAPIView(APIView):
    def post(self, request):
        try:
            serializer = create_company(request.data, request.user.id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValidationError as exc:
            return Response(exc.detail, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            logger.exception("Erro ao criar empresa.")
            return Response({"detail": "Houve um problema no servidor"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get(self, request):
        try:
            companies = list_companies()
            serializer = CompanySerializer(companies, many=True)
            return Response(serializer.data)
        except Exception:
            logger.exception("Erro ao listar empresas.")
            return Response({"detail": "Houve um problema no servidor"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ReadUpdateDeleteCompanyAPIView(APIView):
    def get(self, request, company_id):
        try:
            company = get_company_by_id(company_id)
            serializer = CompanySerializer(company)
            return Response(serializer.data)
        except Company.DoesNotExist:
            logger.warning("Empresa não encontrada.", extra={"company_id": company_id})
            return Response({"detail": "Empresa não encontrada."}, status=status.HTTP_404_NOT_FOUND)
        except Exception:
            logger.exception("Erro ao buscar empresa.", extra={"company_id": company_id})
            return Response({"detail": "Houve um problema no servidor"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, company_id):
        try:
            company = get_company_by_id(company_id)
            serializer = update_company(company, request.data, request.user.id)
            return Response(serializer.data)
        except Company.DoesNotExist:
            logger.warning("Empresa não encontrada para atualização.", extra={"company_id": company_id})
            return Response({"detail": "Empresa não encontrada."}, status=status.HTTP_404_NOT_FOUND)
        except ValidationError as exc:
            return Response(exc.detail, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            logger.exception("Erro ao atualizar empresa.", extra={"company_id": company_id})
            return Response({"detail": "Houve um problema no servidor"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, company_id):
        try:
            company = get_company_by_id(company_id)
            delete_company(company)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Company.DoesNotExist:
            logger.warning("Empresa não encontrada para exclusão.", extra={"company_id": company_id})
            return Response({"detail": "Empresa não encontrada."}, status=status.HTTP_404_NOT_FOUND)
        except Exception:
            logger.exception("Erro ao deletar empresa.", extra={"company_id": company_id})
            return Response({"detail": "Houve um problema no servidor"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
