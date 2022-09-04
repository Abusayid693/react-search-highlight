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

export const initialState: State = {
  isLoading: false,
  searchData: undefined,
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

  const value: ContextType = useMemo(
    () => ({
      state,
      dispatch,
      startLoading,
      endLoading,
      resetState
    }),
    [state]
  );

  return <context.Provider value={value}>{children}</context.Provider>;
};
