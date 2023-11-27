// controllers/videoController.js
const Video = require('../models/video');
const Playlist = require('../models/playlist');

// Obtén la lista de videos desde la base de datos
exports.getVideosPage = async (req, res) => {
  try {
    const videos = await Video.getAllVideos();
    res.render('videos/index', { videos });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};

// Obtén la lista de listas de reproducción y renderiza el formulario de carga
exports.getUploadForm = async (req, res) => {
  try {
    const playlists = await Playlist.getAllPlaylists();
    res.render('videos/upload', { playlists });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};

// Sube un nuevo video a la base de datos
exports.uploadVideo = async (req, res) => {
  try {
    const { title, description, playlistId } = req.body;
    const filename = req.file.filename;
    await Video.insertVideo(title, description, filename, playlistId);
    res.redirect('/videos'); // Redirige a la lista de videos después de la carga
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};

// Elimina un video de la base de datos
exports.deleteVideo = async (req, res) => {
  try {
    const videoId = req.params.id;
    await Video.deleteVideo(videoId);
    res.redirect('/videos'); // Redirige a la lista de videos después de la eliminación
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};

// Obtener la lista de reproduccion y renderizar en el reproductor  
exports.getReproductorPage = async (req, res) => {
  try {
    const videos = await Video.getPlaylistWithVideos(); // Ajusta el nombre de la función

    const videoSources = videos.map((video) => {
      return {
        sources: [
          { src: `/uploads/${video.filename}`, type: 'video/mp4' },
          // Puedes agregar más formatos si es necesario
        ],
        name: video.title,
        description: video.description,
        playlist: video.playlist, // Asegúrate de tener la información correcta de la lista de reproducción aquí
      };
    });

    res.render('videos/reproductor', { videoSources });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};



// Cambia el nombre de un video en la base de datos
exports.renameVideo = async (req, res) => {
  try {
    const videoId = req.params.id;
    const { newName } = req.body;
    await Video.renameVideo(videoId, newName);
    res.redirect('/videos'); // Redirige a la lista de videos después de cambiar el nombre
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};

