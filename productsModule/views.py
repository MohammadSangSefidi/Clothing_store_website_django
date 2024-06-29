from django.core.signals import request_started
from django.http import HttpRequest
from django.shortcuts import render, redirect
from django.views import View
from django.contrib.auth import logout
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination

from homeModule.authentication import TokenAuthenticationCustom
from .models import *
from .serializers import CategorySerializer, ProductsSerializer, CommentsSerializer
from usersModule.models import UsersModel

# Create your views here.


class CategoriesView(View):
    def get(self, request, num):
        queryset = CategoryModel.objects.filter(parent=None, isActive=True, isDelete=False)
        return render(request, 'category-page.html', {
            'categories': queryset,
            'num': num
        })

    def post(self, request, num):
        pass


class CategoriesAPIView(APIView):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        queryset = CategoryModel.objects.filter(isActive=True, isDelete=False)
        data = CategorySerializer(queryset, many=True).data
        return Response(data)

    def post(self, request):
        return Response({'message': 'post is not allowed'})


class ProductsAPIView(APIView, PageNumberPagination):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        queryset = ProductsModel.objects.filter(isActive=True, isDelete=False)
        paginated_products = self.paginate_queryset(queryset, request, view=self)
        data = ProductsSerializer(paginated_products, many=True).data
        return self.get_paginated_response(data)

    def post(self, request):
        return Response({'message': 'post is not allowed'})


class BestSellingProductsAPIView(APIView):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        queryset = ProductsModel.objects.filter(isActive=True, isDelete=False).order_by('sell_count')[:12]
        data = ProductsSerializer(queryset, many=True).data
        return Response(data)

    def post(self, request):
        return Response({'message': 'post is not allowed'})


class NewestProductsAPIView(APIView):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        queryset = ProductsModel.objects.filter(isActive=True, isDelete=False).order_by('id')[:12]
        data = ProductsSerializer(queryset, many=True).data
        return Response(data)

    def post(self, request):
        return Response({'message': 'post is not allowed'})


class ProductsCategoryView(View):
    def get(self, request, slug, num):
        category = CategoryModel.objects.filter(slug=slug, parent=None).first()
        if category is not None:
            children = category.categorymodel_set.all(),
            return render(request, 'products-category-page.html', {
                'title': category.title,
                'count': category.count(),
                'children': children[0],
                'len': len(children[0]),
                'categories': CategoryModel.objects.filter(isActive=True, isDelete=False, parent=None).all(),
                'num': num,
                'slug': slug
            })
        else:
            return redirect('404')

    def post(self, request, category, num):
        pass


class ProductsCategoryAPIView(APIView, PageNumberPagination):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request:HttpRequest, slug, num):
        category = CategoryModel.objects.filter(slug=slug).first()
        if category is not None and category.parent is None:
            queryset = ProductsModel.objects.filter(category__parent=category, isActive=True, isDelete=False)
            if len(queryset) == 0:
                queryset = ProductsModel.objects.filter(category=category, isActive=True, isDelete=False)
            paginated_products = self.paginate_queryset(queryset, request, view=self)
            data = ProductsSerializer(paginated_products, many=True).data
            return self.get_paginated_response(data)
        else:
            return Response({'message': 'دسته بندی پیدا نشد'})

    def post(self, request, slug, num):
        return Response({'message': 'post is not allowed'})


class ProductsCategoryChildView(View):
    def get(self, request, slug, child, num):
        category = CategoryModel.objects.filter(slug=child, parent__slug=slug).first()
        if category is not None:
            children = category.parent.categorymodel_set.all(),
            return render(request, 'products-category-child-page.html', {
                'title': category.title,
                'count': category.count(),
                'parent': category.parent.title,
                'children': children[0],
                'slug': slug,
                'child': child,
                'num': num
            })
        else:
            return redirect('404')

    def post(self, request, slug, child, num):
        pass


class ProductsCategoryChildAPIView(APIView, PageNumberPagination):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request, slug, child, num):
        category = CategoryModel.objects.filter(slug=child, parent__slug=slug).first()
        if category is not None:
            queryset = ProductsModel.objects.filter(category=category, category__parent=category.parent, isActive=True,
                                                    isDelete=False)
            paginated_products = self.paginate_queryset(queryset, request, view=self)
            data = ProductsSerializer(paginated_products, many=True).data
            return self.get_paginated_response(data)
        else:
            return Response({'message': 'دسته بندی پیدا نشد'})

    def post(self, request, slug, child, num):
        return Response({'message': 'post is not allowed'})


