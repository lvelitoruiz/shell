import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { GlobalStateService } from './services/global-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements OnInit {
  title = 'shell-app';
  private globalStateService = inject(GlobalStateService);

  ngOnInit() {
    // Inicializar el servicio global para que comience a escuchar cambios
    // El servicio se activa automáticamente al inyectarse
    console.log('Shell app iniciada - Servicio global de estado activado');
  }
}
