from django.db import models

# Create your models here.
class NoteModel(models.Model):
    notedetail = models.CharField(max_length= 100)
    is_completed = models.BooleanField(default=False)


    def __str__(self):
        return self.notedetail
    
