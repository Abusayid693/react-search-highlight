import React, { HTMLAttributes } from 'react';
import {
  CHARACTER_MATCHING,
  DEBOUNCE,
  DEFAULT,
  STRING_MATCHING,
  TEST_DATA,
  THROTTLE
} from '../const';
import { ContextProvider } from '../context';
import Main from './main';

export interface Props extends HTMLAttributes<HTMLInputElement> {
  data: any[];
  keysToSearch?: string[];
  inputAlgorithm?: typeof DEBOUNCE | typeof THROTTLE | typeof DEFAULT;
  inputAlgorithmTimeout?: number;
  matchingAlgorithm?: typeof CHARACTER_MATCHING | typeof STRING_MATCHING;
}

const Index: React.FC<Props> = props => {
  let {
    data,
    keysToSearch,
    inputAlgorithmTimeout,
    inputAlgorithm = DEFAULT,
    matchingAlgorithm,
    ...any
  } = props;

  data = data ?? TEST_DATA;
  keysToSearch = keysToSearch ?? Object.keys(data?.[0]);
  inputAlgorithm = inputAlgorithm ?? DEBOUNCE;
  inputAlgorithmTimeout = inputAlgorithmTimeout ?? 500;
  matchingAlgorithm = matchingAlgorithm ?? CHARACTER_MATCHING;

  return (
    <ContextProvider>
      <Main
        inputAlgorithm={inputAlgorithm}
        matchingAlgorithm={matchingAlgorithm}
        keysToSearch={keysToSearch}
        duration={inputAlgorithmTimeout}
        data={data}
        {...any}
      />
    </ContextProvider>
  );
};

export default Index;
