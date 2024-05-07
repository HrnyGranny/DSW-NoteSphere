import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../services/friends.service';
import { Friend } from '../models/friend.model';

@Component({
  selector: 'app-friendship-adm',
  templateUrl: './friendship-adm.component.html',
  styleUrls: ['./friendship-adm.component.css']
})
export class FriendshipAdmComponent implements OnInit {
  users: { username: string, friends: Friend[] }[] = [];

  constructor(private friendsService: FriendsService) { }

  ngOnInit(): void {
    this.getAllFriends();
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

  deleteFriend(username: string, friendId: string | undefined): void {
    if (friendId) {
      this.friendsService.deleteFriendByUsername(username).subscribe(() => {
        this.getAllFriends(); // Actualiza la lista de amigos después de eliminar un amigo
      });
    } else {
      console.error('friendId is undefined');
    }
  }
}