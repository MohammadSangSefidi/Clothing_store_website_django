from django.urls import path
from .views import *

urlpatterns = [
    path('register/', RegisterView.as_view(), name='registerPage'),
    path('register/checkInfo/', RegisterAPIView.as_view()),
    path('register/confirm-email/<token>', ConfirmEmailView.as_view(), name='confirm_email'),
    path('register/confirm-email/<token>/check-active-code/', ConfirmActiveCodeAPIView.as_view()),
    path('login/', LoginView.as_view(), name='loginPage'),
    path('login/sendData/', LoginAPIView.as_view()),
    path('login/forget-password/', ForgetPasswordView.as_view(), name='forget-password'),
    path('login/forget-password/checkInfo/', ForgetPasswordAPIView.as_view()),
    path('login/forget-password/<token>', ForgetPasswordConfirmView.as_view(), name='forget-password-confirm'),
    path('login/forget-password/<token>/check-active-code/', ForgetPasswordConfirmAPIView.as_view()),
    path('login/forget-password/<token>/<code>/', ChangePasswordView.as_view(), name='changePassword'),
    path('login/forget-password/<token>/<code>/checkInfo/', ChangePasswordAPIView.as_view()),
]