import React, { useRef, useState } from 'react';
import { Stack } from '../flexBox';
import { useDidMountEffect, useKeyDown } from '../hooks';
import searchIcon from '../icons/search.svg';

const Input: React.FC<{
  keysToSearch: any[];
  duration: number;
  inputAlgorithm: any;
  matchingAlgorithm: any;
  w: string;
}> = ({keysToSearch, inputAlgorithm, matchingAlgorithm, w,  ...any}) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const searchTerm = inputAlgorithm(input, 1000);
  const matchingFn = matchingAlgorithm(keysToSearch);

  console.log(keysToSearch)

  useDidMountEffect(() => {
    matchingFn(input);
  }, [searchTerm]);

  const focusInput = () => inputRef?.current?.focus();

  useKeyDown(focusInput)

  return (
    <Stack
      as='HStack'
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
