// controllers/playlistController.js
const Playlist = require('../models/playlist');
const Video = require('../models/video'); 

exports.getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.getAllPlaylists();
    res.render('playlists/index', { playlists });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};

exports.getCreateForm = async (req, res) => {
  try {
    // Obtén la lista de videos para mostrar en el formulario de creación de playlists
    const videos = await Video.getAllVideos();

    res.render('playlists/create', { videos });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};

exports.createPlaylist = async (req, res) => {
  try {
    const { name, selectedVideos } = req.body;

    // Crear la playlist
    const playlist = await Playlist.createPlaylist(name);

    // Si hay videos seleccionados, asignarlos a la playlist
    if (selectedVideos && selectedVideos.length > 0) {
      await Video.assignVideosToPlaylist(playlist.id, selectedVideos);
    }

    res.redirect('/playlists');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};

exports.getPlaylistDetails = async (req, res) => {
  try {
    const playlistId = req.params.id;
    const playlistWithVideos = await Playlist.getPlaylistWithVideos(playlistId);
    res.render('playlists/details', { playlist: playlistWithVideos });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};

exports.deletePlaylist = async (req, res) => {
  try {
    const playlistId = req.params.id;
    await Playlist.deletePlaylist(playlistId);
    res.redirect('/playlists');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};

