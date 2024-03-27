from abc import ABC

from rest_framework import serializers

from .models import UsersModel


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsersModel
        fields = [
            'email',
            'password'
        ]


class ActiveCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsersModel
        fields = [
            'emailActivateCode',
        ]


class ForgetPasswordSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200)
    email = serializers.EmailField()

    def validate_name(self, value):
        if not value:
            raise serializers.ValidationError({'name': 'این فیلد لازم است'})
        return value

    def validate_email(self, value):
        if not value:
            raise serializers.ValidationError({'name': 'این فیلد لازم است'})
        return value

    class Meta:
        fields = [
            'name',
            'email',
        ]


class RegisterSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200)
    email = serializers.EmailField()
    password = serializers.CharField()
    confirmPassword = serializers.CharField()

    def validate_name(self, value):
        if not value:
            raise serializers.ValidationError({'name': 'این فیلد لازم است'})
        return value

    def validate_email(self, value):
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
            'name',
            'email',
            'password',
            'confirmPassword',
        ]


class ChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField()
    confirmPassword = serializers.CharField()

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
            'password',
            'confirmPassword',
        ]
