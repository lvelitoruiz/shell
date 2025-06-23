import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">
            MicroFrontends App
          </h1>
          <p class="text-lg text-gray-600 mb-8">
            Bienvenido a nuestro sistema de gestión empresarial
          </p>
        </div>
        
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div class="text-center">
            <svg class="mx-auto h-16 w-16 text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              Acceso Seguro
            </h2>
            
            <p class="text-gray-600 mb-6">
              Para acceder a la aplicación, inicia sesión con tu cuenta de Google desde el botón en la parte superior derecha.
            </p>
            
            <div class="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h3 class="text-sm font-medium text-blue-800 mb-2">
                Características del sistema:
              </h3>
              <ul class="text-sm text-blue-700 space-y-1">
                <li>• Dashboard con métricas en tiempo real</li>
                <li>• Gestión de órdenes de reparación</li>
                <li>• Interfaz moderna y responsive</li>
                <li>• Autenticación segura con Google</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class WelcomeComponent {} 