import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const notificationService = inject(NotificationService);
    const router = inject(Router);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage = 'Ha ocurrido un error inesperado';

            if (error.error instanceof ErrorEvent) {
                // Client-side error
                errorMessage = `Error: ${error.error.message}`;
            } else {
                // Server-side error
                switch (error.status) {
                    case 401:
                        errorMessage = 'Sesión expirada. Por favor, inicia sesión de nuevo.';
                        router.navigate(['/login']);
                        break;
                    case 403:
                        errorMessage = 'No tienes permisos para realizar esta acción.';
                        break;
                    case 404:
                        errorMessage = 'El recurso solicitado no fue encontrado.';
                        break;
                    case 500:
                        errorMessage = 'Error interno del servidor. Inténtalo más tarde.';
                        break;
                    default:
                        errorMessage = error.error?.message || errorMessage;
                }
            }

            notificationService.error(errorMessage);
            return throwError(() => error);
        })
    );
};
