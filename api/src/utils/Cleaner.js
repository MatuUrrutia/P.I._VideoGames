const infoCleaner = (arr) => {
  return arr.map((game) => {
    return {
      id: game.id,
      nombre: game.name,
      plataformas: game.parent_platforms?.map((platforms) => {
        return platforms.platform.name;
      }),
      imagen: game.background_image,
      fecha_de_lanzamiento: game.released,
      rating: game.rating,
      genero: game.genres?.map((genre) => {
        return genre.name;
      }),
      descripcion: game.description_raw,
    };
  });
};


const objectCleaner = (game) => {
  return {
    id: game.id,
    nombre: game.name,
    plataformas: game.parent_platforms?.map((platforms) => {
      return platforms.platform.name;
    }),
    imagen: game.background_image,
    fecha_de_lanzamiento: game.released,
    rating: game.rating,
    genero: game.genres?.map((genre) => {
      return genre.name;
    }),
    descripcion: game.description_raw,
  };
}

const genreCleaner = (arr) => {
  return arr.map((game) => {
    return {
      id: game.id,
      nombre: game.name,
      genero: game.genres?.map((genre) => {
        return genre.name;
      }),
    };
  });
};


module.exports = {infoCleaner, objectCleaner, genreCleaner}

