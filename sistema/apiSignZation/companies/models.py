from django.db import models
from django.utils import timezone

class Company(models.Model):
    LANGUAGES = (
        ('pt', 'Portuguese'),
        ('es', 'Spanish'),
        ('en', 'English'),
    )

    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    timezone = models.CharField(max_length=50)
    language = models.CharField(max_length=2, choices=LANGUAGES)
    invited_users = models.ManyToManyField('auth.User', related_name='invited_companies')
    creator = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='created_companies')
    # Se você deseja associar documentos, adicione um campo ForeignKey ou ManyToManyField aqui

    def __str__(self):
        return self.name