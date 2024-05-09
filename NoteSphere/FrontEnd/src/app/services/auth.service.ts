import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth`;
  private loggedIn = new BehaviorSubject<boolean>(false);
  private authTokenKey = 'authToken';
  private userRoleKey = 'userRole';
  private userKey = 'user';

  constructor(private http: HttpClient) {
    // Verifica si localStorage está disponible antes de intentar usarlo
    if (typeof localStorage !== 'undefined') {
      // Verifica si hay un token almacenado al inicializar el servicio
      const authToken = localStorage.getItem(this.authTokenKey);
      if (authToken) {
        this.loggedIn.next(true);
      }
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        // Si el inicio de sesión es exitoso y se recibe un token JWT del servidor
        if (response && response.token) {
          // Almacena el usuario, el token y el rol en el almacenamiento local
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(this.userKey, response.user);
            localStorage.setItem(this.authTokenKey, response.token);
            localStorage.setItem(this.userRoleKey, response.role);
          }
          // Actualiza el estado de autenticación a true
          this.loggedIn.next(true);
        }
      })
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getUser(): string {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.userKey) || '';
    }
    return '';
  }

  getToken(): string {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.authTokenKey) || '';
    }
    return '';
  }

  getRole(): string {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.userRoleKey) || '';
    }
    return '';
  }

  logout(): void {
    // Borra los datos de autenticación del almacenamiento local al cerrar sesión
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.authTokenKey);
      localStorage.removeItem(this.userRoleKey);
      localStorage.removeItem(this.userKey);
    }
    // Actualiza el estado de autenticación a false
    this.loggedIn.next(false);
  }
}


