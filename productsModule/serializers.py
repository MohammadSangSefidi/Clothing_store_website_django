from rest_framework import serializers

from .models import *
from jalali_date import datetime2jalali, date2jalali

class CategorySerializer(serializers.ModelSerializer):
    parent = serializers.SerializerMethodField()

    class Meta:
        model = CategoryModel
        fields = [
            'id',
            'title',
            'parent',
            'image_url',
            'slug',
            'count',
            'isActive',
            'isDelete'
        ]

    def get_parent(self, obj):
        if obj.parent != None:
            parent = {'id': obj.parent.id, 'title': obj.parent.title, 'slug': obj.parent.slug,
                      'isActive': obj.parent.isActive, 'isDelete': obj.parent.isDelete}
            return parent
        else:
            return None


class ProductsSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()
    color = serializers.SerializerMethodField()
    size = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()

    class Meta:
        model = ProductsModel
        fields = [
            'id',
            'title',
            'price',
            'discount',
            'amazing',
            'amazing_date_str',
            'amazing_time_str',
            'count',
            'category',
            'color',
            'size',
            'brand',
            'country',
            'seller',
            'shortDes',
            'score',
            'commentsCount',
            'images',
            'slug'
        ]

    def get_category(self, obj):
        if obj.category.parent != None:
            category = {
                'id': obj.category.id,
                'title': obj.category.title,
                'parent': {"id": obj.category.parent.id,
                           "title": obj.category.parent.title,
                           'count': obj.category.count(),
                           "slug": obj.category.parent.slug,
                           "isActive": obj.category.parent.isActive,
                           "isDelete": obj.category.parent.isDelete,
                           },
                'count': obj.category.count(),
                'slug': obj.category.slug,
                'isActive': obj.category.isActive,
                'isDelete': obj.category.isDelete}
            return category
        else:
            category = {
                'id': obj.category.id,
                'title': obj.category.title,
                'parent': None,
                'count': obj.category.count(),
                'slug': obj.category.slug,
                'isActive': obj.category.isActive,
                'isDelete': obj.category.isDelete}
            return category

    def get_color(self, obj):
        colors = []
        for color in obj.color.all():
            colorDict = {
                'id': color.id,
                'title': color.title,
                'colorCode': color.colorCode,
                'slug': color.slug,
                'isActive': color.isActive,
                'isDelete': color.isDelete
                }
            colors.append(colorDict)
        if colors == []:
            return None
        return colors

    def get_size(self, obj):
        sizes = []
        for size in obj.size.all():
            sizeDict = {
                'id': size.id,
                'title': size.title,
                'slug': size.slug,
                'isActive': size.isActive,
                'isDelete': size.isDelete
                }
            sizes.append(sizeDict)
        if sizes == []:
            return None
        return sizes

    def get_images(self, obj):
        images = []
        for image in obj.productsimagesmodel_set.all():
            imageDict = {
                'title': image.title,
                'image': image.image.url,
                'isActive': image.isActive,
                'isDelete': image.isDelete
            }
            images.append(imageDict)
        return images



class CommentsSerializer(serializers.ModelSerializer):
    createDate = serializers.SerializerMethodField(read_only=True)
    score = serializers.SerializerMethodField()


    class Meta:
        model = CommentsModel
        fields = [
            'id',
            'name',
            'commentText',
            'email',
            'score',
            'createDate',
        ]

    def get_score(self, obj):
        return {'scoreList': list(range(int(obj.score))), 'score': int(obj.score)}

    def get_createDate(self, obj):
        return datetime2jalali(obj.createDate).strftime('%H:%M _ %d/%B/%Y')