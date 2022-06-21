import React from 'react';
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
}

export const SearchBar: React.FC<Props> = props => {
  let {
    data,
    keysToSearch,
    inputAlgorithmTimeout,
    inputAlgorithm = DEBOUNCE,
    matchingAlgorithm,
    onChange,
    initialValue,
    ...any
  } = props;

  keysToSearch = keysToSearch ?? Object.keys(data?.[0]);
  inputAlgorithm = inputAlgorithm ?? DEBOUNCE;
  inputAlgorithmTimeout = inputAlgorithmTimeout ?? 500;
  matchingAlgorithm = matchingAlgorithm ?? CHARACTER_MATCHING;

  return (
    <Input
      keysToSearch={keysToSearch}
      duration={inputAlgorithmTimeout}
      inputAlgorithm={inputAlgorithms[inputAlgorithm]}
      matchingAlgorithm={matchingAlgorithms[matchingAlgorithm]}
      data={data}
      onChange={onChange}
      initialValue={initialValue}
      {...any}
    />
  );
};
