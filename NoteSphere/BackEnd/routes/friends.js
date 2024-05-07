const express = require('express');
const router = express.Router();
const Friend = require('../models/friend');

// Obtener todos los amigos de cada usuario
router.get('/', async (req, res) => {
    try {
        const friends = await Friend.find();
        res.json(friends);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obtener todos los amigos del usuario por su nombre de usuario
router.get('/username/:username', async (req, res) => {
    try {
        const friends = await Friend.find({ username: req.params.username });
        res.json(friends);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Crear un amigo
router.post('/', async (req, res) => {
    const friend = new Friend({
        username: req.body.username,
        friend: req.body.friend
    });

    try {
        const newFriend = await friend.save();
        res.status(201).json(newFriend);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar un amigo por su nombre de usuario
router.delete('/username/:username', async (req, res) => {
    try {
        const deletedFriend = await Friend.findOneAndDelete({ username: req.params.username });
        if (!deletedFriend) {
            return res.status(404).json({ message: 'Amigo no encontrado' });
        }
        res.json({ message: 'Amigo eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;