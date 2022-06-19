import React, { useEffect, useRef, useState } from 'react';
import { SET_INPUT } from '../const';
import { useContext } from '../context';
import { Stack } from '../flexBox';
import { useCharacterMatching, useKeyDown, useStringMatching } from '../hooks';
import searchIcon from '../icons/search.svg';

const Input: React.FC<{
  keysToSearch: any[];
  duration: number;
  inputAlgorithm: any;
  matchingAlgorithm: typeof useCharacterMatching | typeof useStringMatching;
  w: string;
  data: any[];
}> = ({keysToSearch, inputAlgorithm, matchingAlgorithm, w, data, ...any}) => {
  const [input, setInput] = useState('');
  const [, dispatch] = useContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const searchTerm = inputAlgorithm(input, 500);
  const matchingFn = matchingAlgorithm(keysToSearch);

  console.log(keysToSearch);

  useEffect(() => {
    if (data) matchingFn(input, data);
    dispatch?.({type: SET_INPUT, payload: input});
  }, [searchTerm, data]);

  const focusInput = () => inputRef?.current?.focus();

  useKeyDown(focusInput);

  return (
    <Stack
      as="HStack"
      onClick={focusInput}
      justifyContent={'center'}
      className="rsh-input-box"
      padding={0}
      height={40}
      width={w}
      cursor={'text'}
    >
      <figure className="rsh-input-box-logo">
        <img src={searchIcon} width="18px" />
      </figure>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="search here"
        onFocus={e => e.preventDefault()}
        className={'rsh-input'}
        autoFocus
        ref={inputRef}
        {...any}
      />
    </Stack>
  );
};

export default Input;
