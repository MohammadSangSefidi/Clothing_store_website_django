from django.shortcuts import render
from django.views import View
from productsModule.models import ProductsImagesModel
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import *
from homeModule.authentication import TokenAuthenticationCustom
from .models import *
from productsModule.models import ProductsModel
from productsModule.serializers import ProductsSerializer


# from rest_framework.authentication import TokenAuthentication

# Create your views here.


class HomePageView(View):
    def get(self, request):
        return render(request, 'home-page.html', {
            'images': HomePageSliderImageModel.objects.filter(isActive=True, isDelete=False)
        })

    def post(self, request):
        pass


class AmazingProductsAPIView(APIView):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        queryset = ProductsModel.objects.filter(is_amazing=True, isActive=True, isDelete=False)
        data = ProductsSerializer(queryset, many=True).data
        return Response(data)

    def post(self, request):
        return Response({'message': 'post is not allowed'})


# class HomePageSliderImageAPIView(APIView):
#     authentication_classes = [TokenAuthenticationCustom]
#     permission_classes = [IsAuthenticated]
#
#     def get(self, request):
#         queryset = HomePageSliderImageModel.objects.filter(isActive=True, isDelete=False)
#         data = SliderImageSerializer(queryset, many=True).data
#         return Response(data)
#
#     def post(self, request):
#         return Response({'message': 'post is not allowed'})

class NotFoundView(View):
    def get(self, request):
        return render(request, '404-page.html')

    def post(self, request):
        pass


class AboutUsView(View):
    def get(self, request):
        return render(request, 'about-us.html')

    def post(self, request):
        pass


def headerPartialView(request):
    return render(request, 'base/header.html')


def footerPartialView(request):
    return render(request, 'base/footer.html')
