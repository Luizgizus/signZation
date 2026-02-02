
from django.urls import path
from .views import CreateDocumentAPIView, ReadUpdateDeleteDocumentAPIView, SignDocumentAPIView

urlpatterns = [
    path('', CreateDocumentAPIView.as_view(), name='documents_list_create'),
    path('<int:document_id>', ReadUpdateDeleteDocumentAPIView.as_view(), name='documents_detail'),
    path('sign/<int:document_id>', SignDocumentAPIView.as_view(), name='documents_sign'),
]