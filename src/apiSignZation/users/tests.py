from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import User
from .auth import create_session_token


class UserAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(email='test@example.com', password='123456')
        token = create_session_token(self.user.id)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

    def test_create_user(self):
        url = reverse('user_list_create')
        data = {
            'email': 'new@example.com',
            'password': '123456',
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_users(self):
        url = reverse('user_list_create')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_user(self):
        url = reverse('user_detail', kwargs={'user_id': self.user.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_user(self):
        url = reverse('user_detail', kwargs={'user_id': self.user.id})
        data = {
            "email": "updated@example.com",
            "password": "123456",
            "email_verified": False,
            "last_password_redefinition_at": None,
            "company": None,
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_user(self):
        url = reverse('user_detail', kwargs={'user_id': self.user.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
