import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService, ServiceItem, Reservation } from '../../services/reservation.service'
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  reservationForm!: FormGroup;
  currentUser: any;
  showModal = false;
  selectedService: ServiceItem | null = null;
  isLoading = false;

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadServices();
    this.loadReservations();

    this.reservationForm = this.fb.group({
      userId: [this.currentUser?.userId],
      serviceId: [null, Validators.required],
      reservationDateTime: [null, Validators.required],
      notes: ['']
    });
  }

  openBookingModal(service: ServiceItem): void {
    this.selectedService = service;
    this.reservationForm.patchValue({ serviceId: service.id });
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedService = null;
    this.reservationForm.reset({ userId: this.currentUser?.userId });
  }

  async onSubmit(): Promise<void> {
    if (this.reservationForm.invalid) return;

    this.isLoading = true;
    const form = this.reservationForm.value;

    const newReservation = {
      user: { id: form.userId },
      service: this.selectedService!,
      reservationDateTime: form.reservationDateTime,
      notes: form.notes
    };

    try {
      await firstValueFrom(this.reservationService.createReservation(newReservation));
      await this.loadReservations();
      this.closeModal();
    } catch (error) {
      console.error('Error creating reservation:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async loadServices(): Promise<void> {
    this.services = await firstValueFrom(this.reservationService.getServices());
  }

  async loadReservations(): Promise<void> {
    this.reservations = await firstValueFrom(this.reservationService.getMyReservations());
  }

  async deleteReservation(id: number): Promise<void> {
    if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      try {
        await firstValueFrom(this.reservationService.cancelReservation(id));
        await this.loadReservations();
      } catch (error) {
        console.error('Error cancelling reservation:', error);
        alert('No se pudo cancelar la reserva. Intenta de nuevo.');
      }
    }
  }

  logout(): void {
    this.authService.logout();
  }
}

