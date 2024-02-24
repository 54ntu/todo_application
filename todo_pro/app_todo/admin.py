from django.contrib import admin
from app_todo.models import NoteModel


# Register your models here.
class NoteAdminModel(admin.ModelAdmin):
    list_display = ('notedetail',)


admin.site.register(NoteModel, NoteAdminModel)
