const { Videogame } = require("../db"); //!COMPROBAR QUE FUNCIONA LA IMPORTACION DESDE LA DB o PROBAR DESDE MODELS VIDEOGAMES
const {
  createVideogameDB,
  getVideogameById,
  getVideogameByName,
  getAllVideogames,
} = require("../controllers/videogameController");


const getVideogameHandler = async (req, res) => {
  const { name } = req.query;

  try {
    if (name) {
      const response = await getVideogameByName(name);
      res.status(200).json(response);
    } else {
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


const createVideogameHandler = async (req, res) => {
  const {
    nombre,
    plataformas,
    imagen,
    fecha_de_lanzamiento,
    rating,
    descripcion,
    creado,
  } = req.body;

  try {
    const response = await createVideogameDB(
      nombre,
      plataformas,
      imagen,
      fecha_de_lanzamiento,
      rating,
      descripcion,
      creado
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getVideogameHandler,
  createVideogameHandler,
  getVideogameIdHandler,
};
