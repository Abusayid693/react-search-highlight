import React, {
  createContext, ReactNode,
  Reducer,
  useContext as useReactContext,
  useMemo,
  useReducer
} from 'react';

import { END_LOADING, RESET_STATE, START_LOADING } from '../const';
import reducer from '../reducers';
import { Action, ContextType, State } from '../types';
import { isResultsNotFound } from "../utils";

export const initialState: State = {
  isLoading: false,
  searchData: [],
  input: '',
};

export const context = createContext<ContextType>(null as any);

/**
 * @returns context data and helper function
 */
export const useReactSearchHighlight = () => {
  return useReactContext(context);
};

export const ReactSearchHighlightProvider: React.FC<{children: ReactNode}> = ({
  children
}) => {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    reducer,
    initialState
  );

  const startLoading = () => {
    dispatch({type: START_LOADING});
  };

  const endLoading = () => {
    dispatch({type: END_LOADING});
  };

  const resetState = () =>{
    dispatch({type: RESET_STATE});
  }

  const isResultsEmpty = isResultsNotFound(state.searchData, state.input);

  const value: ContextType = useMemo(
    () => ({
      suggestions: state.searchData,
      isLoading: state.isLoading,
      input : state.input,
      dispatch,
      startLoading,
      endLoading,
      resetState,
      isResultsEmpty
    }),
    [state]
  );

  return <context.Provider value={value}>{children}</context.Provider>;
};
