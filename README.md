# SignZation

Sistema de gestão de **usuários, empresas e documentos**, com autenticação por login, controle de sessão e interface web.

## Como o projeto funciona

O projeto é dividido em duas partes:

- **Backend (`apiSignZation`)**: API em Django + DRF.
  - CRUD de usuários, empresas e documentos.
  - Login via rota `/users/login/`.
  - Sessão com token (expira em 3 horas).
  - Reset de senha via `/users/reset-password/`.
- **Frontend (`UIReactSignZation`)**: React + Vite.
  - Tela de login.
  - Listagens e formulários (em drawer) de CRUD.
  - Rotas protegidas (se não estiver logado, redireciona para login).

## Pré-requisitos

Para rodar localmente (sem Docker), você precisa:

- **Python 3.12+**
- **Node.js 20+** e **npm**
- (opcional) **virtualenv** via `python -m venv`

Para rodar com containers:

- **Docker**
- **Docker Compose** (ou `docker compose` integrado)

---

## Rodando com Docker (recomendado)

Na raiz do projeto:

```bash
docker compose up --build
```

Serviços disponíveis:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000`
- Django Admin: `http://localhost:8000/admin`

> O `docker-compose` já executa `makemigrations` e `migrate` ao subir o backend.

Para parar:

```bash
docker compose down
```

---

## Rodando manualmente (sem Docker)

### 1) Backend

```bash
cd apiSignZation
python -m venv .venv
source .venv/bin/activate  # Linux/macOS
# .venv\Scripts\activate   # Windows
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

Backend em: `http://localhost:8000`

### 2) Frontend

Em outro terminal:

```bash
cd UIReactSignZation
npm install
npm run dev
```

Frontend em: `http://localhost:5173`

---

## Testes unitários (backend)

Dentro de `apiSignZation`:

```bash
python manage.py test
```

Ou por app:

```bash
python manage.py test users
python manage.py test companies
python manage.py test documents
```

---

## Criar superusuário (Django Admin)

Dentro de `apiSignZation`:

```bash
python manage.py createsuperuser
```

Depois acesse `http://localhost:8000/admin`.
