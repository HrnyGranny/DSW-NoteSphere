const express = require('express');
const router = express.Router();
const Request = require('../models/request');

// Obtener todas las solicitudes
router.get('/', (req, res) => {
    Request.find()
      .then(requests => res.json(requests))
      .catch(err => res.status(500).json({ error: err.message }));
  });  

// Obtener las solicitudes con estado "wait" para un usuario
router.get('/:username', (req, res) => {
  Request.find({ username: req.params.username, status: 'wait' })
    .then(requests => res.json(requests))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Crear una nueva solicitud
router.post('/', (req, res) => {
  const newRequest = new Request({
    username: req.body.username,
    sender: req.body.sender,
    status: req.body.status
  });

  newRequest.save()
    .then(() => res.json({ message: 'Request created successfully' }))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Editar una solicitud
router.put('/:id', (req, res) => {
  Request.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(request => res.json({ message: 'Request updated successfully', request }))
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;