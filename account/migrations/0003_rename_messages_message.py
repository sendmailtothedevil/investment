# Generated by Django 3.2.1 on 2024-02-28 09:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_messages'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Messages',
            new_name='Message',
        ),
    ]