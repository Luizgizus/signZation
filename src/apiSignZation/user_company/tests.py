from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import UserCompany


class UserCompanyAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()

#     def test_create_user_company(self):
#         url = reverse('user_company_list_create')
#         data = {
#             'user_name': 'Test User',
#             'company_name': 'Test Company',
#             # Add other required fields here if necessary
#         }
#         response = self.client.post(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_user_companies(self):
        url = reverse('user_company_list_create')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

#     def test_get_user_company(self):
#         user_company = UserCompany.objects.create(user_name='Test User', company_name='Test Company')
#         url = reverse('user_company_detail', kwargs={'user_id': user_company.id, 'comapny_id': user_company.company_id})
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)

#     def test_update_user_company(self):
#         user_company = UserCompany.objects.create(user_name='Test User', company_name='Test Company')
#         url = reverse('user_company_detail', kwargs={'user_id': user_company.id, 'comapny_id': user_company.company_id})
#         data = {
#             'user_name': 'Updated User',
#             # Add other fields to update here
#         }
#         response = self.client.put(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)

#     def test_delete_user_company(self):
#         user_company = UserCompany.objects.create(user_name='Test User', company_name='Test Company')
#         url = reverse('user_company_detail', kwargs={'user_id': user_company.id, 'comapny_id': user_company.company_id})
#         response = self.client.delete(url)
#         self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
