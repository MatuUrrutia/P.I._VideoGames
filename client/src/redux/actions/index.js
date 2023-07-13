import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_BY_ID = "GET_BY_ID";
export const CLEAR_GAME_DETAIL = "CLEAR_GAME_DETAIL";


export function getVideogames() {
  return async function (dispatch) {
    const response = await axios(
      "http://localhost:3001/videogame"
    );
    dispatch({
      type: GET_VIDEOGAMES,
      payload: response.data,
    });
  };
}


export function getByName(name) {
  return async function (dispatch) {
    const response = await axios(
      `http://localhost:3001/videogame?name=${name}`
    );
    dispatch({
      type: GET_BY_NAME,
      payload: response.data,
    });
  };
}


export function getById(id) {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/videogame/${id}`);
    dispatch({
      type: GET_BY_ID,
      payload: response.data,
    });
  };
}

export function clearGameDetail() {
  return {
    type: CLEAR_GAME_DETAIL
  };
}

