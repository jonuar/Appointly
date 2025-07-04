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
    user: { id: number};
    service: ServiceItem;
    reservationDatetime: string;
    status?: string;
    notes?: string;
}

@Injectable({
    providedIn: 'root'
})
export class ReservationService {

    private apiUrl = 'http://localhost:8080/api';
    
    constructor(private http: HttpClient) {}

    getServices(): Observable<ServiceItem[]> {
        return this.http.get<ServiceItem[]>(`${this.apiUrl}/services`);
    }

    getreservations(): Observable<Reservation[]> {
        return this.http.get<Reservation[]>(`${this.apiUrl}/reservations`);
    }

    createReservation(reservation: Reservation): Observable<Reservation> {
        return this.http.post<Reservation>(`${this.apiUrl}/reservations`, reservation);
    }


}
