const getVideogameByNameFromAPI = async (name) => {
    const buildUrl = `https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`;
    
    try {
      const response = await axios.get(buildUrl);
      const results = response.data.results;
      
      // Suponiendo que quieres obtener el primer resultado coincidente
      if (results.length > 0) {
        const videogame = results[0];
        
        const videogameFiltered = {
          id: videogame.id,
          name: videogame.name,
          description: videogame.description,
          platforms: videogame.platforms.map((platform) => platform.platform.name),
          background_image: videogame.background_image,
          genres: videogame.genres.map((genre) => genre.name),
          released: videogame.released,
          rating: videogame.rating,
        };
        
        return videogameFiltered;
      } else {
        throw new Error("No se encontró ningún videojuego con ese nombre.");
      }
    } catch (error) {
      // Manejar el error de la solicitud a la API
      console.error(error);
      throw new Error("No se pudo obtener el videojuego de la API.");
    }
  };
  
  module.exports = {
    getVideogameByNameFromAPI,
  };

//!_________________________________________________________



  const getVideogameByIdFromAPI = async (idVideogame) => {
    const buildUrl = `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`;
    
    try {
      const response = await axios.get(buildUrl);
      const videogame = response.data;
      
      const videogameFiltered = {
        id: videogame.id,
        name: videogame.name,
        description: videogame.description,
        platforms: videogame.platforms.map((platform) => platform.platform.name),
        background_image: videogame.background_image,
        genres: videogame.genres.map((genre) => genre.name),
        released: videogame.released,
        rating: videogame.rating,
      };
      
      return videogameFiltered;
    } catch (error) {
      // Manejar el error de la solicitud a la API
      console.error(error);
      throw new Error("No se pudo obtener el videojuego de la API.");
    }
  };
  
  module.exports = {
    getVideogameByIdFromAPI,
  };

  //!________________________________________________________________

  genres.forEach(async (element) => {
    const [dbGenre, created] = await Genres.findOrCreate({
      where: { name: element },
      defaults: { name: element },
    });
    await newGame.addGenres(dbGenre);
  });