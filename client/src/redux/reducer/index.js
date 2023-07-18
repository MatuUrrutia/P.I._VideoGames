import {
  GET_VIDEOGAMES,
  GET_BY_NAME,
  GET_BY_ID,
  CLEAR_GAME_DETAIL,
  POST_GAME,
  GET_GENRES,
  CLEAR_GENRES,
  ERROR,
  ORDER,
  FILTER,
  RESET_FILTERS,
  FILTER_API_BD,
} from "../actions/index";

let initialState = {
  allVideogames: [],
  allGamesCopy: [],
  mainOrder: [],
  byName: [],
  allGenres: [],
  gameDetail: [],
  newGames: [],
  error: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        allVideogames: action.payload,
        allGamesCopy: action.payload,
        mainOrder: action.payload,
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

    case POST_GAME:
      return {
        ...state,
        newGames: action.payload,
      };

    case GET_GENRES:
      return {
        ...state,
        allGenres: action.payload,
        error: null,
      };

    // case CLEAR_GENRES:
    //   return {
    //     ...state,
    //     allGenres: [],
    //   };

    case ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case RESET_FILTERS:
      return {
        ...state,
        allVideogames: state.allGamesCopy,
        error: null,
      };

    case ORDER:
      let orden;
      if (action.payload === "a-z") {
        orden = state.allVideogames
          .slice()
          .sort((a, b) => a.nombre.localeCompare(b.nombre));
      } else if (action.payload === "z-a")  {
        orden = state.allVideogames
          .slice()
          .sort((a, b) => b.nombre.localeCompare(a.nombre));
      } else {orden = state.mainOrder}
      return {
        ...state,
        allVideogames: orden,
        error: null,
      };

    case FILTER_API_BD:
      let filteredGames;
      if (action.payload === "Created") {
        filteredGames = state.allGamesCopy.filter((game) => game.creado);
      } else if (action.payload === "API"){
        filteredGames = state.allGamesCopy.filter((game) => !game.creado);
      } else {filteredGames = state.allGamesCopy}
      return {
        ...state,
        allVideogames: filteredGames,
        error: null,
      };

    case FILTER:
      return {
        ...state,
        allVideogames: state.allGamesCopy.filter((game) => {
          if (game.genero) {
            const genres = Array.isArray(game.genero)
              ? game.genero
              : [game.genero];
            return genres.some((genre) => genre === action.payload);
          }
          return false;
        }),
        error: null,
      };



    default:
      return state;
  }
}

export default rootReducer;
