from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import User


class UserAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_create_user(self):
        url = reverse('user_list_create')
        data = {
            'email': 'test@example.com',
            'password': 'testpassword',
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_users(self):
        url = reverse('user_list_create')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_user(self):
        user = User.objects.create(email='test@example.com', password='testpassword')
        url = reverse('user_detail', kwargs={'user_id': user.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_user(self):
        user = User.objects.create(email='test@example.com', password='testpassword')
        url = reverse('user_detail', kwargs={'user_id': user.id})
        data = {
            "id": 1,
            "email": "luiz@jesus.commmm",
            "last_password_redefinition_at": None,
            "email_verified": False,
            "password": "123456",
            "created_at": "2024-04-03T06:14:32.859976Z",
            "last_updated_at": "2024-04-03T06:14:32.859976Z"
        }
        response = self.client.put(url, data, format='json')
        print(response)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_user(self):
        user = User.objects.create(email='test@example.com', password='testpassword')
        url = reverse('user_detail', kwargs={'user_id': user.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)