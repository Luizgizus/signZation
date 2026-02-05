from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, allow_blank=False, max_length=255)
    password = serializers.CharField(write_only=True, required=True, min_length=6, allow_blank=False)

    class Meta:
        model = User
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'last_updated_at', 'created_by', 'updated_by')

    def validate_password(self, value):
        if len(value) < 6:
            raise serializers.ValidationError("A senha deve ter pelo menos 6 caracteres.")
        return value
