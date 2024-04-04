
from django.urls import path
from .views import CreateDocumentAPIView, ReadUpdateDeleteDocumentAPIView, SignDocumentAPIView

urlpatterns = [
    path('', CreateDocumentAPIView.as_view(), name='user_list_create'),
    path('<int:document_id>', ReadUpdateDeleteDocumentAPIView.as_view(), name='user_detail'),
    path('sign/<int:document_id>', SignDocumentAPIView.as_view(), name='user_list_create'),
]