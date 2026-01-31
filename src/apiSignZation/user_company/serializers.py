from rest_framework import serializers
from .models import UserCompany

class UserCompanySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserCompany
        fields = ['user', 'company']