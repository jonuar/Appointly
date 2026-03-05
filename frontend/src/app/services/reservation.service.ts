import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ServiceItem {
    id: number;
    name: string;
    description: string;
    price: number;
    durationInMinutes: number;
    active: boolean;
}

export interface Reservation {
    id?: number;
    user: { id: number; name?: string; email?: string };
    service: ServiceItem;
    reservationDateTime: string;
    status?: string;
    notes?: string;
}

export interface Availability {
    id?: number;
    availableDate: string;
    startTime: string;
    endTime: string;
    booked?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ReservationService {

    private apiUrl = 'http://localhost:8080/api';

    constructor(private http: HttpClient) { }

    getServices(): Observable<ServiceItem[]> {
        return this.http.get<ServiceItem[]>(`${this.apiUrl}/services`);
    }

    getMyReservations(): Observable<Reservation[]> {
        return this.http.get<Reservation[]>(`${this.apiUrl}/reservations/my`);
    }

    createReservation(reservation: Reservation): Observable<Reservation> {
        return this.http.post<Reservation>(`${this.apiUrl}/reservations`, reservation);
    }

    cancelReservation(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/reservations/${id}`);
    }

    updateReservationStatus(id: number, status: string): Observable<Reservation> {
        return this.http.patch<Reservation>(`${this.apiUrl}/reservations/${id}/status`, { status });
    }

    updateReservationNotes(id: number, notes: string): Observable<Reservation> {
        return this.http.patch<Reservation>(`${this.apiUrl}/reservations/${id}/notes`, { notes });
    }

    // Admin Endpoints
    getAllReservations(): Observable<Reservation[]> {
        return this.http.get<Reservation[]>(`${this.apiUrl}/reservations`);
    }

    getAllUsers(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/users`);
    }

    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
    }

    addService(service: ServiceItem): Observable<ServiceItem> {
        return this.http.post<ServiceItem>(`${this.apiUrl}/services`, service);
    }

    updateService(id: number, service: ServiceItem): Observable<ServiceItem> {
        return this.http.put<ServiceItem>(`${this.apiUrl}/services/${id}`, service);
    }

    deleteService(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/services/${id}`);
    }

    // Availability
    getAvailability(): Observable<Availability[]> {
        return this.http.get<Availability[]>(`${this.apiUrl}/availability`);
    }

    addAvailability(availability: Availability): Observable<Availability> {
        return this.http.post<Availability>(`${this.apiUrl}/availability`, availability);
    }

    deleteAvailability(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/availability/${id}`);
    }
}
