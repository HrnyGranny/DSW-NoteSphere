import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../../services/friends.service';
import { Friend } from '../../models/friend.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-friendship-adm',
  templateUrl: './friendship-adm.component.html',
  styleUrls: ['./friendship-adm.component.css']
})
export class FriendshipAdmComponent implements OnInit {
  users: { username: string, friends: Friend[] }[] = [];
  username1: string = '';

  constructor(private authService: AuthService, private friendsService: FriendsService, private router: Router) { }

  ngOnInit(): void {
    this.getAllFriends();
    this.username1 = this.authService.getUser();
  }

  getAllFriends(): void {
    this.friendsService.getAllFriends().subscribe(friends => {
      this.users = friends.reduce((acc: any, curr: Friend) => {
        const foundUser = acc.find((user: any) => user.username === curr.username);
        if (foundUser) {
          foundUser.friends.push(curr);
        } else {
          acc.push({ username: curr.username, friends: [curr] });
        }
        return acc;
      }, []);
    });
  }

  deleteFriend(username: string, friend: string): void {
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
        this.friendsService.deleteFriendByUsername(username, friend).subscribe(() => {
          this.friendsService.deleteFriendByUsername(friend, username).subscribe(() => {
            this.getAllFriends();
            Swal.fire({
              title: 'Deleted!',
              text: 'Friendship has been deleted.',
              icon: 'success',
              showConfirmButton: false,
              timer: 2000
            });
          }, error => {
            Swal.fire({
              title: 'Error!',
              text: 'Error deleting friendship.',
              icon: 'error',
              showConfirmButton: false,
              timer: 2000
            });
          });
        }, error => {
          Swal.fire({
            title: 'Error!',
            text: 'Error deleting friendship.',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
          });
        });
      }
    });
  }

  return(): void {
    this.router.navigate(['/admin']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);  // Redirige al usuario al LoginComponent
  }

}