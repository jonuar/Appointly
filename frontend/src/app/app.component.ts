import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    template: `
    <div class="app-container">
      <header>
        <h1>Appointly</h1>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'frontend';
}