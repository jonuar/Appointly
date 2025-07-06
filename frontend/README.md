
# Frontend

This project is the frontend for the BookingApp, built with Angular 20 and designed to interact with the BookingApp backend API.

## Features
- User login and registration
- Service catalog and reservation creation
- User dashboard to view and manage reservations
- Responsive design

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.5.
## Project Structure

- `src/app/components/` — Main UI components (login, register, dashboard, etc.)
- `src/app/services/` — Angular services for API communication
- `src/app/app-routing.module.ts` — Route configuration
## API Integration

This frontend communicates with the BookingApp backend REST API. Make sure the backend is running (by default at `http://localhost:8080`).

You may need to adjust API URLs in the Angular services if your backend runs on a different host or port.
## Example Reservation JSON

When creating a reservation, the frontend sends a JSON like this to the backend:

```json
{
  "user": { "id": 1 },
  "service": { "id": 2 },
  "reservationDateTime": "2025-07-01T14:00:00",
  "notes": "Please send invoice"
}
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

---

For questions or improvements, open an issue or pull request in the main repository.
