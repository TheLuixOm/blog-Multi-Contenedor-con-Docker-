# Blog Multi-Contenedor con Docker

Aplicación de blog sencillo desplegada con Docker Compose, compuesta por tres contenedores: frontend (React + Vite), backend (Node.js + Express) y base de datos (MongoDB).

## Tecnologías

- **Frontend:** React, Vite, Tailwind CSS, Nginx
- **Backend:** Node.js, Express, Mongoose
- **Base de datos:** MongoDB 7
- **Infraestructura:** Docker, Docker Compose

## Requisitos

- Docker Engine
- Docker Compose

## Clonar el repositorio

```bash
git clone https://github.com/TheLuixOm/blog-Multi-Contenedor-con-Docker-.git
cd blog-Multi-Contenedor-con-Docker-
```

## Levantar la aplicación

```bash
docker-compose up --build
```

Para detener la aplicación:

```bash
docker-compose down
```

Para detener y eliminar los volúmenes de datos:

```bash
docker-compose down -v
```

## Variables de entorno

Todas las variables de entorno están configuradas en el `docker-compose.yml`:

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `PORT` | `5000` | Puerto del backend |
| `MONGO_URI` | `mongodb://mongo:27017/blog` | URI de conexión a MongoDB |

## URLs de acceso

| Servicio | URL |
|----------|-----|
| Frontend | http://localhost |
| Backend API | http://localhost:5000/api |
| MongoDB | localhost:27017 |

## Arquitectura

- **Frontend (puerto 80):** SPA compilada con Vite, servida por Nginx. Nginx redirige las peticiones `/api/*` al backend.
- **Backend (puerto 5000):** API RESTful que gestiona las entradas del blog y se comunica con MongoDB.
- **MongoDB (puerto 27017):** Base de datos con persistencia de datos mediante un volumen Docker.

## Estructura del repositorio

```
├── frontend/                      # Contenedor Frontend (React + Nginx)
│   ├── Dockerfile                 # Multi-stage build: Node → Nginx
│   ├── nginx.conf                 # Configuración de Nginx (proxy a backend)
│   ├── vite.config.js             # Configuración de Vite + Tailwind
│   ├── index.html                 # HTML entry point
│   ├── package.json               # Dependencias (React, Vite, Tailwind)
│   └── src/
│       ├── main.jsx               # Entry point de React
│       ├── App.jsx                # Componente principal
│       ├── index.css              # Estilos con Tailwind CSS
│       └── components/
│           ├── PostForm.jsx       # Formulario para crear posts
│           └── PostList.jsx       # Lista de posts
│
├── backend/                       # Contenedor Backend (Node.js + Express)
│   ├── Dockerfile                 # Imagen Node.js Alpine
│   ├── .env                       # Variables de entorno (PORT, MONGO_URI)
│   ├── package.json               # Dependencias (Express, Mongoose, CORS)
│   └── src/
│       ├── index.js               # Servidor Express principal
│       ├── models/
│       │   └── Post.js            # Modelo Mongoose (title, content, timestamps)
│       └── routes/
│           └── posts.js           # Endpoints GET y POST /api/posts
│
├── docker-compose.yml             # Orquestación de los 3 contenedores
├── README.md
└── .gitignore
```
