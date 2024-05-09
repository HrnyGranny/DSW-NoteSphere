const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Route to get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to create a new user
router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        admin: req.body.admin
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route to update an existing user by username
router.patch('/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const updatedUser = await User.findOneAndUpdate({ username }, req.body, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route to delete a user by username
router.delete('/:username', async (req, res) => {
    const { username } = req.params;
    try {
        await User.findOneAndDelete({ username });
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to check if a user exists by username
router.get('/exists/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username });
        if (user) {
            res.json(true); // El usuario existe
        } else {
            res.json(false); // El usuario no existe
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to get a user by username
router.get('/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