class ProductDetailView(View):
    def get(self, request:HttpRequest, slug):
        product = ProductsModel.objects.filter(slug=slug).first()
        if product is not None:
            if request.user.is_authenticated:
                user = UsersModel.objects.filter(id=request.user.id).first()
                if product in user.favorites.all():
                    return render(request, 'product-detail-page.html', {
                        'title': product.title,
                        'parent': product.category.parent.title,
                        'slug': product.slug,
                        'parent_slug': product.category.parent.slug,
                        'category': product.category.title,
                        'category_slug': product.category.slug,
                        'productIsFavorite': True
                    })
                else:
                    return render(request, 'product-detail-page.html', {
                        'title': product.title,
                        'parent': product.category.parent.title,
                        'slug': product.slug,
                        'parent_slug': product.category.parent.slug,
                        'category': product.category.title,
                        'category_slug': product.category.slug,
                        'productIsFavorite': False
                    })
            else:
                return render(request, 'product-detail-page.html', {
                    'title': product.title,
                    'parent': product.category.parent.title,
                    'slug': product.slug,
                    'parent_slug': product.category.parent.slug,
                    'category': product.category.title,
                    'category_slug': product.category.slug,
                    'productIsFavorite': False
                })
        else:
            return redirect('404')

    def post(self, request, slug):
        # product = ProductsModel.objects.filter(slug=slug).first()
        # if product is not None:
        #     return render(request, 'product-detail-page.html', {
        #         'title': product.title,
        #         'parent': product.category.parent.title,
        #         'parent_slug': product.category.parent.slug,
        #         'category': product.category.title,
        #         'category_slug': product.category.slug
        #     })
        # else:
        return redirect('404')


class ProductDetailAPIView(APIView):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request, slug):
        queryset = ProductsModel.objects.filter(slug=slug, isActive=True, isDelete=False).first()
        if queryset is not None:
            data = ProductsSerializer(queryset).data
            return Response(data)
        else:
            return Response({'message': 'محصول مورد نظر پیدا نشد'})

    def post(self, request, slug):
        return Response({'message': 'post is not allowed'})


class ProductDetailCommentsAPIView(APIView):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request, slug):
        product = ProductsModel.objects.filter(slug=slug).first()
        queryset = CommentsModel.objects.filter(product=product, isActive=True, isDelete=False).order_by('-createDate')
        if len(queryset) != 0:
            data = CommentsSerializer(queryset, many=True).data
            return Response(data)
        else:
            return Response({'message': 'نظری برای محصول مورد نظر پیدا نشد'})

    def post(self, request, slug):
        return Response({'message': 'post is not allowed'})


class ProductDetailSendCommentsAPIView(APIView):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request, slug):
        return Response({'message': 'post is not allowed'})

    def post(self, request, slug, *args, **kwargs):
        data = CommentsSerializer(data=request.data)
        score = request.data['score']
        if data.is_valid():
            if int(score) in [1,2,3,4,5]:
                name = data.validated_data['name']
                email = data.validated_data['email']
                commentText = data.validated_data['commentText']
                product = ProductsModel.objects.filter(slug=slug).first()
                if product is not None:
                    newComment = CommentsModel(product=product, name=name, email=email, commentText=commentText,
                                               score=int(score), isActive=True, isDelete=False)
                    newComment.save()
                    return Response({'message': 'accept'})
                else:
                    return Response({'message': 'محصول مورد نظر یافت نشد'})
            else:
                return Response({'message': 'لطفا اطلاعات خود را به درستی وارد کند'})
        else:
            return Response({'message': 'لطفا اطلاعات خود را به درستی وارد کند'})


class ProductSearchView(View):
    def get(self, request, value, num):
        product = ProductsModel.objects.filter(title__contains=value, isActive=True, isDelete=False).first()
        if product is not None:
            queryset = CategoryModel.objects.filter(parent=None, isActive=True, isDelete=False)

            return render(request, 'product-search-page.html',{
                'value': value,
                'categories': queryset,
                'num': num
            })
        else:
            return render(request, 'product-search-not-found-page.html')

    def post(self, request, value, num):
        pass


class ProductSearchAPIView(APIView, PageNumberPagination):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request, value, num):
        product = ProductsModel.objects.filter(title__contains=value, isActive=True, isDelete=False)
        paginated_products = self.paginate_queryset(product, request, view=self)
        date = ProductsSerializer(paginated_products, many=True).data
        return self.get_paginated_response(date)

    def post(self, request, value, num):
        return Response({'message': 'post is not allowed'})


class CheckProductFavoriteAPIView(APIView):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request:HttpRequest, slug, userId):
        if userId != 'None':
            user = UsersModel.objects.filter(id=int(userId)).first()
            product = ProductsModel.objects.filter(slug=slug).first()
            if product is not None:
                if product in user.favorites.all():
                    return Response({'message': 'accept'})
                else:
                    return Response({'message': 'not favorite'})
            else:
                return Response({'message': 'slug is not valid'})
        else:
            return Response({'message': 'login is required'})

    def post(self, request:HttpRequest, slug, userId):
        return Response({'message': 'post is not allowed'})


class AddProductFavoriteAPIView(APIView):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request, slug, userId):
        return Response({'message': 'get is not allowed'})

    def post(self, request:HttpRequest, slug, userId):
        if userId != 'None':
            user = UsersModel.objects.filter(id=int(userId)).first()
            product = ProductsModel.objects.filter(slug=slug).first()
            if product is not None:
                if product not in user.favorites.all():
                    user.favorites.add(product)
                    user.save()
                    return Response({'message': 'accept add'})
                else:
                    user.favorites.remove(product)
                    user.save()
                    return Response({'message': 'accept remove'})
            else:
                return Response({'message': 'slug is not valid'})
        else:
            return Response({'message': 'login is required'})

