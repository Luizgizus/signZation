from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from users.models import User
from users.auth import create_session_token
from companies.models import Company
from .models import Document


class DocumentAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(email='owner@example.com', password='123456')
        token = create_session_token(self.user.id)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        self.company = Company.objects.create(name='Test Company', created_by=self.user)
        self.document = Document.objects.create(
            name='Test Document',
            company=self.company,
            created_by=self.user,
        )

    def test_create_document(self):
        url = reverse('documents_list_create')
        data = {
            'name': 'Novo Documento',
            'company': self.company.id,
            'created_by': self.user.id,
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_documents(self):
        url = reverse('documents_list_create')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_document(self):
        url = reverse('documents_detail', kwargs={'document_id': self.document.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_document(self):
        url = reverse('documents_detail', kwargs={'document_id': self.document.id})
        data = {
            'name': 'Documento Atualizado',
            'company': self.company.id,
            'created_by': self.user.id,
            'signed': False,
            'date_limit_to_sign': None,
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_document(self):
        url = reverse('documents_detail', kwargs={'document_id': self.document.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
