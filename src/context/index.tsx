import React, {
    createContext, Dispatch, ReactNode,
    Reducer, useContext as useReactContext, useMemo,
    useReducer
} from 'react';

import reducer, { Action, State } from '../reducers';

const initialState: State = {
  isLoading: false,
  data: undefined,
  searchData: undefined
};

export const context = createContext<[State, Dispatch<Action> | undefined]>([
  initialState,
  undefined
]);

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

  console.log('dispatch : ', value)

  return <context.Provider value={value}>{children}</context.Provider>;
};
