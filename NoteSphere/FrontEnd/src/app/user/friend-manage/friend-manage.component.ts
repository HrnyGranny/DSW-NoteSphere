import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/users.service';
import { FriendsService } from '../../services/friends.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-friend-manage',
  templateUrl: './friend-manage.component.html',
  styleUrls: ['./friend-manage.component.css']
})
export class FriendManageComponent implements OnInit {
  username: string = '';
  username1: string = '';
  searchUser: string = '';
  friends: string[] = [];

  constructor(private authService: AuthService, private userService: UserService, private friendsService: FriendsService, private router: Router) { }

  ngOnInit(): void {
    this.username = this.authService.getUser();
    this.username1 = this.authService.getUser();
    this.loadFriends();
  }

  loadFriends(): void {
    this.friendsService.getFriendsByUsername(this.username).subscribe(friends => {
      this.friends = friends.map(friend => friend.friend);
    });
  }

  addFriend(): void {
    if (this.searchUser === this.username) {
      Swal.fire({
        title: 'You cannot befriend yourself.',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }
  
    this.userService.checkUsernameExists(this.searchUser).subscribe(exists => {
      if (exists) {
        // Create the friendship from the current user to the friend
        this.friendsService.createFriend({
          username: this.username, friend: this.searchUser,
          _id: ''
        }).subscribe(() => {
          // Create the friendship from the friend to the current user
          this.friendsService.createFriend({
            username: this.searchUser, friend: this.username,
            _id: ''
          }).subscribe(() => {
            this.loadFriends();
            Swal.fire({
              title: 'Friendship successfully created.',
              icon: 'success',
              showConfirmButton: false,
              timer: 2000
            });
          });
        });
      } else {
        Swal.fire({
          title: 'User does not exist',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }

  deleteFriend(friend: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete the friendship from the current user to the friend
        this.friendsService.deleteFriendByUsername(this.username, friend).subscribe(() => {
            // Delete the friendship from the friend to the current user
            this.friendsService.deleteFriendByUsername(friend, this.username).subscribe(() => {
                this.loadFriends();
                Swal.fire({
                  title: 'Friendship successfully deleted.',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 2000
                });
            });
        });
      }
    });
  }
  return(): void {
    this.router.navigate(['/user/friendship']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);  // Redirige al usuario al LoginComponent
  }
}