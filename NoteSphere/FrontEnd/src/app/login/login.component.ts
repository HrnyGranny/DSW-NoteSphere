import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.username, this.password)
      .subscribe(
        () => {
          // Inicio de sesión exitoso, redirigir a la página de notas
          this.router.navigate(['/notes']);
        },
        error => {
          this.error = error.error.message; // Manejar el mensaje de error devuelto por el servidor
        }
      );
  }
}
