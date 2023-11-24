// models/video.js
const pool = require('../db');

const getAllVideos = async () => {
  const result = await pool.query('SELECT * FROM videos');
  return result.rows;
};

const insertVideo = async (title, description, filename, playlistId) => {
  const result = await pool.query('INSERT INTO videos (title, description, filename, playlist_id) VALUES ($1, $2, $3, $4) RETURNING *', [title, description, filename, playlistId]);
  return result.rows[0];
};

const deleteVideo = async (videoId) => {
  await pool.query('DELETE FROM videos WHERE id = $1', [videoId]);
};

const renameVideo = async (videoId, newName) => {
  await pool.query('UPDATE videos SET title = $1 WHERE id = $2', [newName, videoId]);
};

module.exports = {
  getAllVideos,
  insertVideo,
  deleteVideo,
  renameVideo,
};

