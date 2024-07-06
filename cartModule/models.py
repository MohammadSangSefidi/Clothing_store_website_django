from django.db import models
from usersModule.models import UsersModel
from usersPanelModule.models import AddressModel
from productsModule.models import ProductsModel, ColorModel, SizeModel


# Create your models here.


class CartModel(models.Model):
    user = models.ForeignKey(UsersModel, on_delete=models.CASCADE, verbose_name='کاربر')
    is_paid = models.BooleanField(default=False, verbose_name='پرداخت شده/نشده')
    final_price = models.IntegerField(null=True, blank=True, verbose_name='مجموع پرداختی')
    address = models.ForeignKey(AddressModel, on_delete=models.PROTECT, null=True, blank=True, verbose_name='آدرس')
    paid_date = models.DateTimeField(null=True, blank=True, verbose_name='زمان پرداخت')

    def sum_prices(self):
        num = 0
        items = self.cartsitemsmodel_set.all()
        if items is not None:
            for item in items:
                num += item.product.price * item.count

        return num

    def sum_discounts(self):
        dis = 0
        items = self.cartsitemsmodel_set.all()
        if items is not None:
            for item in items:
                dis += ((item.product.price * item.product.discount) / 100) * item.count

        return dis

    def full_price(self):
        return self.sum_prices() - self.sum_discounts()


    def __str__(self):
        return f'{self.user.name} : {self.cartsitemsmodel_set.count()} - {self.is_paid}'

    class Meta:
        verbose_name = 'سبد خرید'
        verbose_name_plural = 'سبد خرید ها'


class CartsItemsModel(models.Model):
    cart = models.ForeignKey(CartModel, on_delete=models.PROTECT, verbose_name='سبد خرید')
    product = models.ForeignKey(ProductsModel, on_delete=models.PROTECT, verbose_name='محصول')
    color = models.ForeignKey(ColorModel, on_delete=models.PROTECT, null=True, blank=True, verbose_name='رنگ انتخاب شده')
    size = models.ForeignKey(SizeModel, on_delete=models.PROTECT, null=True, blank=True, verbose_name='سایز انتخاب شده')
    count = models.IntegerField(verbose_name='تعداد')

    def __str__(self):
        return f'{self.cart.user.name} : {self.product.title} - {self.count}'

    def final_price(self):
        if self.product.discount > 0:
            return (self.product.price - ((self.product.price * self.product.discount)) / 100) * self.count
        else:
            return self.product.price * self.count



    class Meta:
        verbose_name = 'آیتم سبد خرید'
        verbose_name_plural = 'آیتم های سبد خرید'
