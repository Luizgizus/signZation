from rest_framework import serializers

from .models import Company


class CompanySerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True, allow_blank=False, max_length=255)
    locale = serializers.RegexField(
        regex=r"^[+-](?:0\d|1\d|2[0-3]):[0-5]\d$",
        required=False,
        allow_blank=False,
    )
    lang = serializers.ChoiceField(choices=Company.lang_choices, required=False)

    class Meta:
        model = Company
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
