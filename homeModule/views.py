from django.shortcuts import render
from django.views import View
from productsModule.models import ProductsImagesModel

# from rest_framework.authentication import TokenAuthentication

# Create your views here.


class HomePageView(View):
    def get(self, request):
        return render(request, 'home-page.html', {
            'image': ProductsImagesModel.objects.filter(id=4).first()
        })

    def post(self, request):
        pass


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


