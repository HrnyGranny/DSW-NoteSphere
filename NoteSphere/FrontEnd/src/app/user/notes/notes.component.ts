import { Component, OnInit } from '@angular/core';
import { Note } from '../../models/note.model';
import { NotesService } from '../../services/notes.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/users.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notas: Note[] = [];
  usuarios: User[] = [];
  username: string = '';

  constructor(private notesService: NotesService, private authService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.username = this.authService.getUser();
    this.obtenerNotasPorUsuario(this.username);
    this.obtenerUsuarios();
  }

  obtenerNotasPorUsuario(usuario: string): void {
    this.notesService.getNotesByOwner(usuario).subscribe(
      notas => {
        this.notas = notas;
      },
      error => {
        console.error('Error al obtener las notas:', error);
      }
    );
  }

  obtenerUsuarios(): void {
    this.userService.getAllUsers().subscribe(
      usuarios => {
        this.usuarios = usuarios;
      },
      error => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }

  eliminarNota(id: string): void {
    if (confirm('Are you sure you want to delete this note?')) {
      this.notesService.deleteNote(id).subscribe(
        () => {
          // Eliminar la nota de la lista local de notas
          this.notas = this.notas.filter(nota => nota._id !== id);
        },
        error => {
          console.error('Error al eliminar la nota:', error);
        }
      );
    }
  }

  editarNota(nota: Note): void {
    this.router.navigate(['/user/notes/edit', nota._id]);
  }

  compartirNota(nota: Note, usuario: User): void {
    if (usuario.username === this.username) {
      alert('You cannot share a note with yourself.');
      return;
    }
  
    this.notesService.getNotesByOwner(usuario.username).subscribe(
      notasUsuario => {
        const notaExistente = notasUsuario.find(n => n.title === nota.title && n.content === nota.content);
        if (notaExistente) {
          alert('The user already has this note.');
        } else {
          const nuevaNota = { ...nota, owner: usuario.username };
          this.notesService.createNote(nuevaNota).subscribe(
            () => console.log('Nota compartida con éxito'),
            error => console.error(error)
          );
        }
      },
      error => console.error(error)
    );
  }

  navigateToCreateNote(): void {
    this.router.navigate(['/user/notes/create']);
  }

  return(): void {
    this.router.navigate(['/user']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);  // Redirige al usuario al LoginComponent
  }
}

