from rest_framework import serializers

from productsModule.models import CategoryModel


class CategorySerializer(serializers.ModelSerializer):
    parent = serializers.SerializerMethodField()
    class Meta:
        model = CategoryModel
        fields = [
            'id',
            'title',
            'parent',
            'slug',
            'isActive',
            'isDelete'
        ]

    def get_parent(self, obj):
        if obj.parent != None:
            parent = {'id': obj.parent.id, 'title': obj.parent.title, 'slug':obj.parent.slug, 'isActive':obj.parent.isActive, 'isDelete':obj.parent.isDelete}
            return parent
        else:
            return None