from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from users.models import User
from users.auth import create_session_token
from .models import Company


class CompanyAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(email='owner@example.com', password='123456')
        token = create_session_token(self.user.id)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        self.company = Company.objects.create(name='Test Company', created_by=self.user)

    def test_create_company(self):
        url = reverse('company_list')
        data = {
            'name': 'Nova Empresa',
            'created_by': self.user.id,
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_companies(self):
        url = reverse('company_list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_company(self):
        url = reverse('company_detail', kwargs={'company_id': self.company.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_company(self):
        url = reverse('company_detail', kwargs={'company_id': self.company.id})
        data = {
            'name': 'Empresa Atualizada',
            'created_by': self.user.id,
            'locale': self.company.locale,
            'lang': self.company.lang,
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_company(self):
        url = reverse('company_detail', kwargs={'company_id': self.company.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
