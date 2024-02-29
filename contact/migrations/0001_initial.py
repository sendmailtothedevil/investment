# Generated by Django 3.2.1 on 2024-02-28 17:57

import autoslug.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ContactUsMessage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', autoslug.fields.AutoSlugField(default=None, editable=False, populate_from='sender_email', unique=True)),
                ('sender_email', models.CharField(max_length=200)),
                ('subject', models.CharField(blank=True, max_length=200, null=True)),
                ('message', models.TextField(max_length=5000)),
                ('status', models.BooleanField(default=False)),
                ('sent_date', models.DateField(auto_now=True)),
            ],
            options={
                'ordering': ['-sent_date'],
            },
        ),
    ]
