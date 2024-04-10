const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Ruta para iniciar sesión (login)
router.post('/login', async (req, res) => {
    // Buscar al usuario por su nombre de usuario
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }
    
    // Verificar la contraseña
    if (req.body.password !== user.password) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: user._id }, 'secretKey');
    res.json({ token: token });
});

module.exports = router;
