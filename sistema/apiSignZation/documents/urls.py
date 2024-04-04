
from django.urls import path
from .views import CreateDocumentAPIView, ReadUpdateDeleteDocumentAPIView

urlpatterns = [
    path('', CreateDocumentAPIView.as_view(), name='user_list_create'),
    path('<int:user_id>/', ReadUpdateDeleteDocumentAPIView.as_view(), name='user_detail'),
]