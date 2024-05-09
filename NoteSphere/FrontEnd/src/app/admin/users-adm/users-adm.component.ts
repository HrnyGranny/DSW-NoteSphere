import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './users-adm.component.html',
  styleUrls: ['./users-adm.component.css']
})
export class UsersAdmComponent implements OnInit {
  users: User[] = [];
  username: string = '';

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
    this.username = this.authService.getUser();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      error => {
        console.error('Error al cargar usuarios:', error);
      }
    );
  }

  deleteUser(username: string): void {
    if (username === this.username) {
      alert('You can not delete yourself');
      return;
    }
  
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      this.userService.deleteUser(username).subscribe(
        () => {
          // Eliminar el usuario de la lista local de usuarios
          this.users = this.users.filter(u => u.username !== username);
        },
        error => {
          console.error('Error al eliminar el usuario:', error);
        }
      );
    }
  }

  navigateToCreateUser(): void {
    this.router.navigate(['admin/usersAdm/create']);
  }

  navigateToEditUser(username: string): void {
    this.router.navigate(['admin/usersAdm/edit', username]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);  // Redirige al usuario al LoginComponent
  }

  return(): void {
    this.router.navigate(['/admin']);
  }
}
