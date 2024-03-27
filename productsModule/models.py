from django.db import models


class CategoryModel(models.Model):
    title = models.CharField(max_length=100, verbose_name='عنوان')
    parent = models.ForeignKey('CategoryModel', on_delete=models.CASCADE, null=True, blank=True,
                               verbose_name='دسته بندی اصلی')
    slug = models.SlugField(unique=True, allow_unicode=True, verbose_name='عنوان در Url')
    isActive = models.BooleanField(verbose_name='فعال/غیر فعال')
    isDelete = models.BooleanField(verbose_name='حذف شود/حذف نشود')

    def __str__(self):
        if self.parent == None:
            return f'دسته بندی : {self.title}'
        return f'دسته بندی : {self.title} - زیر دسته : {self.parent.title}'

    class Meta:
        verbose_name = 'دسته بندی'
        verbose_name_plural = 'دسته بندی ها'


class ColorModel(models.Model):
    title = models.CharField(max_length=100, verbose_name='عنوان')
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
    count = models.IntegerField(verbose_name='تعداد در انبار')
    category = models.ForeignKey(CategoryModel, on_delete=models.CASCADE, verbose_name='دسته بندی')
    color = models.ManyToManyField(ColorModel, verbose_name='رنگ ها', blank=True)
    size = models.ManyToManyField(SizeModel, verbose_name='سایز', blank=True)
    slug = models.SlugField(unique=True, allow_unicode=True, verbose_name='عنوان در Url')
    isActive = models.BooleanField(verbose_name='فعال/غیر فعال')
    isDelete = models.BooleanField(verbose_name='حذف شود/حذف نشود')

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
