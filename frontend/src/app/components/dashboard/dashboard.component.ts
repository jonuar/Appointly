import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService, ServiceItem, Reservation } from '../../services/reservation.service'
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {

  services: ServiceItem[] = [];
  upcomingReservations: Reservation[] = [];
  pastReservations: Reservation[] = [];
  reservationForm!: FormGroup;
  currentUser: any;
  showModal = false;
  selectedService: ServiceItem | null = null;
  activeTab: 'upcoming' | 'past' = 'upcoming';

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService,
    private fb: FormBuilder,
    private notificationService: NotificationService
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

    const form = this.reservationForm.value;

    const newReservation = {
      user: { id: form.userId },
      service: this.selectedService!,
      reservationDateTime: form.reservationDateTime,
      notes: form.notes
    };

    try {
      await firstValueFrom(this.reservationService.createReservation(newReservation));
      this.notificationService.success('¡Reserva creada con éxito!');
      await this.loadReservations();
      this.closeModal();
    } catch (error) {
      // Handled globally
    }
  }

  async loadServices(): Promise<void> {
    this.services = await firstValueFrom(this.reservationService.getServices());
  }

  async loadReservations(): Promise<void> {
    const all = await firstValueFrom(this.reservationService.getMyReservations());
    const now = new Date();

    // Sort by date
    all.sort((a, b) => new Date(a.reservationDateTime).getTime() - new Date(b.reservationDateTime).getTime());

    this.upcomingReservations = all.filter(r => {
      const date = new Date(r.reservationDateTime);
      return date >= now && r.status !== 'CANCELLED';
    });

    this.pastReservations = all.filter(r => {
      const date = new Date(r.reservationDateTime);
      return date < now || r.status === 'CANCELLED';
    });
  }

  async updateStatus(id: number, status: string): Promise<void> {
    const action = status === 'CANCELLED' ? 'cancelar' : 'confirmar';
    if (confirm(`¿Estás seguro de que deseas ${action} esta reserva?`)) {
      try {
        await firstValueFrom(this.reservationService.updateReservationStatus(id, status));
        this.notificationService.success(`Reserva ${status === 'CANCELLED' ? 'cancelada' : 'confirmada'} con éxito.`);
        await this.loadReservations();
      } catch (error) {
        // Handled globally
      }
    }
  }

  setTab(tab: 'upcoming' | 'past'): void {
    this.activeTab = tab;
  }

  logout(): void {
    this.authService.logout();
  }
}

