import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './components/ui/spinner/spinner.component';
import { NotificationComponent } from './components/ui/notification/notification.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SpinnerComponent, NotificationComponent],
  template: `
    <app-spinner></app-spinner>
    <app-notification></app-notification>
    
    <div class="reservation-system">
      
      <main class="app-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sistema de reservas';
}