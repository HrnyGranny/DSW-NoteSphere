import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Importa el módulo HttpClientModule
import { FormsModule } from '@angular/forms'; // Si vas a usar formularios template-driven

import { AppComponent } from './app.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteCreateComponent } from './note-create/note-create.component';
import { LoginComponent } from './login/login.component';

// Importa los servicios
import { NotesService } from './notes.service';
import { AuthService } from './auth.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'notes', component: NoteListComponent },
  { path: 'notes/create', component: NoteCreateComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    NoteCreateComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule, // Agrega el módulo HttpClientModule
    FormsModule // Si vas a usar formularios template-driven
  ],
  providers: [
    // Provee los servicios
    NotesService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

