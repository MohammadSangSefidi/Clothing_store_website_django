from django.urls import path
from .views import *

urlpatterns = [
    path('search/<value>/<num>', ProductSearchView.as_view(), name='searchPage'),
    path('search/<value>/<num>/gotResult/', ProductSearchAPIView.as_view()),
    path('categories/<num>', CategoriesView.as_view(), name='categories'),
    path('categories/gotCategory/', CategoriesAPIView.as_view()),
    path('gotProducts/', ProductsAPIView.as_view()),
    path('gotProducts/bestSelling/', BestSellingProductsAPIView.as_view()),
    path('gotProducts/newest/', NewestProductsAPIView.as_view()),
    path('categories/<slug>/<num>', ProductsCategoryView.as_view(), name='products-category'),
    path('categories/<slug>/<num>/gotProducts/', ProductsCategoryAPIView.as_view()),
    path('categories/<slug>/<child>/<num>', ProductsCategoryChildView.as_view(), name='products-category-child'),
    path('categories/<slug>/<child>/<num>/gotProducts/', ProductsCategoryChildAPIView.as_view()),
    path('detail/<slug>/', ProductDetailView.as_view(), name='product-detail'),
    path('detail/<slug>/gotProduct/', ProductDetailAPIView.as_view()),
    path('detail/<slug>/gotComments/', ProductDetailCommentsAPIView.as_view()),
    path('detail/<slug>/sendComments/', ProductDetailSendCommentsAPIView.as_view()),
    path('detail/<slug>/addFavorite/<userId>/', AddProductFavoriteAPIView.as_view()),
    path('detail/<slug>/checkFavorite/<userId>', CheckProductFavoriteAPIView.as_view()),
]