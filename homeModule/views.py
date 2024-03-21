from django.shortcuts import render
from django.views import View


# Create your views here.

class HomeView(View):
    def get(self, request):
        return render(request, 'home-page.html')

    def post(self):
        pass


def headerPartialView(request):
    return render(request, 'base/header.html')


def footerPartialView(request):
    return render(request, 'base/footer.html')
