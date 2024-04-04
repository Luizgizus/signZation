from django.db import models
from django.utils import timezone

class User(models.Model):
    email = models.EmailField(max_length=255, unique=True)
    last_password_redefinition_at = models.DateTimeField(null=True, blank=True)
    email_verified = models.BooleanField(default=False)
    password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    last_updated_at = models.DateTimeField(auto_now=True)
    company = models.ForeignKey('companies.Company', on_delete=models.CASCADE, null= True, related_name='related_companies')

    def save(self, *args, **kwargs):
        self.last_updated_at = timezone.now()
        super(User, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = 'Users'