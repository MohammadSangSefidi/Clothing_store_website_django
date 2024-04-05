from django.shortcuts import render, redirect
from django.views import View
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from homeModule.authentication import TokenAuthenticationCustom
from .models import *
from .serializers import CategorySerializer, ProductsSerializer, CommentsSerializer


# Create your views here.


class CategoriesView(View):
    def get(self, request):
        queryset = CategoryModel.objects.filter(parent=None, isActive=True, isDelete=False)
        return render(request, 'category-page.html', {
            'categories': queryset
        })

    def post(self, request):
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


class ProductsAPIView(APIView):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        queryset = ProductsModel.objects.filter(isActive=True, isDelete=False)
        data = ProductsSerializer(queryset, many=True).data
        return Response(data)

    def post(self, request):
        return Response({'message': 'post is not allowed'})


class ProductsCategoryView(View):
    def get(self, request, category):
        category = CategoryModel.objects.filter(slug=category, parent=None).first()
        if category is not None:
            children = category.categorymodel_set.all(),
            return render(request, 'products-category-page.html', {
                'title': category.title,
                'count': category.count(),
                'children': children[0],
                'len': len(children[0]),
                'categories': CategoryModel.objects.filter(isActive=True, isDelete=False, parent=None).all()
            })
        else:
            return redirect('404')

    def post(self, request, category):
        pass


class ProductsCategoryAPIView(APIView):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request, category):
        category = CategoryModel.objects.filter(slug=category).first()
        if category is not None and category.parent is None:
            queryset = ProductsModel.objects.filter(category__parent=category, isActive=True, isDelete=False)
            if len(queryset) == 0:
                queryset = ProductsModel.objects.filter(category=category, isActive=True, isDelete=False)
            data = ProductsSerializer(queryset, many=True).data
            return Response(data)
        else:
            return Response({'message': 'دسته بندی پیدا نشد'})

    def post(self, request, category):
        return Response({'message': 'post is not allowed'})


class ProductsCategoryChildView(View):
    def get(self, request, category, child):
        category = CategoryModel.objects.filter(slug=child, parent__slug=category).first()
        if category is not None:
            children = category.parent.categorymodel_set.all(),
            return render(request, 'products-category-child-page.html', {
                'title': category.title,
                'count': category.count(),
                'parent': category.parent.title,
                'children': children[0],
            })
        else:
            return redirect('404')

    def post(self, request, category):
        pass


class ProductsCategoryChildAPIView(APIView):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request, category, child):
        category = CategoryModel.objects.filter(slug=child, parent__slug=category).first()
        if category is not None:
            queryset = ProductsModel.objects.filter(category=category, category__parent=category.parent, isActive=True,
                                                    isDelete=False)
            data = ProductsSerializer(queryset, many=True).data
            return Response(data)
        else:
            return Response({'message': 'دسته بندی پیدا نشد'})

    def post(self, request, category, child):
        return Response({'message': 'post is not allowed'})


class ProductDetailView(View):
    def get(self, request, slug):
        product = ProductsModel.objects.filter(slug=slug).first()
        if product is not None:
            return render(request, 'product-detail-page.html', {
                'title': product.title,
                'parent': product.category.parent.title,
                'slug': product.slug,
                'parent_slug': product.category.parent.slug,
                'category': product.category.title,
                'category_slug': product.category.slug
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
                                               score=int(score), isActive=False, isDelete=False)
                    newComment.save()
                    return Response({'message': 'accept'})
                else:
                    return Response({'message': 'محصول مورد نظر یافت نشد'})
            else:
                return Response({'message': 'لطفا اطلاعات خود را به درستی وارد کند'})
        else:
            return Response({'message': 'لطفا اطلاعات خود را به درستی وارد کند'})


class ProductSearchView(View):
    def get(self, request, value):
        product = ProductsModel.objects.filter(title__contains=value, isActive=True, isDelete=False).first()
        if product is not None:
            queryset = CategoryModel.objects.filter(parent=None, isActive=True, isDelete=False)
            return render(request, 'product-search-page.html',{
                'value': value,
                'categories': queryset
            })
        else:
            return render(request, 'product-search-not-found-page.html')

    def post(self, request, value):
        pass


class ProductSearchAPIView(APIView):
    authentication_classes = [TokenAuthenticationCustom]
    permission_classes = [IsAuthenticated]

    def get(self, request, value):
        product = ProductsModel.objects.filter(title__contains=value, isActive=True, isDelete=False)
        date = ProductsSerializer(product, many=True).data
        return Response(date)

    def post(self, request, value):
        return Response({'message': 'post is not allowed'})