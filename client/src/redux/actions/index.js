import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_BY_ID = "GET_BY_ID";
export const CLEAR_GAME_DETAIL = "CLEAR_GAME_DETAIL";
export const POST_GAME = "POST_GAME";
export const GET_GENRES = "GET_GENRES";
export const CLEAR_GENRES = "CLEAR_GENRES";
export const ERROR = "ERROR"; 

export const ORDER = "ORDER"; 
export const ORDER_RATING = "ORDER_RATING";  
export const FILTER = "FILTER"; 
export const FILTER_API_BD = "FILTER_API_BD"; 
export const RESET_FILTERS = "RESET_FILTERS"; 



export function getVideogames() {
  return async function (dispatch) {
    try {
      const response = await axios("http://localhost:3001/videogame");
      dispatch({
        type: GET_VIDEOGAMES,
        payload: response.data,
      });
    } catch (error) {
      alert("Error al obtener los videojuegos");
      console.error("Error al obtener los videojuegos:", error);
    }
  };
}


export function getByName(name) {
  return async function (dispatch) {
    try {
      const response = await axios(
        `http://localhost:3001/videogame?name=${name}`
      );
     
        dispatch({
          type: GET_BY_NAME,
          payload: response.data,
        });
      
    } catch (error) {
      alert("Juego no encontrado");
      console.error("Error al obtener el juego por nombre:", error);
    }
  };
}

export function getById(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/videogame/${id}`);
      dispatch({
        type: GET_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      alert("ID no encontrado");
      console.error("Error al obtener el juego por ID:", error);
    }
  };
}


export function clearGameDetail() {
  return {
    type: CLEAR_GAME_DETAIL,
  };
}


export function createGame(input) {
  return async function (dispatch) {
    try {
      const response = await axios.post("http://localhost:3001/videogame", input);
      dispatch({
        type: POST_GAME,
        payload: response.data,
      });
      alert("El juego se creó con éxito");
    } catch (error) {
      alert("Error al crear el juego: " + error.message);
    }
  };
}


export function getGenres() {
  return async function (dispatch) {
    try {
      const response = await axios("http://localhost:3001/genre");
      dispatch({
        type: GET_GENRES,
        payload: response.data,
      });
    } catch (error) {
      alert(error.response.data);
      return dispatch({
        type: ERROR,
        payload: {
          message: error.response.data.message,
        },
      });
    }
  };
}


export function orderGames(sortOption) {
  return {
    type: ORDER,
    payload: sortOption,
  };
}

export function orderRating(order) {
  return {
    type: ORDER_RATING,
    payload: order,
  };
}

export function filterGame(filterOption) {
  return {
    type: FILTER,
    payload: filterOption,
  };
}


export function filterApiBd(filterOption) {
  return {
    type: FILTER_API_BD,
    payload: filterOption,
  };
}

export function resetFilters() {
  return {
    type: RESET_FILTERS,
  };
}



// export function clearGenres() {
//   return {
//     type: CLEAR_GENRES,
//   };
// }
