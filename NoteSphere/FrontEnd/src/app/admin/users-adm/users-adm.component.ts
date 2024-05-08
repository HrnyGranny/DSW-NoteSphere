import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './users-adm.component.html',
  styleUrls: ['./users-adm.component.css']
})
export class UsersAdmComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
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
}
