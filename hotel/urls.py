from . import views
from django.urls import path, include

urlpatterns = [
    path('api/signup/', views.SignUpView.as_view(), name='api_signup'),
    path('api/password-reset/', views.PasswordResetRequestView.as_view(),
         name='api_password_reset_request'),
    path('api/password-reset-confirm/', views.PasswordResetConfirmView.as_view(),
         name='api_password_reset_confirm'),
    path('accounts/', include('allauth.urls')),
]


