import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FriendsService } from '../../services/friends.service';
import { NotesService } from '../../services/notes.service';
import { Friend } from '../../models/friend.model';
import { Router } from '@angular/router';
import { Note } from '../../models/note.model';

interface FriendWithNotes {
  friend: Friend;
  notes: Note[];
}

@Component({
  selector: 'app-friend-notes',
  templateUrl: './friend-notes.component.html',
  styleUrls: ['./friend-notes.component.css']
})
export class FriendNotesComponent implements OnInit {
  user: string = '';
  friendsWithNotes: FriendWithNotes[] = [];
  username: string = '';

  constructor(
    private authService: AuthService,
    private friendsService: FriendsService,
    private notesService: NotesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.username = this.authService.getUser();
    this.loadFriendsWithNotes();
  }

  loadFriendsWithNotes(): void {
    this.friendsService.getFriendsByUsername(this.user).subscribe(friends => {
      friends.forEach(friend => {
        this.notesService.getNotesByOwner(friend.friend).subscribe(notes => {
          this.friendsWithNotes.push({ friend, notes });
        });
      });
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