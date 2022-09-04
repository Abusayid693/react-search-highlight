import { Action, State } from "src/types";
import { END_LOADING, RESET_STATE, SEARCH_DATA, SET_INPUT, START_LOADING } from '../const';

import { initialState } from "../context";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_INPUT:
      return {...state, input: action.payload};
    case SEARCH_DATA:
      return {...state, searchData: action.payload};
    case START_LOADING:
      return {...state, isLoading: true};
    case END_LOADING:
      return {...state, isLoading: false};
    case RESET_STATE:
      return {...initialState}  
    default:
      return state;
  }
};

export default reducer;
