# Generated by Django 5.0.1 on 2024-03-30 17:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productsModule', '0003_alter_categorymodel_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='categorymodel',
            name='image',
            field=models.ImageField(null=True, upload_to='images/category/', verbose_name='عکس'),
        ),
    ]
