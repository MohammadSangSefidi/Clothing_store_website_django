from django.urls import path
from .views import *

urlpatterns = [
    path('<num>/', UserPanelView.as_view(), name='user-panel'),
    path('<num>/logOut/', LogOutView.as_view(), name='log-out'),
    path('<num>/favorites/<userId>/', FavoriteProductsAPIView.as_view()),
    path('<num>/changePassword/<userId>/', ChangePasswordAPIView.as_view()),
    path('<num>/address/<userId>/', AddressAPIView.as_view()),
    path('<num>/address/<userId>/createAddress/', CreateAddressAPIView.as_view()),
    path('<num>/address/<userId>/deleteAddress/<addressId>/', DeleteAddressAPIView.as_view()),
]