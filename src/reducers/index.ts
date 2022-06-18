import { Action, State } from "src/types";
import { END_LOADING, SEARCH_DATA, SET_DATA, START_LOADING } from '../const';

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_DATA:
      return {...state, data: action.payload};
    case SEARCH_DATA:
      return {...state, searchData: action.payload};

    case START_LOADING:
      return {...state, isLoading: true};
    case END_LOADING:
      return {...state, isLoading: false};

    default:
      return state;
  }
};

export default reducer;
