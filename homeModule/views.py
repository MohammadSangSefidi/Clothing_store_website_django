from django.shortcuts import render
from django.views import View
from rest_framework.views import APIView
from rest_framework.response import Response
# from rest_framework.authentication import TokenAuthentication
from .authentication import TokenAuthenticationCustom
from rest_framework.permissions import IsAuthenticated

from productsModule.models import CategoryModel
from .serializers import CategorySerializer

# Create your views here.


class HomePageView(View):
    def get(self, request):
        return render(request, 'home-page.html')

    def post(self, request):
        pass


class NotFoundView(View):
    def get(self, request):
        return render(request, '404-page.html')

    def post(self, request):
        pass

def headerPartialView(request):
    return render(request, 'base/header.html')


def footerPartialView(request):
    return render(request, 'base/footer.html')


class CategoriesAPIView(APIView):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        queryset = CategoryModel.objects.filter(isActive=True, isDelete=False)
        data = CategorySerializer(queryset, many=True).data
        return Response(data)

    def post(self, request):
        pass