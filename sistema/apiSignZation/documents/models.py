from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from companies.models import Company
from users.models import CustomUser

CustomUser = get_user_model()

class Document(models.Model):
    nome = models.CharField(max_length=255, verbose_name='Nome')
    deletado = models.BooleanField(default=False, verbose_name='Deletado')
    data_criacao = models.DateTimeField(default=timezone.now, verbose_name='Data de criação')
    data_ultima_atualizacao = models.DateTimeField(default=timezone.now, verbose_name='Data da última atualização')
    data_limite_assinar = models.DateTimeField(verbose_name='Data limite para assinar', null=True, blank=True)
    assinado = models.BooleanField(default=False, verbose_name='Assinado')
    company_associada = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='documents', verbose_name='Companhia associada')
    usuario_que_criou = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, related_name='created_documents', verbose_name='Usuário que criou o documento')

    def save(self, *args, **kwargs):
        self.data_ultima_atualizacao = timezone.now()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.nome
