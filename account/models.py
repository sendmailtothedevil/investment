from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from autoslug import AutoSlugField

class CustomUserManager(BaseUserManager):
    def _create_user(self, full_name, email, password, **extra_fields):
        if not full_name:
            raise ValueError('Enter full name')
        if not email:
            raise ValueError('Invalid Email')
        if not password:
            raise ValueError('Password not correct')
        
        user = self.model(
            email = self.normalize_email(email),
            full_name = full_name,
            **extra_fields
        )
        
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_user(self, full_name, email, password, **extra_fields):
        extra_fields.setdefault('is_admin', False)
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(full_name, email, password, **extra_fields)

    def create_superuser(self, full_name, email, password, **extra_fields):
        extra_fields.setdefault('is_admin', True)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(full_name, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    # AbstractBaseUser has password, last_login and is_active by default
    email = models.EmailField(db_index=True, unique=True, max_length=255)
    full_name = models.CharField(max_length=255)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    
    objects = CustomUserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    
    def __str__(self):
        return self.email
    
    def has_perm(self, perm, obj=None):
        return True
    
    def has_module_perms(self, app_label):
        return True
    
    class Meta:
        ordering = ['-is_superuser', '-is_admin', '-is_active']


    
class Gateway(models.Model):
    slug = AutoSlugField(populate_from='pay_method', unique=True, null=False, default=None)
    pay_method = models.CharField(max_length=200, null=False, blank=False)
    pay_address = models.CharField(max_length=200, null=False, blank=False)
    pay_icon = models.ImageField(upload_to='payment_icon', blank=True, null=True)
    recent = models.DateField(auto_now=True)
    status = models.BooleanField(default=False)

    class Meta:
        ordering = ['-recent']

    def __str__(self):
        return self.pay_method + ' ' ' -- ' ' ' + self.pay_address


class Transaction(models.Model):
    slug = AutoSlugField(populate_from='trans_plan', unique=True, null=False, default=None)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    trans_plan = models.CharField(max_length=200, null=False, blank=False)
    trans_profit = models.CharField(max_length=200, null=False, blank=False)
    trans_days = models.CharField(max_length=200, null=False, blank=False)
    trans_bonus = models.CharField(max_length=200, null=False, blank=False)
    trans_amount = models.CharField(max_length=200, null=False, blank=False)
    trans_paym = models.CharField(max_length=200, null=False, blank=False)
    trans_paya = models.CharField(max_length=200, null=False, blank=False)
    trans_paid = models.CharField(max_length=200, null=False, blank=False)
    recent = models.DateField(auto_now=True)
    status = models.BooleanField(default=False)

    class Meta:
        ordering = ['-recent']

    def __str__(self):
        return self.user.full_name + ' ' ' -- ' ' ' + self.trans_plan


