import React, { useEffect, useRef, useState } from 'react';
import { SET_INPUT, __DEV__ } from '../../const';
import { useContext } from '../../context';
import { Stack } from '../../flexBox';
import { useCharacterMatching, useKeyDown, useStringMatching } from '../../hooks';
import searchIcon from '../../icons/search.svg';

import { InternalContext } from '../main';

const Input: React.FC<{
  keysToSearch: any[];
  duration: number;
  inputAlgorithm: any;
  matchingAlgorithm: typeof useCharacterMatching | typeof useStringMatching;
  data: any[];
  value?: string;
  initialValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({
  keysToSearch,
  inputAlgorithm,
  matchingAlgorithm,
  data,
  value: controlledValue,
  onChange,
  initialValue,
  ...any
}) => {
  const [input, setInput] = useState(initialValue ?? '');
  const {dispatch} = useContext();
  const __internalContext = React.useContext(InternalContext);

  const inputRef = useRef<HTMLInputElement>(null);

  const searchInput = controlledValue ?? input;

  const searchTerm = inputAlgorithm(searchInput, 500);
  const matchingFn = matchingAlgorithm(keysToSearch);

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
      __internalContext.updateInternalContext('dataLength', data.length);
  }, [data]);

  const focusInput = () => inputRef?.current?.focus();

  useKeyDown(focusInput, true);

  const handleOnChange = (e: any) => setInput(e.target.value);
  return (
    <Stack
      as="HStack"
      onClick={focusInput}
      justifyContent={'center'}
      className="rsh-input-box"
      padding={0}
      height={40}
      width={'400px'}
      cursor={'text'}
    >
      <figure className="rsh-input-box-logo">
        <img src={searchIcon} width="18px" />
      </figure>
      <input
        value={controlledValue ?? input}
        onChange={onChange ?? handleOnChange}
        placeholder="search here"
        className={'rsh-input'}
        autoFocus
        ref={inputRef}
        {...any}
      />
    </Stack>
  );
};

export default Input;
