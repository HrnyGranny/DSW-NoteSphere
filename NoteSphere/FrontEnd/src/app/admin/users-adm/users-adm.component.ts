import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You cannot delete yourself',
        timer: 2000, 
        showConfirmButton: false 
      });
      return;
    }
  
    Swal.fire({
      title: 'Are you sure you want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(username).subscribe(
          () => {
            // Remove the user from the local users list
            this.users = this.users.filter(u => u.username !== username);
            Swal.fire({
              icon: 'success',
              title: 'User deleted successfully',
              timer: 2000, 
              showConfirmButton: false 
            });
          },
          error => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error deleting the user',
              timer: 2000, 
              showConfirmButton: false 
            });
          }
        );
      }
    });
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
