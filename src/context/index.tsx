import React, {
  createContext, Dispatch, ReactNode,
  Reducer, useContext as useReactContext, useMemo,
  useReducer
} from 'react';

import { Action, State } from 'src/types';
import reducer from '../reducers';

const initialState: State = {
  isLoading: false,
  searchData: undefined,
  input:''
};

export const context = createContext<[State, Dispatch<Action> | undefined]>(null as any);

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

  const value: [State, Dispatch<Action> | undefined] = useMemo(
    () => [state, dispatch],
    [state]
  );

  return <context.Provider value={value}>{children}</context.Provider>;
};
