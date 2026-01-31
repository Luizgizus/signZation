from django.db import models
from django.utils import timezone

class UserCompany(models.Model):
    user_name = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    last_updated_at = models.DateTimeField(auto_now=True)
    company = models.ForeignKey('companies.Company', on_delete=models.CASCADE, related_name='user_company_company')
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='user_company_user')

    def save(self, *args, **kwargs):
        self.last_updated_at = timezone.now()
        super(UserCompany, self).save(*args, **kwargs)
    
    class Meta:
        verbose_name_plural = 'UserCompany'