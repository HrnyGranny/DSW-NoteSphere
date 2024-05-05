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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.username = this.authService.getUser();
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
    this.router.navigate(['/login']); // Redirige al usuario al LoginComponent
  }

  deleteAccount(): void {
    // Aquí puedes implementar la lógica para eliminar la cuenta del usuario
  }
}
