import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';

interface MenuItem {
  label: string;
  path: string;
  icon: string;
  active?: boolean;
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="bg-white shadow-lg border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo y título -->
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <h1 class="text-xl font-bold text-gray-900">MicroFrontends App</h1>
            </div>
          </div>

          <!-- Menú de navegación (solo visible si está logueado) -->
          <div class="flex items-center space-x-8" *ngIf="user">
            <div class="flex space-x-4">
              <button 
                *ngFor="let item of menuItems" 
                (click)="navigateTo(item.path)"
                [class]="getButtonClass(item)"
                class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2">
                <span [innerHTML]="item.icon"></span>
                <span>{{ item.label }}</span>
              </button>
            </div>
          </div>

          <!-- Sección de usuario/auth -->
          <div class="flex items-center space-x-3">
            <!-- Usuario logueado -->
            <div *ngIf="user" class="flex items-center space-x-3">
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900">{{ user.displayName || 'Usuario' }}</p>
                <p class="text-xs text-gray-500">{{ user.email }}</p>
              </div>
              <img 
                *ngIf="user.photoURL" 
                [src]="user.photoURL" 
                [alt]="user.displayName || 'Usuario'"
                class="h-8 w-8 rounded-full"
              >
              <div 
                *ngIf="!user.photoURL" 
                class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                <span class="text-xs font-medium text-gray-700">
                  {{ (user.displayName || user.email || 'U').charAt(0).toUpperCase() }}
                </span>
              </div>
              <button 
                (click)="logout()"
                class="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                Cerrar Sesión
              </button>
            </div>

            <!-- Usuario no logueado -->
            <div *ngIf="!user" class="flex items-center space-x-3">
              <button 
                (click)="loginWithGoogle()"
                [disabled]="isLoading"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {{ isLoading ? 'Iniciando...' : 'Iniciar con Google' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: []
})
export class NavigationComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);
  private subscription?: Subscription;

  user: User | null = null;
  isLoading = false;

  menuItems: MenuItem[] = [
    {
      icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>',
      label: 'Dashboard',
      path: '/dashboard',
      active: false
    },
    {
      icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path></svg>',
      label: 'Repair Orders',
      path: '/repair-orders',
      active: false
    }
  ];

  ngOnInit() {
    // Suscribirse a cambios en el estado de autenticación
    this.subscription = this.authService.user$.subscribe(user => {
      this.user = user;
      if (user) {
        this.updateActiveMenuItem();
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  async loginWithGoogle() {
    this.isLoading = true;
    try {
      await this.authService.loginWithGoogle();
      // Navegar al dashboard después del login exitoso
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Error en login:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    } finally {
      this.isLoading = false;
    }
  }

  async logout() {
    try {
      await this.authService.logout();
      // Navegar a la página de inicio después del logout
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error en logout:', error);
    }
  }

  navigateTo(path: string) {
    this.router.navigate([path]).then(() => {
      this.updateActiveMenuItem();
    });
  }

  getButtonClass(item: MenuItem): string {
    const baseClass = "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2";
    const activeClass = "bg-blue-100 text-blue-700 border border-blue-200";
    const inactiveClass = "text-gray-500 hover:text-gray-700 hover:bg-gray-100";
    
    return `${baseClass} ${item.active ? activeClass : inactiveClass}`;
  }

  private updateActiveMenuItem() {
    const currentPath = this.router.url;
    this.menuItems.forEach(item => {
      item.active = currentPath.includes(item.path);
    });
  }
} 