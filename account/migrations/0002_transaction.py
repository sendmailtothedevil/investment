# Generated by Django 3.2.1 on 2024-02-29 01:55

import autoslug.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', autoslug.fields.AutoSlugField(default=None, editable=False, populate_from='pay_method', unique=True)),
                ('trans_plan', models.CharField(max_length=200)),
                ('trans_profit', models.ImageField(blank=True, null=True, upload_to='payment_icon')),
                ('trans_days', models.ImageField(blank=True, null=True, upload_to='payment_icon')),
                ('trans_bonus', models.ImageField(blank=True, null=True, upload_to='payment_icon')),
                ('trans_amount', models.ImageField(blank=True, null=True, upload_to='payment_icon')),
                ('trans_gateway', models.ImageField(blank=True, null=True, upload_to='payment_icon')),
                ('recent', models.DateField(auto_now=True)),
                ('status', models.BooleanField(default=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-recent'],
            },
        ),
    ]
