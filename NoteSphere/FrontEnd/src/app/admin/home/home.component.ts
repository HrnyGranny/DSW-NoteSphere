import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../services/users.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string = '';
  isDropdownActive: boolean = false;  // Estado para controlar la visibilidad del menú desplegable

  constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.username = this.authService.getUser();
  }

  toggleDropdown(): void {
    this.isDropdownActive = !this.isDropdownActive;  // Toggle la visibilidad del menú desplegable
  }

  notesAdm(): void {
    this.router.navigate(['/admin/notesAdm']);
  }

  usersAdm(): void {
    this.router.navigate(['/admin/usersAdm']);
  }
  
  friendshipAdm(): void {
    this.router.navigate(['/admin/friendshipAdm']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);  // Redirige al usuario al LoginComponent
  }

  deleteAccount(): void {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      this.userService.deleteUser(this.username).subscribe(
        () => {
          console.log('User deleted successfully');
          // Aquí puedes manejar la respuesta del servidor, por ejemplo, redirigir al usuario a la página de inicio de sesión
        },
        error => {
          console.error(error);
          // Aquí puedes manejar los errores, por ejemplo, mostrar un mensaje de error al usuario
        }
      );
    }
  }
}
