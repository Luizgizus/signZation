from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils import timezone
from companies.models import Company
from documents.models import Document

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('O campo email é obrigatório')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser precisa ter is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser precisa ter is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser):
    email = models.EmailField(unique=True, max_length=255, verbose_name='Email')
    last_password_reset = models.DateTimeField(default=timezone.now, verbose_name='Última redefinição de senha')
    email_verified = models.BooleanField(default=False, verbose_name='Email verificado')
    creation_date = models.DateTimeField(default=timezone.now, verbose_name='Data de criação')
    last_update_date = models.DateTimeField(default=timezone.now, verbose_name='Data da última atualização')
    associated_companies = models.ManyToManyField(Company, related_name='associated_users', blank=True, verbose_name='Companhias associadas')
    original_company = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, related_name='original_users', verbose_name='Companhia original')
    documents_associated = models.ManyToManyField(Document, related_name='associated_users', blank=True, verbose_name='Documentos associados')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def save(self, *args, **kwargs):
        self.last_update_date = timezone.now()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email