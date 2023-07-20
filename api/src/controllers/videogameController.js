const axios = require("axios");
const { Videogame, Genre } = require("../db");
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
  genero,
  descripcion,
  creado,
  
) => {
  const juego = await Videogame.create({
    nombre,
    plataformas,
    imagen,
    fecha_de_lanzamiento,
    genero,
    rating,
    descripcion,
    creado,
    
  });
//!_________RELACION DE LAS TABLAS______________
//   const relacion = await genero.map(async (g)=>{ return await Genre.findOne({where: {nombre: g}})
  
// })

// Promise.all(relacion)
// .then((e) => {console.log(e) 
//   const final = e.map((algo)=> algo.dataValues)
//   juego.addGenre(final.map( g => g.id))})
// // const relcaion = await Genre.findAll({where: {nombre: g}})
// console.log(relacion)
// return juego

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

    const getVideogameByName = async (name) => {
      const allVideogames = await getAllVideogames();
      const lowercaseName = name.toLowerCase();
    
      const gameFiltered = allVideogames.filter((element) =>
        element.nombre.toLowerCase().includes(lowercaseName)
      );
    
      if (gameFiltered.length > 0) {
        return gameFiltered.slice(0, 15);
      } else {
        throw new Error("Juego no encontrado");
      }
    };
    


module.exports = {
  getVideogameById,
  createVideogameDB,
  getVideogameByName,
  getAllVideogames,
};
