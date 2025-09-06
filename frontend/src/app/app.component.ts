import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Sistema de Reservas';
}