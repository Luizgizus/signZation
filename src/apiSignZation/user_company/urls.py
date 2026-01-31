
from django.urls import path
from .views import CreateUserAPIView, ReadUpdateDeleteUserAPIView

urlpatterns = [
    path('', CreateUserAPIView.as_view(), name='user_company_list_create'),
    path('<int:user_id>/<int:comapny_id>/', ReadUpdateDeleteUserAPIView.as_view(), name='user_company_detail'),
]