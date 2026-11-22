
import json

from django.http import JsonResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt

from .models import Album


@csrf_exempt
def listar_albuns(request):
    if request.method == "GET":
        albuns = list(Album.objects.values())
        return JsonResponse(albuns, safe=False)

    if request.method == "POST":
        try:
            dados = json.loads(request.body)

            if not isinstance(dados, dict):
                return JsonResponse(
                    {"erro": "Envie um objeto JSON válido"},
                    status=400
                )

            titulo = dados.get("titulo")
            artista = dados.get("artista")
            ano = dados.get("ano")
            avaliacao = dados.get("avaliacao")

            if not isinstance(titulo, str) or not titulo.strip():
                return JsonResponse(
                    {"erro": "Informe o título do álbum"},
                    status=400
                )

            if not isinstance(artista, str) or not artista.strip():
                return JsonResponse(
                    {"erro": "Informe o artista"},
                    status=400
                )

            if len(titulo) > 100 or len(artista) > 100:
                return JsonResponse(
                    {"erro": "Título e artista devem ter até 100 caracteres"},
                    status=400
                )

            if type(ano) != int or not 1900 <= ano <= 2026:
                return JsonResponse(
                    {"erro": "O ano deve estar entre 1900 e 2026"},
                    status=400
                )

            if type(avaliacao) not in (int, float) or not 0 <= avaliacao <= 10:
                return JsonResponse(
                    {"erro": "A avaliação deve estar entre 0 e 10"},
                    status=400
                )

            album = Album.objects.create(
                titulo=titulo,
                artista=artista,
                ano=ano,
                avaliacao=avaliacao
            )

            return JsonResponse({
                "id": album.id,
                "titulo": album.titulo,
                "artista": album.artista,
                "ano": album.ano,
                "avaliacao": album.avaliacao
            }, status=201)

        except json.JSONDecodeError:
            return JsonResponse(
                {"erro": "Envie um JSON válido"},
                status=400
            )

    return HttpResponseNotAllowed(["GET", "POST"])


def mostrar_resumo(request):
    if request.method != "GET":
        return HttpResponseNotAllowed(["GET"])

    albuns = list(Album.objects.values())
    total = len(albuns)

    if total == 0:
        return JsonResponse({
            "total": 0,
            "media_avaliacao": 0,
            "melhor": None
        })

    soma = 0

    for album in albuns:
        soma += album["avaliacao"]

    media = round(soma / total, 2)

    melhor_album = albuns[0]

    for album in albuns:
        if album["avaliacao"] > melhor_album["avaliacao"]:
            melhor_album = album

    return JsonResponse({
        "total": total,
        "media_avaliacao": media,
        "melhor": melhor_album["titulo"]
    })
