/* 
Esta libreria nos permite cargar, variables de entorno de un archivo .env
es util, para cuando estamos en desarrollo.
*/
require('dotenv').config()

// app.js
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const videoController = require('./controllers/videoController');
const playlistController = require('./controllers/playlistController');
const pgPool = require('./db.js')

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar EJS y el middleware de layout
app.set('view engine', 'ejs');
//app.use(ejsLayout);

// Configuración de Express para servir archivos estáticos
app.use(express.static('public'));

// Configuración de multer para subir archivos
const upload = multer({ dest: 'public/uploads/' });

// Ruta home
app.get('/', (req, res) => {
  res.render('home/index');
});

// Rutas de la Aplicacion
app.get('/videos', async (req, res) => {
  try {
    await videoController.getVideosPage(req, res, pgPool); // Pasa 'pool' como parámetro
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

app.get('/upload', videoController.getUploadForm);
app.post('/upload', upload.single('video'), videoController.uploadVideo);
app.get('/delete/:id', videoController.deleteVideo);
app.get('/reproductor', videoController.getReproductorPage);
app.post('/rename/:id', videoController.renameVideo);

app.get('/playlists', playlistController.getPlaylists);
app.get('/playlists/create', playlistController.getCreateForm);
app.post('/playlists/create', playlistController.createPlaylist);
app.get('/playlists/:id', playlistController.getPlaylistDetails);
app.get('/playlists/:id/delete', playlistController.deletePlaylist);

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

