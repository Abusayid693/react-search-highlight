import React, { useEffect, useRef, useState } from 'react';

import {
  CHARACTER_MATCHING,
  DEBOUNCE, DEFAULT, SET_INPUT, STRING_MATCHING, THROTTLE, __DEV__
} from '../../const';
import { useReactSearchHighlight } from '../../context';
import { Stack } from '../../elements/flexBox';
import { useKeyDown, useRefComposition } from '../../hooks';
import SearchIcon from '../../icons/search';
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
  // Data to perform search operation
  data: any[];

  // Determines which keys to search from the data object
  keysToSearch?: string[];

  // Determines input box behaviour it accepts three values DEBOUNCE, THROTTLE or DEFAULT
  inputAlgorithm?: typeof DEBOUNCE | typeof THROTTLE | typeof DEFAULT;

  // Optional: Determines the input algorithm timeout for debounce and throttle
  inputAlgorithmTimeout?: number;

  // Determines matching algorithm to search over data, it accepts two values CHARACTER_MATCHING or STRING_MATCHING
  // CHARACTER_MATCHING matches each character from the data to highlight it
  // STRING_MATCHING matches each word from the data to highlight it
  matchingAlgorithm?: typeof CHARACTER_MATCHING | typeof STRING_MATCHING;

  // Optional: input value, it is recommended not to pass any in general case
  value?: string;

  // Optional: input value onChange event handler
  onChange?: (e:React.ChangeEvent<HTMLInputElement>) => void

  // Optional: Determines initial input value
  initialValue?: string

  // Optional: It can be used to change search bar icon
  PrefixIcon?: React.FC
}


export const SearchBar = React.forwardRef(({
  // Determines which keys to search from the data object
  keysToSearch,

  // Determines input box behaviour it accepts three values DEBOUNCE, THROTTLE or DEFAULT
  inputAlgorithm = DEBOUNCE,

  // Determines matching algorithm to search over data, it accepts two values CHARACTER_MATCHING or STRING_MATCHING
  // CHARACTER_MATCHING matches each character from the data to highlight it
  // STRING_MATCHING matches each word from the data to highlight it
  matchingAlgorithm = CHARACTER_MATCHING,

  // Data to perform search operation
  data,

  // Optional: input value, it is recommended not to pass any in general case
  value: controlledValue,

  // Optional: Determines the input algorithm timeout for debounce and throttle
  inputAlgorithmTimeout = 500,

  // Optional: onChange event handler
  onChange,

  // Optional: Determines initial input value
  initialValue,

  // Optional: It can be used to change search bar icon
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
  }, [searchTerm]);

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
        {PrefixIcon ? <PrefixIcon /> : <SearchIcon />}
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
