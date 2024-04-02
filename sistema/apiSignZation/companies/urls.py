
from django.urls import path
from .views import CompanyListAPIView, CompanyDetailAPIView

urlpatterns = [
    path('', CompanyListAPIView.as_view(), name='company_list'),
    path('<int:pk>/', CompanyDetailAPIView.as_view(), name='company_detail'),
]