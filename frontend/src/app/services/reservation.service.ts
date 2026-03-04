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
    user: { id: number };
    service: ServiceItem;
    reservationDateTime: string;
    status?: string;
    notes?: string;
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
}
