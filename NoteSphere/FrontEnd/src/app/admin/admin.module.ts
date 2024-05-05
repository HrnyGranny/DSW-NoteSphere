import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotesAdmComponent } from './notes-adm/notes-adm.component';
import { UsersAdmComponent } from './users-adm/users-adm.component';
import { FriendshipAdmComponent } from './friendship-adm/friendship-adm.component';

const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    HomeComponent,
    NotesAdmComponent,
    UsersAdmComponent,
    FriendshipAdmComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
