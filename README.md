# Minha Coleção

## Integrantes

- Pedro Henrique Camargo Ludovico — RA: 11261102648
- Arthur Kemmel Esteves Mellem — RA: 11261102971
- Cristhian Henrique Santos Oliveira — RA: 11261100593
- Eduarda Camile Ramos de Oliveira — RA: 11251101956

## Variante

**Álbums**

O projeto consiste em uma aplicação web para cadastrar e visualizar uma coleção de álbuns, permitindo informar título, artista, ano e avaliação.

A aplicação também possui pesquisa por título e um resumo com a quantidade de álbuns cadastrados, média das avaliações e melhor álbum.

## Tecnologias utilizadas

- **Backend:** Python e Django
- **Frontend:** React e Vite
- **Banco de dados:** SQLite

## Como executar o projeto

### 1. Backend

Abra o terminal na pasta raiz do projeto, onde está o arquivo `manage.py`.

Instale as dependências:

```bash
pip install -r requirements.txt
```

Aplique as migrações do banco de dados:

```bash
python manage.py migrate
```

Inicie o servidor:

```bash
python manage.py runserver
```

O backend estará disponível em:

http://127.0.0.1:8000/

### 2. Frontend

Abra outro terminal e entre na pasta frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o projeto:

```bash
npm run dev
```

O frontend estará disponível em:

http://localhost:5173/

**Importante:** mantenha os dois servidores ligados enquanto estiver utilizando a aplicação.