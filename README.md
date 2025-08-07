# 🧠 Full Stack Web App – FastAPI + React

Este proyecto es una aplicación full stack compuesta por:

- 🎯 **Backend:** FastAPI (Python) – maneja la autenticación, WebSockets, API REST y operaciones CRUD.
- 💻 **Frontend:** React (JavaScript) – interfaz de usuario, consumo de API y notificaciones en tiempo real.

---

Aquí tienes la estructura de carpetas en formato Markdown, tal como aparece en tus capturas, organizada por frontend y backend:


## Estructura del Proyecto

El proyecto está dividido en dos carpetas principales:

```
📁 frontend
├── 📁 node_modules
├── 📁 public
├── 📁 src
│   ├── 📁 assets
│   ├── 📁 pages
│   │   ├── 📁 auth
│   │   │   ├── 📄 Login.jsx
│   │   │   └── 📄 Register.jsx
│   │   ├── 📁 dashboard
│   │   │   └── 📄 Dashboard.jsx
│   ├── 📁 services
│   │   ├── 📄 auth.services.jsx
│   │   └── 📄 user.services.jsx
│   ├── 📁 useCase
│   │   ├── 📁 auth
│   │   │   ├── 📄 LoginUseCase.jsx
│   │   │   └── 📄 RegisterUseCase.jsx
│   │   ├── 📁 user
│   │   │   ├── 📄 DeleteUseCase.jsx
│   │   │   ├── 📄 UpdateUseCase.jsx
│   │   │   └── 📄 ViewUseCase.jsx
│   ├── 📁 utilities
│   │   └── 📄 Api.jsx
│   ├── 📄 App.jsx
│   ├── 📄 main.css
│   └── 📄 main.jsx
├── 📄 .env.local
├── 📄 .gitignore
├── 📄 eslint.config.js
├── 📄 index.html
├── 📄 package-lock.json
├── 📄 package.json
├── 📄 README.md
└── 📄 vite.config.js
```

```
📁 backend
├── 📁 __pycache__
├── 📁 database
│   ├── 📁 __pycache__
│   └── 📄 database.py
├── 📁 env
├── 📁 models
│   ├── 📁 __pycache__
│   └── 📄 user.py
├── 📁 routes
│   ├── 📁 __pycache__
│   ├── 📄 authRoutes.py
│   └── 📄 userRoutes.py
├── 📁 utilities
│   ├── 📁 __pycache__
│   ├── 📄 JWT.py
│   ├── 📄 manager_instance.py
│   └── 📄 webSocket.py
├── 📄 .env
├── 📄 database.sqlite
└── 📄 main.py
```

---

## 🚀 Cómo ejecutar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/Riddle667/pruebaTecnica.git
cd tu_repositorio
```

---

### 2. Backend (FastAPI)

#### 🔧 Requisitos

- Python 3.10+
- `pip`, `env`

#### ▶️ Iniciar entorno virtual

```bash
cd backend
python -m venv env
source env/scripts/activate
```

#### ▶️ Ejecutar el servidor FastAPI

```bash
fastapi dev main.py
```

Por defecto se ejecuta en: [http://127.0.0.1:8000](http://127.0.0.1:8000)

- FastAPI Docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- WebSocket endpoint: `ws://127.0.0.1:8000/notifications`

---

### 3. Frontend (React)

#### 🔧 Requisitos

- Node.js y npm instalados

#### ▶️ Instalación

```bash
cd frontend
npm install
```

#### ▶️ Iniciar el servidor React

```bash
npm run dev
```

Por defecto se ejecuta en: [http://localhost:5173](http://localhost:5173)

---

## 💡 Funcionalidades

- Registro y login de usuarios
- CRUD completo de usuarios (crear, leer, actualizar, eliminar)
- Comunicación en tiempo real vía WebSocket (notificaciones)
- Manejo de sesiones con `localStorage`
- Redirecciones dinámicas con React Router
- Validación y control de flujo desde frontend y backend

---

## 🛠 Tecnologías usadas

| Frontend | Backend | Otros |
|----------|---------|-------|
| React    | FastAPI | WebSocket |
| JavaScript | Python | Vite |
| Tailwind CSS| Pydantic | CORS |
| Axios | Uvicorn | dotenv |

---

## 📌 Notas importantes

- Asegúrate de que backend y frontend se estén ejecutando simultáneamente.
- Revisa las URLs y puertos en caso de errores de CORS o conexión rechazada.

---

## 🤝 Autor

**Andrew Felipe Morales Díaz**  
Estudiante de Ingeniería en Computación e Informática  
[GitHub](https://github.com/Riddle667)

