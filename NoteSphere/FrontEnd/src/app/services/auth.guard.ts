import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // El usuario está autenticado, permitir acceso a la ruta
    } else {
      this.router.navigate(['/login']); // Redirigir al usuario al componente de login
      return false; // Bloquear el acceso a la ruta
    }
  }
}
