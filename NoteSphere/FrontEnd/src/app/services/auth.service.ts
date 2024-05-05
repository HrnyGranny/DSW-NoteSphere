import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private loggedIn = new BehaviorSubject<boolean>(false);
  private authToken!: string;
  private userRole!: string;
  private user!: string;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        // Si el inicio de sesión es exitoso y se recibe un token JWT del servidor
        if (response && response.token) {
          // Almacena el usuario
          this.user = response.user;
          // Almacena el token JWT en el servicio AuthService
          this.authToken = response.token;
          // Almacena el rol del usuario en el servicio AuthService
          this.userRole = response.role;
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
    return this.user;
  }

  getToken(): string {
    return this.authToken;
  }

  getRole(): string {
    return this.userRole;
  }

  logout(): void {
    this.loggedIn.next(false);
    this.authToken = ""; // Limpia el token almacenado al cerrar sesión
    this.userRole = ""; // Limpia el rol almacenado al cerrar sesión
    this.user = ""; // Limpia el usuario almacenado al cerrar sesión 
  }
}
