import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string = '';

  constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

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

  return(): void {
    this.router.navigate(['/admin']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);  // Redirige al usuario al LoginComponent
  }

  deleteAccount(): void {
    Swal.fire({
      title: 'Are you sure you want to delete this account?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(this.username).subscribe(
          () => {
            Swal.fire({
              icon: 'success',
              title: 'Account deleted successfully',
              timer: 2000,
              showConfirmButton: false 
            });
            this.authService.logout();
            this.router.navigate(['/login']);  // Redirige al usuario al LoginComponent
          },
          error => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error deleting the account',
              timer: 2000, 
              showConfirmButton: false 
            });
            // Here you can handle errors, for example, show an error message to the user
          }
        );
      }
    });
  }
}
