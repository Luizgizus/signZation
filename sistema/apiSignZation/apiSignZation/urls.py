
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('companies/', include('companies.urls')),
    path('users/', include('users.urls')),
    path('documents/', include('documents.urls')),
    path('user_company/', include('user_company.urls')),
]
