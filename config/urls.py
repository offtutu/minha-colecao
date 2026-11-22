
from django.contrib import admin
from django.urls import path
from albums.views import listar_albuns, mostrar_resumo

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/albuns/', listar_albuns),
    path('api/albuns/resumo/', mostrar_resumo),
]
