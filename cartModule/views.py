import datetime

from django.contrib.auth.decorators import login_required
from django.http import HttpRequest
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views import View
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from usersPanelModule.models import AddressModel
from homeModule.authentication import TokenAuthenticationCustom
from productsModule.models import ProductsModel, ColorModel, SizeModel
from usersModule.models import UsersModel
from .models import CartModel, CartsItemsModel
from .serializers import AddToCartSerializer, GotCartsItemsSerializer, ChangeCartItemCountSerializer, \
    GotCartInfoSerializer


@method_decorator(login_required, 'dispatch')
class CartView(View):
    def get(self, request: HttpRequest):
        cart = CartModel.objects.filter(user=request.user, is_paid=False).first()
        if cart is not None:
            if cart.cartsitemsmodel_set.count() > 0:
                return render(request, 'cart-page.html')
        return render(request, 'empty-cart.html')

    def post(self, request):
        pass


@method_decorator(login_required, 'dispatch')
class SuccessPaymentView(View):
    def get(self, request: HttpRequest):
        return render(request, 'succus-payment-page.html')

    def post(self, request):
        pass


@method_decorator(login_required, 'dispatch')
class SelectAddressView(View):
    def get(self, request: HttpRequest):
        cart = CartModel.objects.filter(user=request.user, is_paid=False).first()
        if cart is not None:
            if cart.cartsitemsmodel_set.count() > 0:
                return render(request, 'select-address-page.html', {
                    'sumPrices': cart.sum_prices(),
                    'sumDiscounts': cart.sum_discounts(),
                    'fullPrice': cart.full_price()
                })
        return render(request, 'empty-cart.html')

    def post(self, request):
        pass


class GotCartAPIView(APIView):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request, userId):
        user = UsersModel.objects.filter(id=userId).first()
        if user is not None:
            cart = user.cartmodel_set.filter(is_paid=False).first()
            cartItems = GotCartsItemsSerializer(cart.cartsitemsmodel_set.all(), many=True).data
            cartInfo = GotCartInfoSerializer(cart).data
            return Response({'message': cartItems, 'cartInfo': cartInfo})
        else:
            return Response({'message': 'user is not valid'})

    def post(self, request):
        return Response({'message': 'post is not allowed'})


class AddToCartAPIView(APIView):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'message': 'get is not allowed'})

    def post(self, request):
        data = AddToCartSerializer(data=request.data)
        if data.is_valid():
            userId = request.data['userId']
            user = UsersModel.objects.filter(id=int(userId)).first()
            if user is not None:
                cart, created = CartModel.objects.get_or_create(user=user, is_paid=False, defaults={'user': user})
                count = int(request.data['count'])
                if count > 0:
                    productId = request.data['product']
                    product = ProductsModel.objects.filter(id=int(productId)).first()
                    if product is not None:
                        if product.count >= count:
                            color = None
                            if request.data['color'] != None:
                                color = ColorModel.objects.filter(id=int(request.data['color'])).first()
                            size = None
                            if request.data['size'] != None:
                                size = SizeModel.objects.filter(id=int(request.data['size'])).first()
                            item, itemCreated = CartsItemsModel.objects.get_or_create(cart=cart, product=product,
                                                                                      color=color, size=size, defaults={
                                    'cart': cart,
                                    'product': product,
                                    'color': color,
                                    'size': size,
                                    'count': count
                                })
                            if not itemCreated:
                                if item.count + count <= product.count:
                                    item.count += count
                                    item.save()
                                else:
                                    return Response({'message': 'موجودی محصول کافی نیست.'})

                            return Response({'message': 'accept'})
                        else:
                            return Response({'message': 'موجودی محصول کافی نیست.'})
                    else:
                        return Response({'message': 'آیدی محصول معتبر نیست.'})
                else:
                    return Response({'message': 'مقدار محصول را درست وارد کنید.'})
            else:
                return Response({'message': 'آیدی کاربر معتبر نیست.'})
        else:
            return Response({'message': 'لطفا اطلاعات خود را درست وارد کنید.'})


class ChangeCartItemCountAPIView(APIView):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'message': 'get is not allowed'})

    def post(self, request):
        data = ChangeCartItemCountSerializer(data=request.data)
        if data.is_valid():
            id = request.data['id']
            item = CartsItemsModel.objects.filter(id=id).first()
            if item is not None:
                count = request.data['count']
                add = request.data['add']
                if add:
                    if not item.count + count > item.product.count:
                        item.count += count
                        item.save()
                    else:
                        return Response({'message': 'موجودی کافی نیست.'})
                else:
                    if item.count - count > 0:
                        item.count -= count
                        item.save()
                    else:
                        return Response({'message': 'تعداد از یک کمتر نمی تواند باشد.'})

                return Response({'message': 'accept', 'newPrice': item.final_price(),
                                 'newCartInfo': {'sumPrices': item.cart.sum_prices(),
                                                 'sumDiscounts': item.cart.sum_discounts(),
                                                 'fullPrice': item.cart.full_price()}})
            else:
                return Response({'message': 'آیدی معتبر نیست.'})
        else:
            return Response({'message': 'لطفا اطلاعات خود را درست وارد کنید.'})


class DeleteCartItemAPIView(APIView):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'message': 'get is not allowed'})

    def post(self, request):
        id = request.data['id']
        item = CartsItemsModel.objects.filter(id=id).first()
        if item is not None:
            item.delete(keep_parents=True)
            return Response({'message': 'accept'})
        else:
            return Response({'message': 'آیدی معتبر نیست.'})


class FinishCartAPIView(APIView):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request, userId, addressId):
        cart = CartModel.objects.filter(user_id=userId, is_paid=False).first()
        if cart is not None:
            address = AddressModel.objects.filter(id=addressId).first()
            if address is not None:
                cart.address = address
                cart.is_paid = True
                cart.final_price = cart.full_price()
                cart.paid_date = datetime.datetime.now()
                cart.save()
                return Response({'message': 'accept'})
            else:
                return Response({'message': 'هنوز آدرسی انتخاب نکرده اید.'})
        else:
            return Response({'message': 'آیدی معتبر نیست.'})

    def post(self, request, userId):
        return Response({'message': 'get is not allowed'})