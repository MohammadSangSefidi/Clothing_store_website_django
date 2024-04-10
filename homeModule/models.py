from django.db import models


# Create your models here.

class HomePageSliderImageModel(models.Model):
    title = models.CharField(max_length=100, verbose_name='عنوان')
    image = models.ImageField(upload_to='images/home-page/sliders/', verbose_name='عکس')
    isActive = models.BooleanField(verbose_name='فعال/غیر فعال')
    isDelete = models.BooleanField(verbose_name='حذف شود/حذف نشود')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'عکس اسلایدر'
        verbose_name_plural = 'عکس های اسلایدر'