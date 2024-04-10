const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const authenticateToken = require('../middleware/authenticate');

// Obtener todas las notas
router.get('/', authenticateToken, async (req, res) => {
    try {
        const notes = await Note.find(); // Obtener todas las notas
        res.json(notes); // Devolver las notas como JSON
    } catch (err) {
        res.status(500).json({ message: err.message }); // Manejar errores
    }
});

// Obtener una nota por su ID
router.get('/:id', authenticateToken, getNote, (req, res) => {
    res.json(res.note);
});

// Crear una nota
router.post('/', authenticateToken, async (req, res) => {
    const note = new Note({
        title: req.body.title,
        content: req.body.content,
        type: req.body.type,
        user: req.user.id
    });

    try {
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Actualizar una nota
router.patch('/:id', authenticateToken, getNote, async (req, res) => {
    if (req.body.title != null) {
        res.note.title = req.body.title;
    }
    if (req.body.content != null) {
        res.note.content = req.body.content;
    }
    if (req.body.type != null) {
        res.note.type = req.body.type;
    }
    try {
        const updatedNote = await res.note.save();
        res.json(updatedNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar una nota
router.delete('/:id', authenticateToken, getNote, async (req, res) => {
    try {
        await res.note.remove();
        res.json({ message: 'Nota eliminada correctamente' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getNote(req, res, next) {
    let note;
    try {
        note = await Note.findById(req.params.id);
        if (note == null) {
            return res.status(404).json({ message: 'Nota no encontrada' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.note = note;
    next();
}

module.exports = router;
