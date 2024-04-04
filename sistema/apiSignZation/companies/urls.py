
from django.urls import path
from .views import CreateCompanyAPIView, ReadUpdateDeleteCompanyAPIView

urlpatterns = [
    path('', CreateCompanyAPIView.as_view(), name='company_list'),
    path('<int:company_id>/', ReadUpdateDeleteCompanyAPIView.as_view(), name='company_detail'),
]