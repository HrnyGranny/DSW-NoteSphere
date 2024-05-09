import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotesAdmComponent } from './notes-adm/notes-adm.component';
import { UsersAdmComponent } from './users-adm/users-adm.component';
import { FriendshipAdmComponent } from './friendship-adm/friendship-adm.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersEditComponent } from './users-edit/users-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'notesAdm', component: NotesAdmComponent },
  { path: 'usersAdm', component: UsersAdmComponent },
  { path: 'usersAdm/create', component: UserCreateComponent},
  { path: 'friendshipAdm', component: FriendshipAdmComponent },
  { path: 'usersAdm/edit/:username', component: UsersEditComponent }
];

@NgModule({
  declarations: [
    HomeComponent,
    NotesAdmComponent,
    UsersAdmComponent,
    FriendshipAdmComponent,
    UserCreateComponent,
    UsersEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
