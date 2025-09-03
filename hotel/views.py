from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.mail import send_mail
from django.conf import settings
from django.utils.crypto import get_random_string
from rest_framework.views import APIView
from rest_framework.response import Response


from .models import PasswordResetToken

User = get_user_model()

class SignUpView(APIView):
    def post(self, request):
        data = request.data
        required_fields = ['first_name', 'last_name', 'username', 'email', 'password', 'password2']
        if not all(field in data and data[field] for field in required_fields):
            return Response({'error': 'All fields are required.'}, status=400)
        if data['password'] != data['password2']:
            return Response({'error': 'Passwords do not match.'}, status=400)
        if User.objects.filter(username=data['username']).exists():
            return Response({'error': 'Username already exists.'}, status=400)
        if User.objects.filter(email=data['email']).exists():
            return Response({'error': 'Email already exists.'}, status=400)
        try:
            validate_password(data['password'])
        except Exception as e:
            return Response({'error': e.messages}, status=400)
        user = User.objects.create_user(
            first_name=data['first_name'],
            last_name=data['last_name'],
            username=data['username'],
            email=data['email'],
            password=data['password']
        )
        return Response({'message': 'Account created. Log in now.'}, status=201)

class PasswordResetRequestView(APIView):
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required.'}, status=400)
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:

            return Response({'message': 'If this email exists, a reset link has been sent.'})
        PasswordResetToken.objects.filter(user=user).delete()
        token = get_random_string(length=64)
        PasswordResetToken.objects.create(user=user, token=token)
        reset_link = f"http://localhost:3000/reset-password?token={token}&email={email}"
        send_mail(
            subject='Reset Your Password',
            message=f'Click the link to reset your password: {reset_link}',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
        )
        return Response({'message': 'If this email exists, a reset link has been sent.'})

class PasswordResetConfirmView(APIView):

    def post(self, request):
        token = request.data.get('token')
        email = request.data.get('email')
        new_password = request.data.get('new_password')
        if not (token and email and new_password):
            return Response({'error': 'Missing data.'}, status=400)
        try:
            user = User.objects.get(email=email)
            reset_token = PasswordResetToken.objects.get(user=user, token=token)
        except (User.DoesNotExist, PasswordResetToken.DoesNotExist):
            return Response({'error': 'Invalid token or email.'}, status=400)
        if reset_token.is_expired():
            reset_token.delete()
            return Response({'error': 'Token expired.'}, status=400)
        try:
            validate_password(new_password)
        except Exception as e:
            return Response({'error': e.messages}, status=400)
        user.set_password(new_password)
        user.save()
        reset_token.delete()
        return Response({'message': 'Password changed successfully!'})

