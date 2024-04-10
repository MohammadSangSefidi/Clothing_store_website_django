from rest_framework import serializers
from .models import *


class SliderImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = HomePageSliderImageModel
        fields = [
            'id',
            'title',
            'image',
            'isActive',
            'isDelete'
        ]

    def get_image(self, obj):
        return obj.image.url