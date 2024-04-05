from django.contrib import admin
from .models import *

# Register your models here.


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['title', 'isActive']
    prepopulated_fields = {
        'slug': ['title']
    }


class ColorAdmin(admin.ModelAdmin):
    prepopulated_fields = {
        'slug': ['title']
    }


class SizeAdmin(admin.ModelAdmin):
    prepopulated_fields = {
        'slug': ['title']
    }


class ProductsAdmin(admin.ModelAdmin):
    prepopulated_fields = {
        'slug': ['title', 'price']
    }


admin.site.register(ProductsModel, ProductsAdmin)
admin.site.register(CategoryModel, CategoryAdmin)
admin.site.register(ColorModel, ColorAdmin)
admin.site.register(ProductsImagesModel)
admin.site.register(SizeModel, SizeAdmin)
admin.site.register(CommentsModel)
# admin.site.register(StrengthsComment)
# admin.site.register(WeakPointsComment)
