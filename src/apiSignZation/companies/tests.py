from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Company

class CompanyAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()

    # def test_create_company(self):
    #     url = reverse('company_list')
    #     data = {
    #         'name': 'Test Company',
    #         'created_by': 1
    #     }
    #     response = self.client.post(url, data, format='json')
    #     print(response.data)
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_companies(self):
        url = reverse('company_list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_get_company(self):
    #     company = Company.objects.create(name='Test Company')
    #     url = reverse('company_detail', kwargs={'company_id': company.id})
    #     response = self.client.get(url)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_update_company(self):
    #     company = Company.objects.create(name='Test Company')
    #     url = reverse('company_detail', kwargs={'company_id': company.id})
    #     data = {
    #         'name': 'Updated Company',
    #         # Add other fields to update here
    #     }
    #     response = self.client.put(url, data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_delete_company(self):
    #     company = Company.objects.create(name='Test Company')
    #     url = reverse('company_detail', kwargs={'company_id': company.id})
    #     response = self.client.delete(url)
    #     self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)