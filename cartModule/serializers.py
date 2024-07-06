from jalali_date import datetime2jalali
from rest_framework import serializers
from .models import CartsItemsModel, CartModel


class AddToCartSerializer(serializers.ModelSerializer):
    userId = serializers.IntegerField()

    class Meta:
        model = CartsItemsModel
        fields = [
            'id',
            'userId',
            'product',
            'count',
            'color',
            'size'
        ]


class ChangeCartItemCountSerializer(serializers.ModelSerializer):
    add = serializers.BooleanField()

    class Meta:
        model = CartsItemsModel
        fields = [
            'id',
            'count',
            'add',
        ]


class GotCartInfoSerializer(serializers.ModelSerializer):
    paid_date = serializers.SerializerMethodField(read_only=True)
    address = serializers.SerializerMethodField()

    class Meta:
        model = CartModel
        fields = [
            'id',
            'is_paid',
            'address',
            'final_price',
            'paid_date',
            'sum_prices',
            'sum_discounts',
            'full_price'
        ]

    def get_paid_date(self, obj):
        if obj.paid_date is not None:
            return datetime2jalali(obj.paid_date).strftime('%H:%M _ %d/%B/%Y')
        else:
            return None

    def get_address(self, obj):
        if obj.address is not None:
            return f'{obj.address.state} - {obj.address.city} - {obj.address.address}'
        else:
            return None


class GotCartsItemsSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()
    color = serializers.SerializerMethodField()
    size = serializers.SerializerMethodField()

    class Meta:
        model = CartsItemsModel
        fields = [
            'id',
            'product',
            'color',
            'size',
            'final_price',
            'count'
        ]

    def get_product(self, obj):
        product = {
            'title': obj.product.title,
            'image': obj.product.productsimagesmodel_set.first().image.url,
            'price': obj.product.price,
            'seller': obj.product.seller,
            'slug': obj.product.slug
        }
        return product

    def get_color(self, obj):
        if obj.color is not None:
            return obj.color.colorCode
        return None

    def get_size(self, obj):
        if obj.size is not None:
            return obj.size.title
        return None
