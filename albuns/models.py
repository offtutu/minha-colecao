from django.db import models

# Create your models here.
class Album (models.Model):
    titulo = models.CharField(max_length=200)
    artista = models.CharField(max_length=200)
    ano = models.IntegerField()
    avaliacao = models.FloatField()

    def __str__(self):
        return self.titulo