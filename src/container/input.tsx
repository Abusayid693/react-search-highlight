import React, { useRef, useState } from 'react';
import { HStack } from '../flexBox';
import { useDidMountEffect } from '../hooks';
import searchIcon from '../icons/search.svg';

const Input: React.FC<{
  keysToSearch: any[];
  duration: number;
  inputAlgorithm: any;
  matchingAlgorithm: any;
}> = ({keysToSearch, inputAlgorithm, matchingAlgorithm}) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const searchTerm = inputAlgorithm(input, 1000);
  const matchingFn = matchingAlgorithm(keysToSearch);

  useDidMountEffect(() => {
    matchingFn(input);
  }, [searchTerm]);

  const focusInput = () => inputRef?.current?.focus();

  return (
    <HStack onClick={focusInput} justifyContent={'center'} className="rsh-input-box" padding={0} height={40}>
      <figure className="rsh-input-box-logo">
        <img src={searchIcon} width='18px' />
      </figure>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="search here"
        onFocus={e => e.preventDefault()}
        className={'rsh-input'}
        autoFocus
        ref={inputRef}
      />
    </HStack>
  );
};

export default Input;
