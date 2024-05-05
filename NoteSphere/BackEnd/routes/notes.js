const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const authenticateToken = require('../middleware/authenticate');

// Obtener todas las notas
router.get('/', authenticateToken, async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obtener todas las notas del usuario por su propietario
router.get('/owner/:owner', authenticateToken, async (req, res) => {
    try {
        const notes = await Note.find({ owner: req.params.owner });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Crear una nota
router.post('/', authenticateToken, async (req, res) => {
    const note = new Note({
        title: req.body.title,
        content: req.body.content,
        owner: req.user.username // Asigna el propietario como el nombre de usuario autenticado
    });

    try {
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar una nota por su título
router.delete('/:title', authenticateToken, async (req, res) => {
    try {
        await Note.findOneAndDelete({ title: req.params.title });
        res.json({ message: 'Nota eliminada correctamente' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
