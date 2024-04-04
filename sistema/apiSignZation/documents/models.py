from django.db import models
from django.utils import timezone

class Document(models.Model):
    name = models.CharField(max_length=255)
    deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    last_updated_at = models.DateTimeField(auto_now=True)
    date_limit_to_sign = models.DateTimeField(null=True, blank=True)
    signed = models.BooleanField(default=False)
    company = models.ForeignKey('companies.Company', on_delete=models.CASCADE, related_name='doc_company')
    created_by = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='doc_created_by')

    def save(self, *args, **kwargs):
        self.last_updated_at = timezone.now()
        super(Document, self).save(*args, **kwargs)
    
    class Meta:
        verbose_name_plural = 'Documents'