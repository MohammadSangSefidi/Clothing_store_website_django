from django.contrib import admin
from .models import CartModel, CartsItemsModel

# Register your models here.

admin.site.register(CartModel)
admin.site.register(CartsItemsModel)