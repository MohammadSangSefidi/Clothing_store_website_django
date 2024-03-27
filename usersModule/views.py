from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.utils.crypto import get_random_string
from django.views import View
from django.contrib.auth import login
from rest_framework.views import APIView
from rest_framework.response import Response

# from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
# from rest_framework.authentication import TokenAuthentication

from homeModule.authentication import TokenAuthenticationCustom
from .models import UsersModel
from .serializer import LoginSerializer, RegisterSerializer, ActiveCodeSerializer, ForgetPasswordSerializer, ChangePasswordSerializer
from utils.utils import activeCode


# Create your views here.


class RegisterView(View):
    def get(self, request):
        return render(request, 'register-page.html')


class RegisterAPIView(APIView):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'message': 'get is not allowed'})

    def post(self, request, *args, **kwargs):
        data = RegisterSerializer(data=request.data)
        confirm_password = request.data['confirmPassword']
        if data.is_valid():
            username = data.validated_data['name']
            email = data.validated_data['email']
            password = data.validated_data['password']
            user = UsersModel.objects.filter(name=username).first()
            if user is None:
                user = UsersModel.objects.filter(email=email).first()
                if user is None:
                    if password == confirm_password:
                        token = get_random_string(80)
                        new_user = UsersModel(name=username, email=email, emailActivateCode=activeCode(6), token=token,
                                              is_active=False)
                        new_user.set_password(password)
                        # send email
                        new_user.save()
                        return Response({'message': 'accept', 'token': token})
                    else:
                        return Response({'message': 'رمزعبور با تکرار آن مطابقت ندارد'})
                else:
                    return Response({'message': 'این ایمیل قبلا ثبت شده است'})
            else:
                return Response({'message': 'این نام کاربری قبلا انتخاب شده است'})
        else:
            return Response({'message': 'لطفا اطلاعات خود را به درستی وارد کند'})


class ConfirmEmailView(View):
    def get(self, request, token):
        user = UsersModel.objects.filter(token=token).first()
        if user is None:
            return redirect('404')
        if user.is_active:
            return redirect('404')
        return render(request, 'confirm-email.html')

    def post(self, request, token):
        user = UsersModel.objects.filter(token=token).first()
        user.emailActivateCode = activeCode(6)
        # send email
        user.save()
        return render(request, 'confirm-email.html')


class ConfirmActiveCodeAPIView(APIView):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request, token):
        return Response({'message': 'get is not allowed'})

    def post(self, request, token):
        user = UsersModel.objects.filter(token=token).first()
        if user is not None:
            data = ActiveCodeSerializer(data=request.data)
            if data.is_valid():
                if user.emailActivateCode == data.validated_data['emailActivateCode']:
                    user.is_active = True
                    user.emailActivateCode = activeCode(6)
                    user.token = get_random_string(80)
                    user.save()
                    return Response({'message': 'accept'})
                else:
                    return Response({'message': 'کد فعالسازی اشتباه است'})
            else:
                return Response({'message': 'لطفا کد فعالسازی خود را به درستی وارد کند'})
        else:
            return Response({'message': 'wrong user token'})


class LoginView(View):
    def get(self, request):
        return render(request, 'login-page.html')


class LoginAPIView(APIView):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'message': 'get is not allowed'})

    def post(self, request, *args, **kwargs):
        data = LoginSerializer(data=request.data)
        if data.is_valid():
            email = data.validated_data['email']
            password = data.validated_data['password']
            user = UsersModel.objects.filter(email=email).first()
            if user is not None:
                if user.check_password(password):
                    if user.is_active:
                        login(request, user)
                        return Response({'message': 'accept'})
                    else:
                        return Response({'message': 'نام کاربری یا رمز عبور اشتباه است'})
                else:
                    return Response({'message': 'نام کاربری یا رمز عبور اشتباه است'})
            else:
                return Response({'message': 'نام کاربری یا رمز عبور اشتباه است'})
        else:
            return Response({'message': 'لطفا اطلاعات خود را به درستی وارد کند'})


class ForgetPasswordView(View):
    def get(self, request):
        return render(request, 'forget-password-page.html')

    def post(self, request):
        pass


class ForgetPasswordAPIView(APIView):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'message': 'get is not allowed'})

    def post(self, request, *args, **kwargs):
        data = ForgetPasswordSerializer(data=request.data)
        if data.is_valid():
            email = data.validated_data['email']
            username = data.validated_data['name']
            user = UsersModel.objects.filter(email=email, name=username).first()
            if user is not None:
                if user.is_active:
                    user.emailActivateCode = activeCode(6)
                    user.token = get_random_string(80)
                    user.save()
                    # send email
                    return Response({'message': 'accept', 'token': user.token})
                else:
                    return Response({'message': 'نام کاربری یا ایمیل اشتباه است'})
            else:
                return Response({'message': 'نام کاربری یا ایمیل اشتباه است'})
        else:
            return Response({'message': 'لطفا اطلاعات خود را به درستی وارد کند'})


class ForgetPasswordConfirmView(View):
    def get(self, request, token):
        user = UsersModel.objects.filter(token=token).first()
        if user is None:
            return redirect('404')
        if not user.is_active:
            return redirect('404')
        return render(request, 'forget-password-confirm-page.html')

    def post(self, request, token):
        user = UsersModel.objects.filter(token=token).first()
        user.emailActivateCode = activeCode(6)
        # send email
        user.save()
        return render(request, 'forget-password-confirm-page.html')


class ForgetPasswordConfirmAPIView(APIView):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request, token):
        return Response({'message': 'get is not allowed'})

    def post(self, request, token):
        user = UsersModel.objects.filter(token=token).first()
        if user is not None:
            data = ActiveCodeSerializer(data=request.data)
            if data.is_valid():
                if user.emailActivateCode == data.validated_data['emailActivateCode']:
                    return Response({'message': 'accept', 'code': user.emailActivateCode})
                else:
                    return Response({'message': 'کد فعالسازی اشتباه است'})
            else:
                return Response({'message': 'لطفا کد فعالسازی خود را به درستی وارد کند'})
        else:
            return Response({'message': 'wrong user token'})


class ChangePasswordView(View):
    def get(self, request, token, code):
        user = UsersModel.objects.filter(token=token, emailActivateCode=code).first()
        if user is None:
            return redirect('404')
        if not user.is_active:
            return redirect('404')
        return render(request, 'change-password-page.html')

    def post(self, request, token, code):
        user = UsersModel.objects.filter(token=token).first()
        user.emailActivateCode = activeCode(6)
        # send email
        user.save()
        return render(request, 'change-password-page.html')


class ChangePasswordAPIView(APIView):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request, token, code):
        return Response({'message': 'get is not allowed'})

    def post(self, request, token, code, *args, **kwargs):
        user = UsersModel.objects.filter(token=token, emailActivateCode=code).first()
        if user is not None:
            data = ChangePasswordSerializer(data=request.data)
            confirm_password = request.data['confirmPassword']
            if data.is_valid():
                password = data.validated_data['password']
                if password == confirm_password:
                    user.emailActivateCode = activeCode(6)
                    user.token = get_random_string(80)
                    user.set_password(password)
                    user.save()
                    return Response({'message': 'accept'})
                else:
                    return Response({'message': 'رمزعبور با تکرار آن مطابقت ندارد'})
            else:
                return Response({'message': 'لطفا اطلاعات خود را به درستی وارد کند'})
        else:
            return Response({'message': 'token or active code is wrong'})