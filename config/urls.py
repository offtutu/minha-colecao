from django.contrib import admin
from django.urls import path

from albuns.views import listarAlbuns, mostrarResumo

# Aqui é as rotas que estão sendo utilizadas no projeto
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/albuns/', listarAlbuns),
    path('api/albuns/resumo/', mostrarResumo),
]
