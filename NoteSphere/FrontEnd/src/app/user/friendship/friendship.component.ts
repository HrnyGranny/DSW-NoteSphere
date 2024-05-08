import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-friendship',
  templateUrl: './friendship.component.html',
  styleUrls: ['./friendship.component.css']
})
export class FriendshipComponent implements OnInit {
  username: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.username = this.authService.getUser();
    console.log('Propietario de la nota:', this.username);
  }

  manageFriends(): void {
    this.router.navigate(['/user/friendship/friendManage']);
  }
  
  friendNotes(): void {
    this.router.navigate(['/user/friendship/friendNotes']);
  }
}