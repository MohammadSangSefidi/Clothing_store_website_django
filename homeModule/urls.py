from django.urls import path
from .views import HomePageView, NotFoundView, AboutUsView

urlpatterns = [
    path('', HomePageView.as_view(), name='home-url'),
    path('404_page/', NotFoundView.as_view(), name='404'),
    path('about-us', AboutUsView.as_view(), name='about-us'),
]