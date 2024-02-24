from django.urls import path
from . import views

urlpatterns = [
    path('home',views.index,name='index'),
    path('update/<int:pk>',views.updateNote,name='update-note'),
]
