require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postsRouter = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/blog';

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/posts', postsRouter);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Conectar a MongoDB y arrancar servidor
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error de conexion a MongoDB:', err);
    process.exit(1);
  });
