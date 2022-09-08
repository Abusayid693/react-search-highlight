import React, { useEffect } from 'react';
import {
  CHARACTER_MATCHING,
  DEBOUNCE,
  DEFAULT,
  STRING_MATCHING,
  THROTTLE
} from '../../const';

import {
  useCharacterMatching,
  useDebounce, useStringMatching,
  useThrottle
} from '../../hooks';
import { InternalContext } from '../main';
import Input from './input';

const inputAlgorithms: Record<string, any> = {
  DEBOUNCE: useDebounce,
  THROTTLE: useThrottle,
  DEFAULT: (e: any) => e
};

const matchingAlgorithms: Record<string, any> = {
  CHARACTER_MATCHING: useCharacterMatching,
  STRING_MATCHING: useStringMatching
};

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  data: any[];
  keysToSearch?: string[];
  inputAlgorithm?: typeof DEBOUNCE | typeof THROTTLE | typeof DEFAULT;
  inputAlgorithmTimeout?: number;
  matchingAlgorithm?: typeof CHARACTER_MATCHING | typeof STRING_MATCHING;
  value?: string;
  onChange?: (e:React.ChangeEvent<HTMLInputElement>) => void
  initialValue?: string
  PrefixIcon?: React.FC
}

export const SearchBar: React.FC<Props> = props => {
  let {
    data,
    keysToSearch,
    inputAlgorithmTimeout = 500,
    inputAlgorithm = DEBOUNCE,
    matchingAlgorithm = CHARACTER_MATCHING,
    ...any
  } = props;

  keysToSearch = keysToSearch ?? Object.keys(data?.[0]);
  const __internalContext = React.useContext(InternalContext);

  useEffect(() => {
    if (__internalContext)
      __internalContext.updateInternalContext('matchingAlgorithm', matchingAlgorithm);
  }, []);

  return (
    <Input
      keysToSearch={keysToSearch}
      duration={inputAlgorithmTimeout}
      inputAlgorithm={inputAlgorithms[inputAlgorithm]}
      matchingAlgorithm={matchingAlgorithms[matchingAlgorithm]}
      data={data}
      {...any}
    />
  );
};
