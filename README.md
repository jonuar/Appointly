# Appointly (WIP)
A full-stack application for appointment booking and service management.

## Project Structure

- `backend/` — Spring Boot REST API for users, services, and reservations
- `frontend/` — (planned) Angular application for user interface

## Features

- User registration and management
- Service catalog and management
- Reservation creation and management
- RESTful API (Spring Boot)
- In-memory H2 database for development
- User Roles and Authentication using JWT
- (Planned) Responsive Angular frontend

## Requirements
- Java 17 or higher
- Maven
- Node.js & Angular CLI (for frontend, planned)

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

### Frontend (Planned)
1. Navigate to the frontend folder:
   ```
   cd frontend
   ```
2. Install dependencies and run (after implementation):
   ```
   npm install
   ng serve
   ```
   The app will be available at `http://localhost:4200`.

## Main API Endpoints

- `GET /api/users` — List users
- `POST /api/users` — Create user
- `GET /api/services` — List services
- `POST /api/services` — Create service
- `GET /api/reservations` — List reservations
- `POST /api/reservations` — Create reservation

## Example Reservation JSON
```json
{
  "user": { "id": 1 },
  "service": { "id": 2 },
  "reservationDateTime": "2025-07-01T14:00:00",
  "notes": "Please send invoice"
}
```

## Development Notes
- The backend uses an in-memory H2 database that resets on every restart.
- Security is disabled for development.
- The frontend will be developed with Angular and will consume the backend API.

