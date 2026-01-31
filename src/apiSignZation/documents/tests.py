from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Document


class DocumentAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()

    # def test_create_document(self):
    #     url = reverse('documents_list_create')
    #     data = {
    #         'name': 'Test Document',
    #         "comany": 1,
    #         "created_by": 1
    #     }

    #     response = self.client.post(url, data, format='json')
    #     print(response)
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_documents(self):
        url = reverse('documents_list_create')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_get_document(self):
    #     document = Document.objects.create(name='Test Document')
    #     url = reverse('documents_detail', kwargs={'document_id': document.id})
    #     response = self.client.get(url)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_update_document(self):
    #     document = Document.objects.create(name='Test Document')
    #     url = reverse('documents_detail', kwargs={'document_id': document.id})
    #     data = {
    #         'name': 'Updated Document',
    #         # Add other fields to update here
    #     }
    #     response = self.client.put(url, data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_delete_document(self):
    #     document = Document.objects.create(name='Test Document')
    #     url = reverse('documents_detail', kwargs={'document_id': document.id})
    #     response = self.client.delete(url)
    #     self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    # def test_sign_document(self):
    #     document = Document.objects.create(name='Test Document')
    #     url = reverse('documents_sign', kwargs={'document_id': document.id})
    #     response = self.client.post(url)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertTrue(response.data['signed'])

    # def test_sign_already_signed_document(self):
    #     document = Document.objects.create(name='Test Document', signed=True)
    #     url = reverse('documents_sign', kwargs={'document_id': document.id})
    #     response = self.client.post(url)
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
