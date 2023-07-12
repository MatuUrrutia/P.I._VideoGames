import { GET_VIDEOGAMES, GET_BY_NAME } from "../actions/index";

let initalState = { allVideogames: [], allVideogamesCopy: [], allGenres: [] };

function rootReducer(state = initalState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        allVideogames: action.payload,
        allVideogamesCopy: action.payload,
      };

      case GET_BY_NAME:
      return {
        ...state,
        allVideogames: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
