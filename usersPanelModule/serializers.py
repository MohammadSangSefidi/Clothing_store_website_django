from .models import AddressModel
from rest_framework import serializers


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddressModel
        fields = [
            'id',
            'user',
            'state',
            'city',
            'address',
        ]


class ChangePasswordSerializer(serializers.Serializer):
    oldPassword = serializers.CharField()
    password = serializers.CharField()
    confirmPassword = serializers.CharField()

    def validate_oldPassword(self, value):
        if not value:
            raise serializers.ValidationError({'name': 'این فیلد لازم است'})
        return value

    def validate_password(self, value):
        if not value:
            raise serializers.ValidationError({'name': 'این فیلد لازم است'})
        return value

    def validate_confirmPassword(self, value):
        if not value:
            raise serializers.ValidationError({'name': 'این فیلد لازم است'})
        return value

    class Meta:
        fields = [
            'oldPassword'
            'password',
            'confirmPassword',
        ]
