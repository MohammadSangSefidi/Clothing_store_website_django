from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.


class UsersModel(AbstractUser):
    name = models.CharField(max_length=200, unique=True, verbose_name='نام کاربری')
    avatar = models.ImageField(upload_to='images/users_avatars/', verbose_name='عکس پروفایل', null=True)
    emailActivateCode = models.CharField(max_length=6, verbose_name='کد فعالسازی')
    token = models.CharField(max_length=80, verbose_name='توکن', null=True)

    first_name = None
    last_name = None
    username = None

    USERNAME_FIELD = 'name'

    # REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'کاربر'
        verbose_name_plural = 'کاربران'
