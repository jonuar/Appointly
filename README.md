# Appointly (Work in progress)
A full-stack application for appointment booking and service management.

## Project Structure
- `backend/` — Spring Boot REST API for users, services, and reservations
- `frontend/` — Angular application for user interface

## Features
- User registration and management
- Service catalog and management
- Reservation creation and management
- RESTful API (Spring Boot)
- In-memory H2 database for development
- User Roles and Authentication using JWT
- **Neobrutalism Design System** with high-contrast UI
- Responsive Angular frontend with Sora typography

## Interface Preview (Neobrutalism)

![Login Mockup](file:///C:/Users/J/.gemini/antigravity/brain/f0e9c861-42e6-4f39-8027-20c4865a0c8c/neobrutalism_login_mockup_png_1772673663257.png)

*Consistent high-contrast login experience.*

![Dashboard Mockup](file:///C:/Users/J/.gemini/antigravity/brain/f0e9c861-42e6-4f39-8027-20c4865a0c8c/neobrutalism_dashboard_mockup_png_1772673623860.png)

*Professional dashboard with service grid and reservation management.*

## Requirements
- Java 17 or higher
- Maven
- Node.js & Angular CLI

## Getting Started

### Backend
1. Navigate to the backend folder:
   ```
   cd backend
   ```
2. Build and run the backend:
   ```
   mvn clean install
   mvn spring-boot:run
   ```
   The API will be available at `http://localhost:8080`.

### Frontend
1. Navigate to the frontend folder:
   ```
   cd frontend
   ```
2. Install dependencies and run:
   ```
   npm install
   ng serve
   ```
   The app will be available at `http://localhost:4200`.

## Main API Endpoints

- `POST /api/auth/register` — Registrar nuevo usuario
- `POST /api/auth/login` — Iniciar sesión y obtener JWT
- `GET /api/services` — Listar servicios (Público)
- `GET /api/reservations/my` — Ver mis reservas (Requiere JWT)
- `POST /api/reservations` — Crear reserva (Requiere JWT)
- `DELETE /api/reservations/{id}` — Cancelar reserva (Requiere JWT)

## Example Reservation JSON
```json
{
  "service": { "id": 2 },
  "reservationDateTime": "2025-07-01T14:00:00",
  "notes": "Please send invoice"
}
```

## Default Credentials (H2 Development)
Como la base de datos es en memoria, se han pre-cargado los siguientes usuarios para pruebas rápidas:

| Rol | Email | Password |
| :--- | :--- | :--- |
| **User** | `test@example.com` | `password123` |
| **Admin** | `admin@appointly.com` | `admin123` |

## Development Notes
- El backend usa una base de datos H2 en memoria que se reinicia con cada ejecución.
- La seguridad está habilitada mediante JWT. Casi todos los endpoints de `/api/reservations/**` requieren el token en el header `Authorization: Bearer <token>`.
- El frontend está desarrollado en Angular y ya integra el interceptor para el manejo de sesiones.

