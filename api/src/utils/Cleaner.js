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


module.exports = infoCleaner;


//!_________________________________

// const infoCleaner = (arr) =>{
  //   return arr.map((game) => {
    //     return {
//       nombre: game.name,
//       plataformas: game.parent_platforms.name, // hacer un map
//       imagen: game.background_image,
//       fecha_de_lanzamiento: game.released,
//       rating: game.rating,
//       descripcion: game.description, //_raw
//       creado: false,
//     };
//   });}




// const infoCleaner = (arr) => {
//   return arr.map((e) => {
//     return {
//       id: e.id,
//       Nombre: e.name,
//       Descripcion: e.description_raw,
//       Plataforma: e.parent_platforms?.map((platforms)=>{
//           return platforms.platform.name
//       }),
//       Rating: e.rating,
//       Imagen: e.background_image,
//      Genero:  e.genres?.map((genre)=>{
//       return genre.name
//   }),
//     };
//   });
// };