# Product and Category Management System

## Descripción

Esta aplicación web permite la gestión eficiente de productos y categorías, implementando operaciones CRUD y conteo total de registros. El sistema está basado en una arquitectura de microservicios, donde el backend expone APIs RESTful consumidas por un frontend moderno y responsivo. Es ideal como ejemplo de integración full-stack con tecnologías actuales y buenas prácticas.

## Tecnologías utilizadas

- **Backend:**
  - Java 17
  - Spring Boot
  - MySQL
  - Validaciones con anotaciones (Bean Validation)
  - API RESTful (CRUD y conteo total)
  - CORS habilitado para comunicación con frontend
  - Docker y Docker Compose
  - Docker Hub

- **Frontend:**
  - Angular
  - HTML, CSS, TypeScript
  - Font Awesome (íconos)
  - SweetAlert2 (alertas interactivas)
  - Validaciones en formularios
  - Diseño responsivo (mobile-first)
  - Consumo de APIs REST mediante HttpClient
  - Servido mediante NGINX en contenedor Docker

## Arquitectura y estructura del proyecto

### Backend (Spring Boot)

```
src/main/java/com/ejemplo/app/
├── controllers/     # Controladores REST para productos y categorías
├── exceptions/      # Manejo personalizado de excepciones
├── models/          # Entidades del sistema (Producto, Categoría)
├── repositories/    # Interfaces para acceso a datos (JPA)
├── services/        # Lógica de negocio y servicios
```

### Frontend (Angular)

```
src/app/
├── components/      # Componentes reutilizables (formularios, listas)
├── pages/           # Páginas principales (productos, categorías)
├── layout/          # Componentes de diseño (navbar, sidebar, footer)
├── shared/          # Recursos compartidos (pipes, guards)
├── models/          # Interfaces y modelos de datos (Producto, Categoría)
├── services/        # Servicios para consumir APIs REST usando HttpClient
```

## Endpoints principales

- Productos: [http://localhost:8081/api/products](http://localhost:8081/api/products)
- Categorías: [http://localhost:8082/api/categories](http://localhost:8082/api/categories)

## Funcionalidades

- Backend con microservicios y APIs RESTful para productos y categorías.
- Operaciones CRUD y endpoint para contar el total de registros.
- Validaciones robustas tanto en backend (anotaciones) como en frontend.
- Comunicación segura entre frontend y backend mediante CORS.
- Frontend responsivo, moderno y fácil de usar.
- Uso de iconos Font Awesome y alertas SweetAlert2.
- Despliegue y orquestación sencilla con Docker, Docker Compose y NGINX.

## Cómo clonar y ejecutar el proyecto

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/luis-sagx/Product-and-Category-System.git
   cd Product-and-Category-System
   ```

2. **Construye y levanta los contenedores:**

   ```bash
   docker compose up --build
   ```

3. **Accede a las URLs en tu navegador:**

   - Frontend (Angular servido por NGINX): [http://localhost](http://localhost)
   - API de productos: [http://localhost:8081/api/products](http://localhost:8081/api/products)
   - API de categorías: [http://localhost:8082/api/categories](http://localhost:8082/api/categories)

---

Este sistema demuestra una arquitectura moderna basada en microservicios, integrando tecnologías de backend y frontend de última generación, con despliegue automatizado y buenas prácticas de desarrollo web.