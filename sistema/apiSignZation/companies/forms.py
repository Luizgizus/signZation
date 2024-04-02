from django import forms
from .models import Company

class CompanyForm(forms.ModelForm):
    class Meta:
        model = Company
        fields = ['name', 'timezone', 'language', 'invited_users']  # Adicione os campos do formulário conforme necessário