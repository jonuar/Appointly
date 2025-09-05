import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService, ServiceItem, Reservation } from '../../services/reservation.service'
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})

export class DashboardComponent implements OnInit {

  services: ServiceItem[] = [];
  reservations: Reservation[] = [];
  reservationForm!: FormGroup

  constructor(private reservationService: ReservationService,
              private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadServices();
    this.loadReservations();

    this.reservationForm = this.fb.group({
      userId: [1], // Default user ID, can be changed later
      serviceId: [null], // Service ID will be set when a service is selected
      reservationDateTime: [null], // Date and time will be set when a reservation is made
      notes: ['']
    });
  }

  async onSubmit(): Promise<void> {
    const form = this.reservationForm.value;

    const selectedService = this.services.find(service => service.id === form.serviceId);
    if (!selectedService) {
      console.log('Servicio no encontrado');
      return;
    }


    const newReservation = {
      user: { id: form.userId },
      service: selectedService,
      reservationDateTime: form.reservationDateTime,
      notes: form.notes
    };

    try {
      await firstValueFrom(this.reservationService.createReservation(newReservation));
      await this.loadReservations();
      this.reservationForm.reset({ userId: 1 });
    } catch (error) {
      console.error('Error creating reservation:', error);
    }
  }

  async loadServices(): Promise<void> {
    this.services = await firstValueFrom(this.reservationService.getServices());
  }

  async loadReservations(): Promise<void> {
    this.reservations = await firstValueFrom(this.reservationService.getReservations());
  }
}
