from django.http import JsonResponse

# Aqui é a função que vai listar os albuns que serão consumidos na API, por enquanto ele tá carregando uma lista vazio porque estamos sem banco de dados
def listar_albuns(request):
    albuns_list = []
    return JsonResponse(albuns_list, safe=False)
