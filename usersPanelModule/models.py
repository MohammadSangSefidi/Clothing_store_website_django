from django.db import models
from usersModule.models import UsersModel


class AddressModel(models.Model):
    user = models.ForeignKey(UsersModel, on_delete=models.PROTECT, verbose_name='کاربر')
    state = models.CharField(max_length=100, verbose_name='استان')
    city = models.CharField(max_length=100, verbose_name='شهر')
    address = models.CharField(max_length=500, verbose_name='آدرس')
    is_delete = models.BooleanField(default=False, verbose_name='حذف شده/نشده')

    def __str__(self):
        return f'{self.user.name} : {self.address}'

    class Meta:
        verbose_name = 'آدرس'
        verbose_name_plural = 'آدرس ها'
