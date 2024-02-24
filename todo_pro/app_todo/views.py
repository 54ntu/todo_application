from django.shortcuts import render,HttpResponse
from app_todo.serializers import NoteModelSerializer
from app_todo.models import NoteModel
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http import JsonResponse

# Create your views here.
@csrf_exempt
def index(request):
    if request.method =="GET":
        obj = NoteModel.objects.all()
        serializer = NoteModelSerializer(obj,many=True)
        return JsonResponse(serializer.data, status=200,safe=False)
    elif request.method =="POST":
        val1 = JSONParser().parse(request)
        print("value we are getting from frontend : ", val1)
        serializer = NoteModelSerializer(data=val1)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        return JsonResponse(serializer._errors,status=404)
    
@csrf_exempt
def updateNote(request,pk):
        obj1= NoteModel.objects.get(id=pk)
        if request.method =="GET":
             serializer = NoteModelSerializer(obj1)
             return JsonResponse(serializer.data)
        
        elif request.method =="PUT":
             val1 = JSONParser().parse(request)
             serializer = NoteModelSerializer(obj1,data=val1)
             if serializer.is_valid():
                  serializer.save()
                  return JsonResponse(serializer.data,status=200)
             return JsonResponse(serializer.errors,status=404)
        
