import React, { useEffect, useRef, useState } from 'react';
import {
  CHARACTER_MATCHING,
  DEBOUNCE, DEFAULT, SET_INPUT, STRING_MATCHING, THROTTLE, __DEV__
} from '../../const';
import { useReactSearchHighlight } from '../../context';
import { Stack } from '../../elements/flexBox';
import { useKeyDown, useRefComposition } from '../../hooks';
import searchIcon from '../../icons/search.svg';
import { InternalContext } from '../main';

import {
  useCharacterMatching,
  useDebounce, useStringMatching,
  useThrottle
} from '../../hooks';

export const inputAlgorithms: Record<string, any> = {
  DEBOUNCE: useDebounce,
  THROTTLE: useThrottle,
  DEFAULT: (e: any) => e
};

export const matchingAlgorithms: Record<string, any> = {
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

export const SearchBar = React.forwardRef(({
  keysToSearch,
  inputAlgorithm = DEBOUNCE,
  matchingAlgorithm = CHARACTER_MATCHING,
  data,
  value: controlledValue,
  inputAlgorithmTimeout = 500,
  onChange,
  initialValue,
  PrefixIcon,
  ...any
}: Props, forwardedRef) => {
  const [input, setInput] = useState(initialValue ?? '');
  const {dispatch} = useReactSearchHighlight();
  const __internalContext = React.useContext(InternalContext);

  keysToSearch = keysToSearch ?? Object.keys(data?.[0]);

  const inputRef = useRef<HTMLInputElement>(null);
  const composedRefs = useRefComposition([inputRef, forwardedRef])
  
  const searchInput = controlledValue ?? input;

  const searchTerm = inputAlgorithms[inputAlgorithm](searchInput, inputAlgorithmTimeout);
  const matchingFn = matchingAlgorithms[matchingAlgorithm](keysToSearch);

  if (__DEV__) {
    if (
      (typeof controlledValue !== 'undefined' && !onChange) ||
      (typeof controlledValue === 'undefined' && onChange)
    ) {
      console.warn(
        'SearchBar input value is changing from controlled to uncontrolled, expected a onChange and value prop or none.'
      );
    }
  }

  useEffect(() => {
    if (data) matchingFn(searchInput, data);
    dispatch?.({type: SET_INPUT, payload: searchInput});
  }, [searchTerm, data]);

  useEffect(() => {
    if (__internalContext)
      __internalContext.updateInternalContext('matchingAlgorithm', matchingAlgorithm);
  }, []);

  const focusInput = () => inputRef?.current?.focus();

  useKeyDown(focusInput, true);

  const handleOnChange = (e: any) => setInput(e.target.value.toLowerCase());
  return (
    <Stack
      as="HStack"
      onClick={focusInput}
      justifyContent={'center'}
      className="rsh-input-box"
      padding={0}
      height={40}
      cursor={'text'}
    >
      <figure className="rsh-input-box-logo">
        {PrefixIcon ? <PrefixIcon /> : <img src={searchIcon} width="18px" />}
      </figure>
      <input
        value={controlledValue ?? input}
        onChange={onChange ?? handleOnChange}
        placeholder="search here"
        className={'rsh-input'}
        autoFocus
        ref={composedRefs}
        {...any}
      />
    </Stack>
  );
});
