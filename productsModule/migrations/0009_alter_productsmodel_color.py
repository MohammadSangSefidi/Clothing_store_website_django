# Generated by Django 5.0.1 on 2024-03-25 09:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productsModule', '0008_alter_productsmodel_size'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productsmodel',
            name='color',
            field=models.ManyToManyField(blank=True, to='productsModule.colormodel', verbose_name='رنگ ها'),
        ),
    ]
