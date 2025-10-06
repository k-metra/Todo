from django.shortcuts import render
from django.views.decorators.csrf import requires_csrf_token, csrf_exempt
from rest_framework.decorators import api_view
from rest_framework import status

from .models import *
from .serializers import NoteSerializer
from rest_framework.response import Response

# Create your views here.
@api_view(['GET', 'POST'])
def note_list(request):
    if request.method == "GET":
        notes = Note.objects.all()
        serialized = NoteSerializer(notes=notes, many=True)

        return Response(serialized.data, status=200)
    
    elif request.method == "POST":
        serialized = NoteSerializer(data=request.data)

        if serialized.is_valid():
            serialized.save()
            return Response(serialized.data, status=201)
        else:
            return Response(serialized.errors, status=400)
        
# /notes/<int:note_id>/
@api_view(['GET', 'PUT', 'DELETE'])
def note_detail(request, note_id):
    try:
        note = Note.objects.get(id=note_id)
    except:
        return Response({"success": False, "message": "Note does not exist."},status=404)
    
    # get a note
    if request.method == 'GET':
        serialized = NoteSerializer(note)
        return Response(serialized.data)
    
    elif request.method == 'PUT':
        serialized = NoteSerializer(note, data=request.data)
        if serialized.is_valid():
            serialized.save()
            return Response(serialized.data)
        return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        note.delete()
        return Response({'message': 'Note deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
