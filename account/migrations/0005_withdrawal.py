# Generated by Django 3.2.1 on 2024-03-01 22:39

import autoslug.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0004_alter_transaction_slug'),
    ]

    operations = [
        migrations.CreateModel(
            name='Withdrawal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', autoslug.fields.AutoSlugField(default=None, editable=False, populate_from='w_method', unique=True)),
                ('w_method', models.CharField(max_length=200)),
                ('w_method_name', models.CharField(max_length=200)),
                ('w_method_address', models.CharField(max_length=200)),
                ('w_amount', models.CharField(max_length=200)),
                ('recent', models.DateField(auto_now=True)),
                ('status', models.BooleanField(default=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-recent'],
            },
        ),
    ]