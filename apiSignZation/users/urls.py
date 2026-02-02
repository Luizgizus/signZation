
from django.urls import path
from .views import CreateUserAPIView, ReadUpdateDeleteUserAPIView, LoginAPIView, ResetPasswordAPIView

urlpatterns = [
    path('login/', LoginAPIView.as_view(), name='user_login'),
    path('reset-password/', ResetPasswordAPIView.as_view(), name='user_reset_password'),
    path('', CreateUserAPIView.as_view(), name='user_list_create'),
    path('<int:user_id>/', ReadUpdateDeleteUserAPIView.as_view(), name='user_detail'),
]
