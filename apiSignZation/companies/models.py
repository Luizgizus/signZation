from django.db import models
from django.utils import timezone

class Company(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    last_updated_at = models.DateTimeField(auto_now=True)
    locale = models.CharField(max_length=50, default="-03:00")
    lang_choices = (
        ('pt', 'Português'),
        ('es', 'Espanhol'),
        ('en', 'Inglês'),
    )
    lang = models.CharField(max_length=2, choices=lang_choices, default='pt')
    created_by = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='created_by_companies')
    updated_by = models.ForeignKey(
        'users.User',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='updated_by_companies',
    )

    def save(self, *args, **kwargs):
        self.last_updated_at = timezone.now()
        super(Company, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = 'Companies'
