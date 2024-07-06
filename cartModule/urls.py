from django.urls import path
from .views import *

urlpatterns = [
    path('', CartView.as_view(), name='cartPage'),
    path('selectAddressView/', SelectAddressView.as_view(), name='selectAddressPage'),
    path('successPayment/', SuccessPaymentView.as_view(), name='success-payment'),
    path('gotProducts/<userId>/', GotCartAPIView.as_view()),
    path('addToCart/', AddToCartAPIView.as_view()),
    path('changeCartItemCunt/', ChangeCartItemCountAPIView.as_view()),
    path('deleteItem/', DeleteCartItemAPIView.as_view()),
    path('finishCart/<userId>/<addressId>', FinishCartAPIView.as_view()),
]