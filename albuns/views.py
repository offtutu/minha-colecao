import json

from django.http import HttpResponseNotAllowed, JsonResponse



# Aqui é a função que possui o metodo http GET e POST, que é a função que vai listar os albuns os albuns existentes, o metodo GET vai retornar a lista dos dados do banco de dados
def listar_albuns(request):
    if request.method == "GET":
        albuns = [
            {
                "titulo": "Robson",
                "artista": "Diogo Defante",
                "ano": 2023,
                "avaliacao": 10
            }
        ]
        return JsonResponse(albuns, safe=False)

    # Aqui é o motodo POST que vai funcionar só como um tratamento de dados por enquanto, ele vai receber os dados do front e vai validar se os dados estão chegando corretos e depois vai retornar como resposta para o front
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
                    {"erro": "Insira apenas numeros validos e um ano entre 1900 e 2026"},
                    status = 400,
                )

            # Aqui é basicamente a mesma coisa que o isistance de cima, ele vai validar se a avaliação é um numero e se ela está entre 0 e 10, se qualquer coisa dessas coisas falharemele retorna também como um erro para o front
            if not isinstance(avaliacao, (float, int)) or not 0 <= avaliacao <= 10:
                return JsonResponse(
                    {"erro": "Insira apenas numeros validos e uma avaliacao entre 0 a 10"},
                    status = 400,
                )

            # Aqui é uma resposta até o momento que o POST estar funcionando por inteiro
            return JsonResponse(
                {"erro": "album não pode ser cadastrado"},
                status = 501,
            )
        except json.JSONDecodeError:
            return JsonResponse(
                {"erro": "Envie um JSON válido"},
                status = 400,
            )

    return HttpResponseNotAllowed(["GET", "POST"])
        
