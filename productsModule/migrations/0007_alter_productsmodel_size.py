# Generated by Django 5.0.1 on 2024-03-25 09:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productsModule', '0006_alter_productsmodel_size'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productsmodel',
            name='size',
            field=models.ManyToManyField(blank=True, null=True, to='productsModule.sizemodel', verbose_name='سایز'),
        ),
    ]
