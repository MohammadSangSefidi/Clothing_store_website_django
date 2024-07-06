from django.urls import path
from .views import *

urlpatterns = [
    path('', HomePageView.as_view(), name='home-url'),
    path('home-page/gotAmazingProducts/', AmazingProductsAPIView.as_view()),
    # path('home-page/gotSliders/', HomePageSliderImageAPIView.as_view()),
    path('404_page/', NotFoundView.as_view(), name='404'),
    path('about-us/', AboutUsView.as_view(), name='about-us'),
]