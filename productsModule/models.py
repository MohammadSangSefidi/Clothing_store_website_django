import datetime

from django.db import models
from django.utils import timezone


class CategoryModel(models.Model):
    title = models.CharField(max_length=100, verbose_name='عنوان')
    parent = models.ForeignKey('CategoryModel', on_delete=models.CASCADE, null=True, blank=True,
                               verbose_name='دسته بندی اصلی')
    image = models.ImageField(upload_to='images/category/', null=True, blank=True, verbose_name='عکس')
    slug = models.SlugField(unique=True, allow_unicode=True, verbose_name='عنوان در Url')
    isActive = models.BooleanField(verbose_name='فعال/غیر فعال')
    isDelete = models.BooleanField(verbose_name='حذف شود/حذف نشود')

    def __str__(self):
        if self.parent == None:
            return f'دسته بندی : {self.title}'
        return f'دسته بندی : {self.title} - زیر دسته : {self.parent.title}'

    def count(self):
        if self.parent == None:
            cout = 0
            categories = self.categorymodel_set.all()
            for category in categories:
                cout += len(category.productsmodel_set.all())
            return cout + len(self.productsmodel_set.all())
        else:
            return len(self.productsmodel_set.all())

    def image_url(self):
        if self.image != None:
            try:
                return self.image.url
            except:
                return None
        else:
            return None

    class Meta:
        verbose_name = 'دسته بندی'
        verbose_name_plural = 'دسته بندی ها'


class ColorModel(models.Model):
    title = models.CharField(max_length=100, verbose_name='عنوان')
    colorCode = models.CharField(max_length=100, null=True, verbose_name='کد رنگ')
    slug = models.SlugField(unique=True, allow_unicode=True, verbose_name='عنوان در Url')
    isActive = models.BooleanField(verbose_name='فعال/غیر فعال')
    isDelete = models.BooleanField(verbose_name='حذف شود/حذف نشود')

    def __str__(self):
        return f'رنگ : {self.title}'

    class Meta:
        verbose_name = 'رنگ'
        verbose_name_plural = 'رنگ ها'


class SizeModel(models.Model):
    title = models.CharField(max_length=100, verbose_name='عنوان')
    slug = models.SlugField(unique=True, allow_unicode=True, verbose_name='عنوان در Url')
    isActive = models.BooleanField(verbose_name='فعال/غیر فعال')
    isDelete = models.BooleanField(verbose_name='حذف شود/حذف نشود')

    def __str__(self):
        return f'سایز : {self.title}'

    class Meta:
        verbose_name = 'سایز'
        verbose_name_plural = 'سایز ها'


class ProductsModel(models.Model):
    title = models.CharField(max_length=100, verbose_name='عنوان')
    price = models.IntegerField(verbose_name='قیمت')
    discount = models.IntegerField(null=True, verbose_name='درصد تخفیف')
    amazing_time = models.DateTimeField(null=True, verbose_name='تاریخ اتمام شگفت انگیز')
    is_amazing = models.BooleanField(default=False, verbose_name='شگفت انگیز هست/نیست')
    amazing_discount = models.IntegerField(default=0, verbose_name='درصد تخفیف شگفت انگیز')
    count = models.IntegerField(verbose_name='تعداد در انبار')
    category = models.ForeignKey(CategoryModel, on_delete=models.CASCADE, verbose_name='دسته بندی')
    color = models.ManyToManyField(ColorModel, verbose_name='رنگ ها', blank=True)
    size = models.ManyToManyField(SizeModel, verbose_name='سایز', blank=True)
    brand = models.CharField(max_length=100, null=True, verbose_name='برند')
    country = models.CharField(max_length=200, null=True, verbose_name='کشور')
    seller = models.CharField(max_length=200, null=True, verbose_name='فروشنده')
    shortDes = models.TextField(null=True, verbose_name='توضیحات کوتاه')
    sell_count = models.IntegerField(default=0, verbose_name='مقدار فروش')
    slug = models.SlugField(unique=True, allow_unicode=True, verbose_name='عنوان در Url')
    isActive = models.BooleanField(verbose_name='فعال/غیر فعال')
    isDelete = models.BooleanField(verbose_name='حذف شود/حذف نشود')

    def amazing(self):
        if self.is_amazing:
            self.productsimagesmodel_set.first()
            if self.amazing_time > timezone.now():
                return self.amazing_discount
            else:
                return 0
        else:
            return 0

    def amazing_date_str(self):
        if self.amazing_time:
            return datetime.datetime.strftime(self.amazing_time, '%Y-%m-%d')
        else:
            return None

    def amazing_time_str(self):
        if self.amazing_time:
            return datetime.datetime.strftime(self.amazing_time, '%H:%M')
        else:
            return None

    def score(self):
        count = 0
        comments = self.commentsmodel_set.all()
        for comment in comments:
            count += int(comment.score)
        if count > 0 :
            return round(count / len(comments), 1)
        else:
            return 0

    def commentsCount(self):
        comments = self.commentsmodel_set.all()
        return len(comments)

    def __str__(self):
        return f'عنوان: {self.title} قیمت: {self.price} دسته بندی: {self.category.title}'

    class Meta:
        verbose_name = 'محصول'
        verbose_name_plural = 'محصولات'


class ProductsImagesModel(models.Model):
    title = models.CharField(max_length=100, verbose_name='عنوان')
    image = models.ImageField(upload_to='images/products/', verbose_name='عکس')
    product = models.ForeignKey(ProductsModel, on_delete=models.CASCADE, verbose_name='محصول')
    isActive = models.BooleanField(verbose_name='فعال/غیر فعال')
    isDelete = models.BooleanField(verbose_name='حذف شود/حذف نشود')

    def __str__(self):
        return f'عکس :{self.title} محصول :{self.product.title}'

    class Meta:
        verbose_name = 'عکس محصول'
        verbose_name_plural = 'عکس محصولات'


class CommentsModel(models.Model):
    product = models.ForeignKey(ProductsModel, null=True, on_delete=models.CASCADE, verbose_name='محصول')
    commentText = models.TextField(verbose_name='متن نظر')
    email = models.EmailField(verbose_name='ایمل فرستنده')
    name = models.CharField(max_length=100, verbose_name='نام فرستنده')
    score = models.IntegerField(verbose_name='نمره فرستنده')
    createDate = models.DateTimeField(auto_now_add=True, null=True, verbose_name='تاریخ ثبت')
    isActive = models.BooleanField(verbose_name='فعال/غیر فعال')
    isDelete = models.BooleanField(verbose_name='حذف شود/حذف نشود')

    # acticle = models.ForeignKey()

    def __str__(self):
        return f'نام :{self.name} ایمیل :{self.email} محصول :{self.product.title}'

    class Meta:
        verbose_name = 'نظر'
        verbose_name_plural = 'نظرات'



