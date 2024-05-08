import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../services/users.service';
import { FriendsService } from '../services/friends.service';

@Component({
  selector: 'app-friend-manage',
  templateUrl: './friend-manage.component.html',
  styleUrls: ['./friend-manage.component.css']
})
export class FriendManageComponent implements OnInit {
  username: string = '';
  searchUser: string = '';
  friends: string[] = [];

  constructor(private authService: AuthService, private userService: UserService, private friendsService: FriendsService) { }

  ngOnInit(): void {
    this.username = this.authService.getUser();
    this.loadFriends();
  }

  loadFriends(): void {
    this.friendsService.getFriendsByUsername(this.username).subscribe(friends => {
      this.friends = friends.map(friend => friend.friend);
    });
  }

  addFriend(): void {
    this.userService.checkUsernameExists(this.searchUser).subscribe(exists => {
      if (exists) {
        this.friendsService.createFriend({
          username: this.username, friend: this.searchUser,
          _id: ''
        }).subscribe(() => {
          this.loadFriends();
        });
      } else {
        alert('El usuario no existe');
      }
    });
  }

  deleteFriend(friend: string): void {
    this.friendsService.deleteFriendByUsername(this.username, friend).subscribe(() => {
        this.loadFriends();
    });
}
}