import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // URL del endpoint de autenticación en tu backend
  private loggedIn = new BehaviorSubject<boolean>(false); // BehaviorSubject para almacenar el estado de autenticación

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(() => this.loggedIn.next(true)) // Actualiza el estado de autenticación a true si el inicio de sesión es exitoso
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable(); // Devuelve el BehaviorSubject como un Observable para que los componentes puedan suscribirse a él
  }

  logout(): void {
    // Implementa la lógica de cierre de sesión aquí
    this.loggedIn.next(false); // Actualiza el estado de autenticación a false
  }
}
