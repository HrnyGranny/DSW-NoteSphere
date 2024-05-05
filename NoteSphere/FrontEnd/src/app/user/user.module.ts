import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotesComponent } from './notes/notes.component';
import { FriendshipComponent } from './friendship/friendship.component';
import { NotesCreateComponent } from './notes-create/notes-create.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'friendship', component: FriendshipComponent }
];

@NgModule({
  declarations: [
    HomeComponent,
    NotesComponent,
    FriendshipComponent,
    NotesCreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }