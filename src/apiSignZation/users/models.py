from django.db import models
from django.utils import timezone

class User(models.Model):
    email = models.EmailField(max_length=255, unique=True)
    last_password_redefinition_at = models.DateTimeField(null=True, blank=True)
    email_verified = models.BooleanField(default=False)
    password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    last_updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(
        'self',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='created_users',
    )
    updated_by = models.ForeignKey(
        'self',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='updated_users',
    )
    def save(self, *args, **kwargs):
        self.last_updated_at = timezone.now()
        if len(self.password) <= 5:
            raise ValueError("A senha deve ter pelo menos 6 caracteres")
        super(User, self).save(*args, **kwargs)

    @property
    def is_authenticated(self):
        # Para compatibilidade com DRF IsAuthenticated sem alterar o modelo base.
        return True

    class Meta:
        verbose_name_plural = 'Users'
