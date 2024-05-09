import { Component, OnInit } from '@angular/core';
import { Note } from '../models/note.model';
import { NotesService } from '../services/notes.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notes-adm.component.html',
  styleUrls: ['./notes-adm.component.css']
})
export class NotesAdmComponent implements OnInit {
  notas: Note[] = [];
  username: string = '';

  constructor(private authService: AuthService, private router: Router, private notesService: NotesService) { }

  ngOnInit(): void {
    this.obtenerNotas();
    this.username = this.authService.getUser();
  }

  obtenerNotas(): void {
    this.notesService.getAllNotes().subscribe(
      notas => {
        this.notas = notas;
      },
      error => {
        console.error('Error al obtener las notas:', error);
      }
    );
  }

  editarNota(nota: Note): void {
    // Aquí puedes implementar la lógica para editar una nota
    console.log('Editar nota:', nota);
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

  return(): void {
    this.router.navigate(['/admin']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);  // Redirige al usuario al LoginComponent
  }
}