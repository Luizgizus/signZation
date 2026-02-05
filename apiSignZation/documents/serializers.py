from rest_framework import serializers

from .models import Document


class DocumentSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True, allow_blank=False, max_length=255)
    date_limit_to_sign = serializers.DateTimeField(
        required=False,
        allow_null=True,
        input_formats=[
            "%Y-%m-%dT%H:%M:%S%z",
            "%Y-%m-%dT%H:%M:%S.%f%z",
            "%Y-%m-%dT%H:%M:%S",
            "%Y-%m-%d",
        ],
    )
    signed = serializers.BooleanField(required=False)

    class Meta:
        model = Document
        fields = '__all__'
        read_only_fields = (
            'id',
            'created_at',
            'last_updated_at',
            'created_by',
            'updated_by',
            'deleted',
            'deleted_at',
        )
