import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';

interface Note {
  _id: string;
  title: string;
  content: string;
}

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  notes: Note[] = [];

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.notesService.getAllNotes()
      .subscribe(notes  => this.notes = notes);
  }
}

