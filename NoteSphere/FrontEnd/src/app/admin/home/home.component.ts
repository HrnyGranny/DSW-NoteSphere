import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string = '';
  isDropdownActive: boolean = false;  // Estado para controlar la visibilidad del menú desplegable

  constructor(private authService: AuthService, private router: Router) { }

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
    // Implementa la lógica para eliminar la cuenta del usuario
  }
}
