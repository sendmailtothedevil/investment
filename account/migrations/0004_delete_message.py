# Generated by Django 3.2.1 on 2024-02-28 09:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0003_rename_messages_message'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Message',
        ),
    ]