const axios = require("axios");
const { Genre } = require("../db");
const { genreCleaner } = require("../utils/Cleaner");
const { API_KEY } = process.env;

const getAllGenresAPI = async () => {
  
    const infoAPI = (
      await axios.get(`https://api.rawg.io/api/genres${API_KEY}`)
    ).data.results;
 
    const gameGenres = genreCleaner(infoAPI); 
    
    return gameGenres

};

const getAllGenres = async () => {
  let dbGenres = false;

  if (dbGenres === false) {
    const allGenres = await getAllGenresAPI();
    dbGenres = true;

    const setGenresDB = allGenres.map(async (item) => {
      await Genre.findOrCreate({
        where: { nombre: item },
        defaults: { nombre: item },
      });
    });

    await Promise.all(setGenresDB);
  }

  const allGenresFromDB = await Genre.findAll();
  return allGenresFromDB;
};



  

module.exports = getAllGenres;
