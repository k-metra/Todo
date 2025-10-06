from django.shortcuts import render
from django.views.decorators.csrf import requires_csrf_token, csrf_exempt
from rest_framework.decorators import api_view
from rest_framework import status

from .models import *
from users.models import User
from .serializers import NoteSerializer
from users.models import Session
from rest_framework.response import Response

# Create your views here.
@api_view(['POST'])
@requires_csrf_token
def note_list(request):
    print("received request")
    print("Request method:", request.method)
    print("Request data:", request.data)
    
    token = request.data.get('session_token')
    if not token:
        print("Token wasn't sent")
        return Response({"success": False, "message": "Authentication token is required."}, status=401)
    
    if request.method == "POST":
        print("Processing POST request")
        print("Token received:", token)
        
        try:
            account = Session.objects.get(session_token=token).user
            print("User found:", account.username)
        except User.DoesNotExist:
            print("user doesn't exist")
            return Response({"success": False, "message": "Invalid authentication token."}, status=401)
        except Session.DoesNotExist:
            print("invalid token")
            return Response({"success": False, "message": "Session does not exist."}, status=401)
            
        note = Note.objects.create(
            title=request.data.get('title', ''),
            content=request.data.get('content', ''),
            user=account
            )
        note.save()

        serialized = NoteSerializer(note)
        print("Note created:", serialized.data)

        return Response(serialized.data, status=status.HTTP_201_CREATED)

# /notes?token=<session_token>
@api_view(['GET'])
@csrf_exempt
def notes(request):
    print("Notes GET endpoint accessed")
    session_token = request.GET.get('session_token')
    query = request.GET.get('search', '').strip()
    print("Session token:", session_token)
    
    if not session_token:
        return Response({"success": False, "message": "Authentication token is required."}, status=401)
    
    try:
        account = Session.objects.get(session_token=session_token).user
        print("User found:", account.username)
    except User.DoesNotExist:
        print("user doesn't exist")
        return Response({"success": False, "message": "Invalid authentication token."}, status=401)
    except Session.DoesNotExist:
        print("invalid token")
        return Response({"success": False, "message": "Session does not exist."}, status=401)
    
    if request.method == 'GET':
        if query:
            print("Search query received:", query)
            notes_queryset = Note.objects.filter(user=account, title__icontains=query).order_by('-created_at')
        else:
            notes_queryset = Note.objects.filter(user=account).order_by('-created_at')
        serialized = NoteSerializer(notes_queryset, many=True)
        return Response(serialized.data, status=200)
        
# /notes/<int:note_id>/
@api_view(['GET', 'PUT', 'DELETE'])
@requires_csrf_token
def note_detail(request):
    session_token = request.GET.get('session_token')

    if not session_token:
        return Response({"success": False, "message": "Authentication token is required."}, status=401)
    
    if request.method == 'DELETE':
        note_id = request.GET.get('note_id')
        if not note_id:
            return Response({"success": False, "message": "Note ID is required for deletion."}, status=400)
        
        try:
            account = Session.objects.get(session_token=session_token).user
            print("User found:", account.username)
        except User.DoesNotExist:
            print("user doesn't exist")
            return Response({'success': False, 'message': 'Invalid authentication token or user didn\'t exist.'}, status=401)
        except Session.DoesNotExist:
            print("invalid token")
            return Response({"success": False, "message": "Invalid authentication token."}, status=401)
        
        try:
            note = Note.objects.get(id=note_id, user=account)
        except Note.DoesNotExist:
            return Response({"success": False, "message": "Note not found."}, status=404)
        
        note.delete()
        return Response({"success": True, "message": "Note deleted successfully."}, status=200)
    # TODO: Add update and search query functionality