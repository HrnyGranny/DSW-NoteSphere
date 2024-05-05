import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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
          const role = this.authService.getRole();
          if (role === 'Y') {
            this.router.navigate(['/admin']); // Redirige al módulo de administrador
          } else {
            this.router.navigate(['/user']); // Redirige al módulo de usuario normal
          }
        },
        error => {
          this.error = error.error.message;
        }
      );
  }
}
