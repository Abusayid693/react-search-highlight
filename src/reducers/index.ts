import { Action, State } from "src/types";
import { END_LOADING, POPOVER_EXPANDED, SEARCH_DATA, SET_INPUT, START_LOADING } from '../const';

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
    case POPOVER_EXPANDED:
      return  {...state, isPopoverExpanded: action.payload};
    default:
      return state;
  }
};

export default reducer;
