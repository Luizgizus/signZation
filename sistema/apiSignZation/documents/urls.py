
from django.urls import path
from .views import DocumentListCreateAPIView, DocumentRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('documents/', DocumentListCreateAPIView.as_view(), name='document_list_create'),
    path('documents/<int:pk>/', DocumentRetrieveUpdateDestroyAPIView.as_view(), name='document_detail'),
]
