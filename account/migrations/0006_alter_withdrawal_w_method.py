# Generated by Django 3.2.1 on 2024-03-01 23:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0005_withdrawal'),
    ]

    operations = [
        migrations.AlterField(
            model_name='withdrawal',
            name='w_method',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
