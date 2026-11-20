import json

from django.http import HttpResponseNotAllowed, JsonResponse

from .models import Album

# Aqui é a função que possui o metodo http GET e POST, que é a função que vai listar os albuns os albuns existentes, o metodo GET vai retornar a lista dos dados do banco de dados
def listarAlbuns(request):
    if request.method == "GET":
        albuns = list(Album.objects.values())
        return JsonResponse(albuns, safe=False)

    # Aqui é o motodo POST que vai funcionar como cadastro de albuns e principalmente tratamento de dados, ele vai receber os dados do front e vai validar se os dados estão chegando corretos e depois vai retornar como resposta para o front
    if request.method == "POST":
        try:
            # Aqui transforma o json que é recebido pelo front em um dicionario em python e divide ele em objetos separados para facilitar a validação dos dados
            dados = json.loads(request.body)
            titulo = dados.get("titulo")
            artista = dados.get("artista")
            ano = dados.get("ano")
            avaliacao = dados.get("avaliacao")

            # Aqui é a validação do dado ano, ele vai ver se o ano é um int e se ele está entre 1900 e 2026, se qualquer uma dessas coisass falharem ele retorna como um erro para o front
            if not isinstance(ano, int) or not 1900 <= ano <= 2026:
                return JsonResponse(
                    {"erro": "Insira apenas números validos e um ano entre 1900 e 2026"},
                    status = 400,
                )

            # Aqui é basicamente a mesma coisa que o isistance de cima, ele vai validar se a avaliação é um numero e se ela está entre 0 e 10, se qualquer coisa dessas coisas falharemele retorna também como um erro para o front
            if not isinstance(avaliacao, (float, int)) or not 0 <= avaliacao <= 10:
                return JsonResponse(
                    {"erro": "Insira apenas números validos e uma avaliação entre 0 a 10"},
                    status = 400,
                )

            # Aqui é o cadastro dos albuns, onde ele cria um objeto do tipo Album e manda para o banco de dados, e depois retorna como resposta para o front o album cadastrado
            album = Album.objects.create(
                titulo=titulo,
                artista=artista,
                ano=ano,
                avaliacao=avaliacao,
            )
            # Aqui é a resposta que foi enviada para o front, com um status 201 que sinaliza que o album foi criado com sucesso
            return JsonResponse(
                {
                 "id": album.pk,
                 "titulo": album.titulo,
                 "artista": album.artista,
                 "ano": album.ano,
                 "avaliacao": album.avaliacao,
                },
                status = 201,
            )
        # 
        except json.JSONDecodeError:
            return JsonResponse(
                {"erro": "Envie um JSON válido"},
                status = 400,
            )


    return HttpResponseNotAllowed(["GET", "POST"])

# Aaqui é a função que possui um metodo GET que vai retornar o total de albuns no banco de dados e vai enviar de resposta para o front
def mostrarResumo(request):
    if request.method == "GET":
        albuns = list(Album.objects.values())
        totalAlbuns = len(albuns)

        # Aqui mostra um aviso quando não tem nenhum álbum para o resumo, é necessario um album pelo menos
        if totalAlbuns == 0:
            return JsonResponse(
                {
                    "total": 0, 
                    "mensagem": "Nenhum foi álbum cadastrado." 
                }
            )

        # Aqui é parte do calculo da media das avaliações 
        soma = 0
        for album in albuns:
            soma += album["avaliacao"]
        mediaDaAvaliacao = round(soma / totalAlbuns, 2)

        # Aqui é a parte da decisão do album mais avalido
        melhorAlbum = albuns[0]
        for album in albuns:
            if album["avaliacao"] > melhorAlbum["avaliacao"]:
                melhorAlbum = album

        # Aqui é a entrega do resumo para o front
        return JsonResponse(
            {
                "total": totalAlbuns,
                "media_avaliacao": mediaDaAvaliacao,
                "melhor": melhorAlbum["titulo"],
            },
        )
    return HttpResponseNotAllowed(["GET"])