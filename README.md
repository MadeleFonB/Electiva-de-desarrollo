# 🎬 🧔🏻‍♂️ API de Películas

Esta API permite gestionar películas y directores, incluyendo autenticación de usuarios con JWT.

## Características
- CRUD de películas
- CRUD de directores
- Autenticación y registro de usuarios con JWT
- Documentación con Swagger
- Implementación de CORS

## Tecnologías
- Node.js con Express
- MongoDB con Mongoose
- Autenticación con JWT
- Swagger para documentación

## Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/MadeleFonB/Electiva-de-desarrollo.git
   cd Electiva-de-desarrollo
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` en la raíz con el siguiente contenido:
   ```env
   PORT=5001
   MONGO_URI=mongodb://localhost:27017/peliculas
   JWT_SECRET=supersecreto
   ```

## Uso
1. Inicia el servidor:
   ```bash
   npm start
   ```
2. La API estará disponible en:
   ```
   http://localhost:5001
   ```
3. Accede a la documentación Swagger en:
   ```
   http://localhost:5001/docs
   ```

## Autenticación
- **Registro:** `POST /api/auth/register`
- **Login:** `POST /api/auth/login`

## Endpoints Principales
- **Películas:** `/api/movies`
- **Directores:** `/api/directors`
- **Autenticación:** `/api/auth`
- **Documentación:** `/docs`
---
📩 **Contacto:** MadeleFonB

