import { Injectable, inject } from '@angular/core';
import { Auth, signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, User } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();
  
  constructor() {
    // Escuchar cambios en el estado de autenticación
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

  // Login con Google
  async loginWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      console.log('Usuario logueado:', result.user);
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      console.log('Usuario deslogueado');
    } catch (error) {
      console.error('Error en logout:', error);
      throw error;
    }
  }

  // Obtener usuario actual
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  // Verificar si está logueado
  isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }

  // Obtener token del usuario (útil para pasar a MFEs)
  async getIdToken(): Promise<string | null> {
    const user = this.auth.currentUser;
    if (user) {
      return await user.getIdToken();
    }
    return null;
  }
} 