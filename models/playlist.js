const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dbvideoapp',
  password: 'admin',
  port: 5432,
});

class Playlist {
  static async getAllPlaylists() {
    const result = await pool.query('SELECT * FROM playlists');
    return result.rows;
  }

  static async createPlaylist(name) {
    const result = await pool.query('INSERT INTO playlists (name) VALUES ($1) RETURNING *', [name]);
    return result.rows[0];
  }

  // Modificamos esta función para traer los videos asociados a una playlist
  static async getPlaylistWithVideos(playlistId) {
    const result = await pool.query('SELECT playlists.*, videos.* FROM playlists INNER JOIN videos ON playlists.id = videos.playlist_id WHERE playlists.id = $1', [playlistId]);
    return result.rows;
  }

  static async deletePlaylist(playlistId) {
    await pool.query('DELETE FROM playlists WHERE id = $1', [playlistId]);
  }
}

module.exports = Playlist;



