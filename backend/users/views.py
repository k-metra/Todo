from django.shortcuts import render
from .models import User, Session
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.utils import timezone

# Create your views here.
@api_view(['POST'])
def login_api(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'success': False, 'error': 'Username and password are required'}, status=400)
    
    try:
        user = User.objects.filter(username=username).first()

        if not user:
            return Response({'success': False, 'error': 'Invalid username or password'}, status=401)
        
        if user.password != password:
            return Response({'success': False, 'error': 'Invalid username or password'}, status=401)
        
        session = Session.objects.filter(user=user).first()

        if session:
            session.delete()
            session = Session.create_session(user=user)

            print("Created new session for login:", session.session_token)

            return Response(
                {'success': True,
                 'message': 'Login successful',
                 'username': user.username,
                 'session_token': session.session_token,}
            )
            
        else:
            session = Session.create_session(user)
            print("Session not found. Created new one:", session.session_token)
            return Response(
                {'success': True,
                 'message': 'Login successful',
                 'username': user.username,
                 'session_token': session.session_token,}
            )
    except User.DoesNotExist:
        return Response({'success': False, 'error': 'That account doesn\'t exist'}, status=401)
    
@api_view(['POST'])
def register_api(request):

    MINIMUM_PASSWORD_LENGTH = 8
    MINIMUM_USERNAME_LENGTH = 6

    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'success': False, 'error': 'Username and password are required'}, status=400)
    
    if len(username) < MINIMUM_USERNAME_LENGTH:
        return Response({'success': False, 'error': f'Username must be at least {MINIMUM_USERNAME_LENGTH} characters long'}, status=400)
    
    if len(password) < MINIMUM_PASSWORD_LENGTH:
        return Response({'success': False, 'error': f'Password must be at least {MINIMUM_PASSWORD_LENGTH} characters long'}, status=400)
    
    if User.objects.filter(username=username).exists():
        return Response({'success': False, 'error': 'Username is already taken'}, status=400)
    
    user = User.objects.create(username=username, password=password)
    user.save()

    session = Session.create_session(user)
    
    return Response({
        'success': True,
        'message': 'Registration successful',
        'username': user.username,
        'session_token': session.session_token,
    }, status=201)


@api_view(['POST'])
def verify_session(request):
    token = request.data.get('session_token')

    if not token:
        return Response({'success': False,'error': 'Token is required'}, status=400)

    try:
        session = Session.objects.get(session_token=token)

        if not session:
            print("No session token found")
            return Response({'success': False, 'error': 'Invalid session token'}, status=401)
        
        expires_at = session.expires_at

        if expires_at < timezone.now():
            session.delete()
            print("session expired for:", session.session_token)
            return Response({'success': False, 'error': 'Session has expired'}, status=401)
        else:
            print("Session token:", session.session_token, "is valid.")
            return Response({'success': True, 'message': 'Session is valid', 'username': session.user.username}, status=200)
    except Session.DoesNotExist:
        return Response({'success': False, 'error': 'Invalid session token'}, status=401)

@api_view(['POST'])
def logout_api(request):
    token = request.data.get('session_token')

    if not token:
        print("Token doesn't exist")
        return Response({'success': False,'error': 'Token is required'}, status=400)
    
    try:
        session = Session.objects.get(session_token=token)
        print("Fetching session")

        if session:
            session.delete()
            print("Session deleted")
            return Response({'success': True, 'message': 'Logout successful'}, status=200)

    except Session.DoesNotExist:
        print("Session doesn't exist.")
        return Response({'success': False, 'error': 'Invalid session token'}, status=401)
    return Response({'success': False, 'error': 'Invalid session token'}, status=401)