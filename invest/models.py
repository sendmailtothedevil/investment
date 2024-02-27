from django.db import models
from autoslug import AutoSlugField
from account.models import *

# Create your models here.
class Package(models.Model):
    slug = AutoSlugField(populate_from='title', unique=True, null=False, default=None)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200, null=False, blank=False)
    profit = models.CharField(max_length=200, null=False, blank=False)
    days = models.CharField(max_length=200, null=False, blank=False)
    bonus = models.CharField(max_length=200, null=False, blank=False)
    min = models.CharField(max_length=200, null=False, blank=False)
    max = models.CharField(max_length=200, null=False, blank=False)
    amount = models.CharField(max_length=200, null=False, blank=False)    
    post_date = models.DateField(auto_now_add=True)
    recent = models.DateField(auto_now=True)
    status = models.BooleanField(default=False)

    class Meta:
        ordering = ['-recent', '-post_date']

    def __str__(self):
        return self.user.full_name + ' ' ' -- ' ' ' + self.title

