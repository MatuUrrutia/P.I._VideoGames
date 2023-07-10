const axios = require("axios");
const { Genre } = require("../db");
const { genreCleaner } = require("../utils/Cleaner");
const { API_KEY } = process.env;

const getAllGenresAPI = async () => {
  const apiCleanVideogames = [];
  let page = 1;

  while (apiCleanVideogames.length < 500) {
    const infoAPI = (
      await axios.get(`https://api.rawg.io/api/games${API_KEY}&page=${page}`)
    ).data.results;

    const gameGenres = genreCleaner(infoAPI);
    apiCleanVideogames.push(...gameGenres);

    page++;
  }

  const genreArr = apiCleanVideogames.reduce((result, item) => {
    result.push(...item.genero);
    return result;
  }, []);

  const genreArrUnico = [...new Set(genreArr)];

  return genreArrUnico;
};



const getAllGenres = async () => {
    let dbGenres = false;
  
    if (dbGenres === false) {
      const allGenres = await getAllGenresAPI();
      dbGenres = true;
  
      const setGenresDB = allGenres.map(async (item) => {
        await Genre.create({
          nombre: item,
        });
      });
  
      await Promise.all(setGenresDB);
    }
  
    const allGenresFromDB = await Genre.findAll();
    return allGenresFromDB;
  };
  

module.exports = getAllGenres;
