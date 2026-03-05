import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService, ServiceItem, Reservation } from '../../services/reservation.service'
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { NotificationService } from '../../services/notification.service';

// Admin / Analytics Imports
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {
  Chart as ChartJS,
  registerables
} from 'chart.js';

ChartJS.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {

  services: ServiceItem[] = [];
  upcomingReservations: Reservation[] = [];
  pastReservations: Reservation[] = [];
  allReservations: Reservation[] = []; // Admin only
  allUsers: any[] = []; // Admin only
  availability: any[] = []; // Admin only

  reservationForm!: FormGroup;
  serviceForm!: FormGroup; // Admin only
  availabilityForm!: FormGroup; // Admin only

  currentUser: any;
  showModal = false;
  showServiceModal = false;
  showAvailabilityModal = false;

  selectedService: ServiceItem | null = null;
  activeTab: 'upcoming' | 'past' | 'pending' | 'services' | 'users' | 'availability' = 'upcoming';
  isAdmin = false;

  // Chart Logic
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: { x: {}, y: { min: 0 } },
    plugins: { legend: { display: true } }
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = { labels: [], datasets: [] };

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.isAdmin = this.currentUser?.role === 'ADMIN';

    if (this.isAdmin) {
      this.activeTab = 'pending';
      this.loadAdminData();
    } else {
      this.loadServices();
      this.loadReservations();
    }

    this.initForms();
  }

  initForms(): void {
    this.reservationForm = this.fb.group({
      userId: [this.currentUser?.userId],
      serviceId: [null, Validators.required],
      reservationDateTime: [null, Validators.required],
      notes: ['']
    });

    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      durationInMinutes: [30, [Validators.required, Validators.min(1)]]
    });

    this.availabilityForm = this.fb.group({
      availableDate: [new Date().toISOString().split('T')[0], Validators.required],
      startTime: ['09:00', Validators.required],
      endTime: ['10:00', Validators.required]
    });
  }

  async loadAdminData(): Promise<void> {
    const [res, users, serv, avail] = await Promise.all([
      firstValueFrom(this.reservationService.getAllReservations()),
      firstValueFrom(this.reservationService.getAllUsers()),
      firstValueFrom(this.reservationService.getServices()),
      firstValueFrom(this.reservationService.getAvailability())
    ]);

    this.allReservations = res;
    this.allUsers = users;
    this.services = serv;
    this.availability = avail;
    this.generateChartData();
  }

  generateChartData(): void {
    const counts: any = {};
    this.allReservations.forEach(r => {
      const name = r.service.name;
      counts[name] = (counts[name] || 0) + 1;
    });

    this.barChartData = {
      labels: Object.keys(counts),
      datasets: [
        { data: Object.values(counts), label: 'Reservas por Servicio', backgroundColor: '#FFD200', borderColor: '#1A1A1D', borderWidth: 2 }
      ]
    };
  }

  async updateStatus(id: number, status: string): Promise<void> {
    try {
      await firstValueFrom(this.reservationService.updateReservationStatus(id, status));
      this.notificationService.success(`Reserva ${status.toLowerCase()} con éxito.`);
      if (this.isAdmin) await this.loadAdminData();
      else await this.loadReservations();
    } catch (error) { }
  }

  async deleteUser(id: number): Promise<void> {
    if (confirm('¿Eliminar este usuario de forma permanente?')) {
      await firstValueFrom(this.reservationService.deleteUser(id));
      this.notificationService.success('Usuario eliminado.');
      this.loadAdminData();
    }
  }

  async onAddService(): Promise<void> {
    if (this.serviceForm.invalid) return;
    await firstValueFrom(this.reservationService.addService(this.serviceForm.value));
    this.notificationService.success('Servicio añadido.');
    this.showServiceModal = false;
    this.serviceForm.reset();
    this.loadAdminData();
  }

  async onDeleteService(id: number): Promise<void> {
    if (confirm('¿Eliminar este servicio?')) {
      await firstValueFrom(this.reservationService.deleteService(id));
      this.loadAdminData();
    }
  }

  async onAddAvailable(): Promise<void> {
    await firstValueFrom(this.reservationService.addAvailability(this.availabilityForm.value));
    this.notificationService.success('Horario añadido.');
    this.showAvailabilityModal = false;
    this.loadAdminData();
  }

  async onDeleteAvailable(id: number): Promise<void> {
    if (confirm('¿Eliminar esta disponibilidad?')) {
      await firstValueFrom(this.reservationService.deleteAvailability(id));
      this.loadAdminData();
    }
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

  setTab(tab: any): void {
    this.activeTab = tab;
  }

  logout(): void {
    this.authService.logout();
  }
}

