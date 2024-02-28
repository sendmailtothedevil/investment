from django.db import models
from autoslug import AutoSlugField


# Create your models here.
class ContactUsMessage(models.Model):
    slug = AutoSlugField(populate_from='sender_email', unique=True, null=False, default=None)
    sender_email = models.CharField(max_length=200, null=False, blank=False)
    subject = models.CharField(max_length=200, null=True, blank=True)
    message = models.TextField(blank=False, null=False, max_length=5000)
    status = models.BooleanField(default=False)
    sent_date = models.DateField(auto_now=True)

    class Meta:
        ordering = ['-sent_date']

    def __str__(self):
        return self.sender_email