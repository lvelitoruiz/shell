import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '@angular/fire/auth';
import { AuthService } from './auth.service';

export interface GlobalState {
  user: User | null;
  isAuthenticated: boolean;
  userToken?: string;
}

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {
  private authService = inject(AuthService);
  private stateSubject = new BehaviorSubject<GlobalState>({
    user: null,
    isAuthenticated: false
  });

  public state$ = this.stateSubject.asObservable();

  constructor() {
    // Escuchar cambios en autenticación
    this.authService.user$.subscribe(async (user) => {
      const token = user ? await this.authService.getIdToken() : undefined;
      
      const newState: GlobalState = {
        user,
        isAuthenticated: !!user,
        userToken: token || undefined
      };
      
      this.stateSubject.next(newState);
      
      // Emitir evento global para que los MFEs puedan escucharlo
      this.emitGlobalEvent('auth-state-changed', newState);
    });
  }

  // Método para obtener el estado actual
  getCurrentState(): GlobalState {
    return this.stateSubject.value;
  }

  // Método para emitir eventos globales
  private emitGlobalEvent(eventName: string, data: any) {
    // Usar CustomEvent para comunicación entre MFEs
    const event = new CustomEvent(eventName, {
      detail: data
    });
    window.dispatchEvent(event);
    
    // También guardar en window para acceso directo
    (window as any).globalAppState = this.getCurrentState();
  }

  // Método para que los MFEs puedan obtener el estado actual
  getStateForMFE() {
    return this.getCurrentState();
  }
} 