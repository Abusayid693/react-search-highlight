import React, {
  createContext, ReactNode,
  Reducer,
  useContext as useReactContext,
  useMemo,
  useReducer
} from 'react';

import { END_LOADING, START_LOADING } from '../const';
import reducer from '../reducers';
import { Action, ContextType, State } from '../types';

const initialState: State = {
  isLoading: false,
  searchData: undefined,
  input: ''
};


export const context = createContext<ContextType>(null as any);

export const useContext = () => {
  return useReactContext(context);
};

export const ContextProvider: React.FC<{children: ReactNode}> = ({
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

  const value: ContextType = useMemo(
    () => ({
      state,
      dispatch,
      startLoading,
      endLoading
    }),
    [state]
  );

  return <context.Provider value={value}>{children}</context.Provider>;
};
