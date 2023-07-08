const { Videogame } = require("../db"); //!COMPROBAR QUE FUNCIONA LA IMPORTACION DESDE LA DB o PROBAR DESDE MODELS VIDEOGAMES
const {
  createVideogameDB,
  getVideogameById,
  getVideogameByName,
  getAllVideogames,
} = require("../controllers/videogameController");

//? ejemplo

const createVideogameHandler = async (req, res) => {
  res.status(200).send("Aqui se crean los juegos nuevos VVV");
};
//? ejemplo

const getVideogameHandler = async (req, res) => {
  const { name } = req.query;

  try {
    if (name) {
      // res.status(200).send("Aqui van los videojuesgos por nombre");
      const response = await getVideogameByName(name);
      res.status(200).json(response);
    } else {
      // res.status(200).send("Aqui van TODOS los videojuesgos");
      const response = await getAllVideogames();
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getVideogameIdHandler = async (req, res) => {
  const { id } = req.params;

  const source = isNaN(id) ? "BD" : "API";

  try {
    const response = await getVideogameById(id, source);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/*

const createVideogameHandler = async (req, res) => {
  const {
    nombre,
    plataformas,
    imagen,
    fecha_de_lanzamiento,
    rating,
    descripcion,
  } = req.body;

  try {
    const response = await createVideogameDB(
      nombre,
      plataformas,
      imagen,
      fecha_de_lanzamiento,
      rating,
      descripcion,
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


*/

module.exports = {
  getVideogameHandler,
  createVideogameHandler,
  getVideogameIdHandler,
};
