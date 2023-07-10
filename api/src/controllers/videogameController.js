const axios = require("axios");
const { Videogame } = require("../db");
const {infoCleaner, objectCleaner} = require("../utils/Cleaner");
const {
  API_KEY
} = process.env;

 //? POR ID

const getVideogameById = async (id, source) => {

  const game =
    source === "API"
      ? objectCleaner((await axios.get(
          `https://api.rawg.io/api/games/${id}${API_KEY}`
        )).data)
      : await Videogame.findByPk(id);
  return game;
};

//? CREAR 

const createVideogameDB = async (
  nombre,
  plataformas,
  imagen,
  fecha_de_lanzamiento,
  rating,
  descripcion,
  creado,
  
) => {
  return await Videogame.create({
    nombre,
    plataformas,
    imagen,
    fecha_de_lanzamiento,
    rating,
    descripcion,
    creado,
    
  });
};


  //? TODOS


const getAllVideogames = async () => {
  
  const videogamesBD = await Videogame.findAll();

  const apiCleanVideogames = [];
  let page = 1;

  while (apiCleanVideogames.length < 100) {
    const response = await axios.get(`https://api.rawg.io/api/games${API_KEY}&page=${page}`);
    const games = response.data.results;
    const cleanGames = infoCleaner(games);
    apiCleanVideogames.push(...cleanGames);
    page++;
  }

  return [...videogamesBD, ...apiCleanVideogames.slice(0, 100)];
  
};

    //? POR NOMBRE

const getVideogameByName = async (nombre) => {


  const infoAPI = (await axios.get(
    `https://api.rawg.io/api/games${API_KEY}`
  )).data.results;

  const gamesAPI = infoCleaner(infoAPI);

  const gameFiltered = gamesAPI.filter((element) => element.nombre === nombre)
  
  const gamesDB = await Videogame.findAll({where: {nombre: nombre}})

  return [...gamesDB, ...gameFiltered]

};



module.exports = {
  getVideogameById,
  createVideogameDB,
  getVideogameByName,
  getAllVideogames,
};
