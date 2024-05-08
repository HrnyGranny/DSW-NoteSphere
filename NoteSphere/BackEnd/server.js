const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser'); // Importa bodyParser

const app = express();

// Configuración de la conexión a MongoDB Atlas
const MONGODB_URI = 'mongodb+srv://HornyGranny:Ragnarok12.@cluster0.lsfk5ox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MONGODB_URI)
.then(() => console.log('Conexión a MongoDB Atlas establecida'))
.catch(err => console.error('Error al conectar a MongoDB Atlas:', err));

// Middleware para aceptar JSON en las solicitudes y configuración del límite de tamaño del cuerpo
app.use(cors()); // Habilita CORS para todas las solicitudes
app.use(bodyParser.json({ limit: 'Infinity' }));
app.use(bodyParser.urlencoded({limit: 'Infinity', extended: true}));

// Rutas para las notas y los usuarios
const notesRouter = require('./routes/notes');
const usersRouter = require('./routes/users');
const friendsRouter = require('./routes/friends');
const authRouter = require('./routes/auth');

app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);
app.use('/api/friends', friendsRouter);
app.use('/api/auth', authRouter);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
