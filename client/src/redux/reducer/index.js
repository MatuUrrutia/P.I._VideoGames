import {
  GET_VIDEOGAMES,
  GET_BY_NAME,
  GET_BY_ID,
  CLEAR_GAME_DETAIL,
} from "../actions/index";

let initialState = {
  allVideogames: [],
  allGenres: [],
  gameDetail: [],
};


function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        allVideogames: action.payload,
      };

    case GET_BY_NAME:
      return {
        ...state,
        allVideogames: action.payload,
      };

    case GET_BY_ID:
      return {
        ...state,
        gameDetail: action.payload,
      };

      case CLEAR_GAME_DETAIL:
      return {
        ...state,
        gameDetail: [],
      };

    default:
      return state;
  }
}

export default rootReducer;


