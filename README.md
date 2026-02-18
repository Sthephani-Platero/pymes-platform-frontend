# 🚀 Plataforma Inteligente para PYMEs – Frontend

![React](https://img.shields.io/badge/React-18-blue?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite&logoColor=white)
![Status](https://img.shields.io/badge/Status-MVP-yellow)

Frontend desarrollado en **React** con **Vite** para el MVP de una plataforma web orientada a pequeñas y medianas empresas (PYMEs).  
Se encarga de la interfaz de usuario, consumo de la API REST del backend y visualización de dashboards e insights.

---

## 🧠 Descripción del Proyecto

El frontend permite:

- Registro e inicio de sesión de usuarios
- Configuración inicial de empresa
- Visualización de métricas y dashboards
- Visualización de insights
- Interacción con API REST del backend
- Experiencia de usuario responsiva y moderna

El sistema está diseñado para funcionar de manera desacoplada respecto al backend.

---

## 🏗️ Arquitectura General

Frontend (React + Vite)
↓
Backend (Laravel API REST)
↓
Base de datos PostgreSQL (ElephantSQL)


---

## ⚙️ Stack Tecnológico

- React 18
- Vite 5
- JavaScript (ES6+)
- HTML5 & CSS3
- Axios (para consumir API)
- Tailwind CSS (estilos)
- React Router (navegación)

---

## 🔌 Conexión con Backend

Todas las solicitudes de datos se realizan a través de la API REST del backend en Laravel.  
Se recomienda usar variables de entorno para configurar la URL del backend:

VITE_API_URL=http://localhost:8000/api


---

## 🗂️ Estructura del Proyecto

frontend/
├─ public/
├─ src/
│ ├─ assets/
│ ├─ components/
│ ├─ pages/
│ ├─ services/ # Axios y consumo de API
│ ├─ App.jsx
│ └─ main.jsx
├─ .env
├─ package.json
└─ vite.config.js


---

## 📦 Instalación

1. Clonar repositorio
```bash
git clone <url-del-repositorio>
cd frontend
Instalar dependencias

npm install
Configurar variables de entorno

cp .env.example .env
Editar .env con la URL del backend:

VITE_API_URL=http://localhost:8000/api
Ejecutar servidor de desarrollo

npm run dev
Abrir en navegador

http://localhost:5173
🧩 Decisiones Técnicas
¿Por qué React + Vite?

Componentización y reutilización de código

Desarrollo rápido con Vite

Compatible con SPA y futuras apps móviles

Ecosistema amplio y moderno

¿Por qué Tailwind CSS?

Rápido y responsivo

Código CSS limpio y mantenible

Fácil personalización de UI

¿Por qué Axios?

Consumo simple y efectivo de APIs REST

Manejo de errores integrado

Compatible con interceptores para autenticación

🚧 Estado del Proyecto
Versión actual: MVP

Funcionalidades: Autenticación + Configuración empresa + Dashboard + Insights

UI básica pero funcional, lista para integrar mejoras visuales

👩‍💻 Autora
Desarrollado como proyecto académico para diseño y desarrollo de MVP de plataforma para PYMEs.

🔗 Roadmap / Próximas versiones
Dashboard con gráficos interactivos

Mejora de la experiencia responsiva

Sistema de notificaciones

Gestión avanzada de usuarios y roles
