from django.urls import path
from .views import HomePageView, CategoriesAPIView, NotFoundView

urlpatterns = [
    path('', HomePageView.as_view(), name='home-url'),
    path('404_page/', NotFoundView.as_view(), name='404'),
    path('categories/', CategoriesAPIView.as_view())
]