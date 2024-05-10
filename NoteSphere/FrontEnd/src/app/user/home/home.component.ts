import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/users.service';
import { RequestsService } from '../../services/requests.service';
import { Request } from '../../models/request.model';
import { FriendsService } from '../../services/friends.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private userService: UserService,
    private requestsService: RequestsService,
    private friendsService: FriendsService
  ) { }

  ngOnInit(): void {
    this.username = this.authService.getUser();

    this.requestsService.getRequests(this.username).subscribe(
      requests => {
        this.handleFriendRequests(requests);
      },
      error => {
        console.error('Error getting requests:', error);
      }
    );
  }

  handleFriendRequests(requests: Request[]): void {
    if (requests.length === 0) {
      return;
    }

    const request = requests.pop();

    if (request && request.status === 'wait') {
      this.handleFriendRequest(request).then(() => {
        // Handle the next request
        this.handleFriendRequests(requests);
      });
    } else {
      // If the request is not waiting, handle the next request
      this.handleFriendRequests(requests);
    }
  }

  handleFriendRequest(request: Request): Promise<void> {
    return this.showFriendRequestAlert(request).then((result) => {
      if (result.isConfirmed) {
        this.updateRequestStatus(request, 'ok');
      } else if (result.isDismissed) {
        this.updateRequestStatus(request, 'out');
      }
    });
  }

  showFriendRequestAlert(request: Request): Promise<SweetAlertResult> {
    return Swal.fire({
      title: 'Friend request',
      text: `You have a friend request from ${request.sender}`,
      showCancelButton: true,
      confirmButtonText: 'Accept',
      cancelButtonText: 'Decline'
    });
  }

  updateRequestStatus(request: Request, status: string): void {
    this.requestsService.updateRequest(request._id, request.username, request.sender, status).subscribe(
      () => {
        console.log('Request status updated successfully');
        if (status === 'ok') {
          this.createFriendship(request.sender);
        }
      },
      error => {
        console.error('Error updating request status:', error);
      }
    );
  }
  
  createFriendship(friendUsername: string): void {
    // Create the friendship from the current user to the friend
    this.friendsService.createFriend({
      username: this.username, friend: friendUsername,
      _id: ''
    }).subscribe(() => {
      // Create the friendship from the friend to the current user
      this.friendsService.createFriend({
        username: friendUsername, friend: this.username,
        _id: ''
      }).subscribe(() => {
        Swal.fire({
          title: 'Friendship successfully created.',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        });
      });
    });
  }

  notes(): void {
    this.router.navigate(['/user/notes']);
  }
  
  friendship(): void {
    this.router.navigate(['/user/friendship']);
  }

  return(): void {
    this.router.navigate(['/admin']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirige al usuario al LoginComponent
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