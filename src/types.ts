import { Dispatch } from "react";
import { END_LOADING, SEARCH_DATA, SET_INPUT, START_LOADING } from '../src/const';

export type Action = {
  type:
    | typeof SET_INPUT
    | typeof START_LOADING
    | typeof END_LOADING
    | typeof SEARCH_DATA;
  payload?: any;
};

export interface State {
  isLoading: boolean;
  searchData: any[] | undefined;
  input: string
}


export type ContextType = {
  state: State;
  dispatch: Dispatch<Action> | undefined;
  startLoading: VoidFunction;
  endLoading: VoidFunction;
};