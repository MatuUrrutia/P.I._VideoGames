const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const  videogameRouter  = require('./VideogameRouter');
const  genreRouter  = require('./GenreRouter');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

 router.use("/videogame", videogameRouter);
 router.use("/genre", genreRouter);


module.exports = router;

