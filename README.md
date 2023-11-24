# Acerca del Programa:
## _Video APP_

La presente aplicación se utilizará como una plataforma para administrar diferentes videos de forma interna para su reproducción en dispositivos anclados en Agencias (Smarts TVs) con el objetivo de publicar videos corporativos. La aplicación cuenta con un menú principal que posee varias vistas.

- **Videos:** Vista general de los videos cargados (Panel de administración de los videos, donde el usuario administrador podrá eliminar los diferentes videos según su necesidad).

- **Upload Videos:** Vista de Carga de videos de manera local hacia el aplicativo. (Antes de hacer la carga de los videos es necesario crear listas de reproducción para asignarle una categoría o lista a los videos).

- **Listas de Reproducción – Playlists:** CRUD para la creación de listas de reproducción.

- **Reproductor:** FrontEnd o interfaz que se usará solo para los usuarios con el Rol de TV. Este reproductor deberá reproducir videos en diferentes formatos .mp4 H264, MPEG y hacer un render de videos según la calidad 720, 1080HD, etc. El reproductor deberá ser capaz de leer listas de reproducción y deberá tener controles para que la reproducción sea continua, incluso tipo Random.

La aplicación hace uso de una base de datos para el registro de videos y creación de playlists, así como el esquema de seguridad para la autenticación de usuarios (Solo el administrador).

Se crea un archivo de definición para la conexión a la BD, el cual se llama `db.js` donde se encuentra el pool para el acceso a la BD (Se pueden cambiar los parámetros desde ahí, o sino desde la `app.js` y hacer uso de ello desde cada modelo creado).

**Paquetes instalados:**
- `express-ejs-layouts`
- `body-parser`
- `video.js`
- `express pg ejs`
- `express mongoose multer ejs`
- `express pg multer cors`

**Server:** Port 3000

**Ejecución de la app:**
```sh
cd REPROVIDEOS
node app.js
```

**Link de Referencia:**
https://blog.logrocket.com/build-video-streaming-server-node/
https://www.100ms.live/blog/nodejs-video-streaming-server




