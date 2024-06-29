from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.utils.decorators import method_decorator
from django.views import View
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from homeModule.authentication import TokenAuthenticationCustom
from productsModule.serializers import ProductsSerializer
from usersModule.models import UsersModel
from .models import AddressModel
from .serializers import AddressSerializer, ChangePasswordSerializer


# Create your views here.


@method_decorator(login_required, 'dispatch')
class UserPanelView(View):
    def get(self, request, num):
        return render(request, 'user-panel-page.html', {
            'num': num
        })

    def post(self, request, num):
        pass


@method_decorator(login_required, 'dispatch')
class LogOutView(View):
    def get(self, request, num):
        logout(request)
        return redirect('loginPage')

    def post(self, request, num):
        pass


class FavoriteProductsAPIView(APIView):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request, num, userId):
        user = UsersModel.objects.filter(id=userId).first()
        queryset = user.favorites.all()
        data = ProductsSerializer(queryset, many=True).data
        return Response(data)

    def post(self, request, num, userId):
        return Response({'message': 'post is not allowed'})


class AddressAPIView(APIView):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request, num, userId):
        user = UsersModel.objects.filter(id=userId).first()
        queryset = user.addressmodel_set.all()
        data = AddressSerializer(queryset, many=True).data
        return Response(data)

    def post(self, request, num, userId):
        return Response({'message': 'post is not allowed'})


class CreateAddressAPIView(APIView):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request, num, userId):
        return Response({'message': 'get is not allowed'})

    def post(self, request, num, userId, *args, **kwargs):
        data = AddressSerializer(data=request.data)
        if data.is_valid():
            city = data.validated_data['city']
            state = data.validated_data['state']
            address = data.validated_data['address']
            user = UsersModel.objects.filter(id=userId).first()
            if user is not None:
                newAddress = AddressModel(city=city, state=state, address=address, user=user)
                newAddress.save()
                return Response({'message': 'accept'})
            else:
                return Response({'message': 'آیدی کاربر درست نیست.'})
        else:
            return Response({'message': 'لطفا اطلاعات خود را به درستی وارد کند.'})


class DeleteAddressAPIView(APIView):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request, num, userId, addressId):
        user = UsersModel.objects.filter(id=int(userId)).first()
        if user is not None:
            address = AddressModel.objects.filter(id=int(addressId), user_id=int(userId)).first()
            if address is not None:
                address.delete(keep_parents=True)
                return Response({'message': 'accept'})
            else:
                return Response({'message': 'آیدی آدرس درست نیست.'})
        else:
            return Response({'message': 'آیدی کاربر درست نیست.'})

    def post(self, request, num, userId, addressId):
        return Response({'message': 'post is not allowed'})


class ChangePasswordAPIView(APIView):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request, num, userId):
        return Response({'message': 'get is not allowed'})

    def post(self, request, num, userId, *args, **kwargs):
        data = ChangePasswordSerializer(data=request.data)
        confirm_password = request.data['confirmPassword']
        if data.is_valid():
            oldPassword = data.validated_data['oldPassword']
            newPassword = data.validated_data['password']
            user = UsersModel.objects.filter(id=userId).first()
            if user is not None:
                if user.check_password(oldPassword):
                    if newPassword == confirm_password:
                        user.set_password(newPassword)
                        user.save()
                        return Response({'message': 'accept'})
                    else:
                        return Response({'message': 'رمز عبور با تکرار آن مطابقت ندارد.'})
                else:
                    return Response({'message': 'رمز عبور اشتباه است.'})
            else:
                return Response({'message': 'کاربر پیدا نشد.'})
        else:
            return Response({'message': 'لطفا اطلاعات خود را به درستی وارد کند'})
