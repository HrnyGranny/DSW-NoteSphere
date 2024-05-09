import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotesComponent } from './notes/notes.component';
import { FriendshipComponent } from './friendship/friendship.component';
import { NotesCreateComponent } from './notes-create/notes-create.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FriendNotesComponent } from './friend-notes/friend-notes.component';
import { FriendManageComponent } from './friend-manage/friend-manage.component';
import { NotesEditComponent } from './notes-edit/notes-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'notes/create', component: NotesCreateComponent },
  { path: 'friendship', component: FriendshipComponent },
  { path: 'friendship/friendNotes', component: FriendNotesComponent },
  { path: 'friendship/friendManage', component: FriendManageComponent },
  { path: 'notes/edit/:id', component: NotesEditComponent }
];

@NgModule({
  declarations: [
    HomeComponent,
    NotesComponent,
    FriendshipComponent,
    NotesCreateComponent,
    FriendNotesComponent,
    FriendManageComponent,
    NotesEditComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    EditorModule,
    RouterModule.forChild(routes)
    
  ]
})
export class UserModule { }