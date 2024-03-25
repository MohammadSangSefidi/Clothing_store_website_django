from django.db import models


class CategoryModel(models.Model):
    title = models.CharField(max_length=100, verbose_name='عنوان')
    slug = models.SlugField(verbose_name='عنوان در Url')
    isActive = models.BooleanField(verbose_name='فعال/غیر فعال')
    isDelete = models.BooleanField(verbose_name='حذف شود/حذف نشود')

    def __str__(self):
        return f'{self.title}دسته بندی : '

    class Meta:
        verbose_name = 'دسته بندی'
        verbose_name_plural = 'دسته بندی ها'


class ColorModel(models.Model):
    title = models.CharField(max_length=100, verbose_name='عنوان')
    slug = models.SlugField(verbose_name='عنوان در Url')
    isActive = models.BooleanField(verbose_name='فعال/غیر فعال')
    isDelete = models.BooleanField(verbose_name='حذف شود/حذف نشود')

    def __str__(self):
        return f'{self.title}رنگ : '

    class Meta:
        verbose_name = 'رنگ'
        verbose_name_plural = 'رنگ ها'


class SizeModel(models.Model):
    title = models.CharField(max_length=100, verbose_name='عنوان')
    slug = models.SlugField(verbose_name='عنوان در Url')
    isActive = models.BooleanField(verbose_name='فعال/غیر فعال')
    isDelete = models.BooleanField(verbose_name='حذف شود/حذف نشود')

    def __str__(self):
        return f'{self.title}سایز : '

    class Meta:
        verbose_name = 'سایز'
        verbose_name_plural = 'سایز ها'


class ProductsModel(models.Model):
    title = models.CharField(max_length=100, verbose_name='عنوان')
    price = models.IntegerField(verbose_name='قیمت')
    description = models.TextField(blank=True, null=True, verbose_name='توضیحات')
    discount = models.IntegerField(null=True, verbose_name='درصد تخفیف')
    count = models.IntegerField(verbose_name='تعداد در انبار')
    category = models.ForeignKey(CategoryModel, on_delete=models.CASCADE, verbose_name='دسته بندی')
    color = models.ManyToManyField(ColorModel, verbose_name='رنگ ها')
    size = models.ForeignKey(SizeModel, on_delete=models.CASCADE, verbose_name='سایز')
    slug = models.SlugField(verbose_name='عنوان در Url')
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
