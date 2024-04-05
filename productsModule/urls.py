from django.urls import path
from .views import *

urlpatterns = [
    path('search/<value>/', ProductSearchView.as_view(), name='searchPage'),
    path('search/<value>/gotResult/', ProductSearchAPIView.as_view()),
    path('categories/', CategoriesView.as_view(), name='categories'),
    path('categories/gotCategory/', CategoriesAPIView.as_view()),
    path('gotProducts/', ProductsAPIView.as_view()),
    path('categories/<category>/', ProductsCategoryView.as_view(), name='products-category'),
    path('categories/<category>/gotProducts/', ProductsCategoryAPIView.as_view()),
    path('categories/<category>/<child>/', ProductsCategoryChildView.as_view(), name='products-category-child'),
    path('categories/<category>/<child>/gotProducts/', ProductsCategoryChildAPIView.as_view()),
    path('detail/<slug>/', ProductDetailView.as_view(), name='product-detail'),
    path('detail/<slug>/gotProduct/', ProductDetailAPIView.as_view()),
    path('detail/<slug>/gotComments/', ProductDetailCommentsAPIView.as_view()),
    path('detail/<slug>/sendComments/', ProductDetailSendCommentsAPIView.as_view())
]