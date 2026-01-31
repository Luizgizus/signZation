
from django.urls import path
from .views import CreateUserAPIView, ReadUpdateDeleteUserAPIView

urlpatterns = [
    path('', CreateUserAPIView.as_view(), name='user_list_create'),
    path('<int:user_id>/', ReadUpdateDeleteUserAPIView.as_view(), name='user_detail'),
]