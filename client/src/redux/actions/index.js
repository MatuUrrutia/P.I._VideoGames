import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_BY_NAME = "GET_BY_NAME";


export function getVideogames() {
  return async function (dispatch) {
    const response = await axios(
      "http://localhost:3001/videogame"
    );
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: response.data,
    });
  };
}


export function getByName(name) {
  return async function (dispatch) {
    const response = await axios(
      `http://localhost:3001/videogame?name=${name}`
    );
    return dispatch({
      type: "GET_BY_NAME",
      payload: response.data,
    });
  };
}

