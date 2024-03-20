import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importa axios para realizar solicitudes HTTP
import './assets/css/Notes.css';

const Notes = () => {
  const [notes, setNotes] = useState([]); // Inicializa el estado de las notas como un array vacío
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    // Define una función para obtener las notas del backend y actualizar el estado
    const fetchNotes = async () => {
      try {
        const response = await axios.get('/api/notes'); // Realiza una solicitud GET al backend para obtener las notas
        setNotes(response.data); // Actualiza el estado de las notas con los datos recibidos del backend
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes(); // Llama a la función para obtener las notas cuando el componente se monta
  }, []); // El array vacío como segundo argumento asegura que el efecto se ejecute solo una vez al montar el componente

  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`/api/notes/${id}`); // Realiza una solicitud DELETE al backend para eliminar la nota con el ID especificado
      setNotes(notes.filter(note => note.id !== id)); // Actualiza el estado de las notas excluyendo la nota eliminada
      setSelectedNote(null); // Borra la nota seleccionada después de eliminarla
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="notes-container">
      <div className="notes-sidebar">
        <h2>Notas</h2>
        <ul>
          {notes.map(note => (
            <li key={note.id} onClick={() => handleNoteClick(note)}>
              {note.title}
              <button className="delete-button" onClick={(e) => {
                e.stopPropagation();
                handleDeleteNote(note.id);
              }}>🗑</button>
            </li>
          ))}
        </ul>
        <button className="add-note-button">+</button>
      </div>
      <div className="note-editor">
        {selectedNote && (
          <div>
            <h2>{selectedNote.title}</h2>
            <p>{selectedNote.content}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
