import { Component, OnInit } from '@angular/core';
import { Note } from '../models/note.model';
import { NotesService } from '../services/notes.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notas',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notas: Note[] = [];
  username: string = '';

  constructor(private notesService: NotesService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.username = this.authService.getUser();
    this.obtenerNotasPorUsuario(this.username);
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

  eliminarNota(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
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

  compartirNota(nota: Note): void {
    // Implementa aquí la lógica para compartir la nota
    console.log('Compartiendo nota:', nota);
  }

  navigateToCreateNote(): void {
    this.router.navigate(['/user/notes/create']);
  }
}

