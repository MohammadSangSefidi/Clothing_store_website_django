# Generated by Django 5.0.1 on 2024-04-09 13:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productsModule', '0006_rename_text_commentsmodel_commenttext'),
    ]

    operations = [
        migrations.AddField(
            model_name='productsmodel',
            name='amazing_time',
            field=models.DateTimeField(null=True, verbose_name='تاریخ اتمام شگفت انگیز'),
        ),
        migrations.AddField(
            model_name='productsmodel',
            name='is_amazing',
            field=models.BooleanField(default=False, verbose_name='شگفت انگیز هست/نیست'),
        ),
    ]
