import { END_LOADING, SEARCH_DATA, SET_DATA, START_LOADING } from '../src/const';

export type Action = {
  type:
    | typeof SET_DATA
    | typeof START_LOADING
    | typeof END_LOADING
    | typeof SEARCH_DATA;
  payload?: any[];
};

export interface State {
  isLoading: boolean;
  data: any[] | undefined;
  searchData: any[] | undefined;
}
