import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    template: `
    <div class="reservation-system">
      <header class="app-header">
        <h1>Sistema de Reservas</h1>
        <nav>
          <!-- Navegación irá aquí después -->
        </nav>
      </header>
      <main class="app-content">
        <router-outlet></router-outlet>  <!-- Aquí se renderizan tus componentes -->
      </main>
    </div>
  `,
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Sistema de reservas';
}