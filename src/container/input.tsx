import React, { useState } from 'react';
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

  const searchTerm = inputAlgorithm(input, 1000);
  const matchingFn = matchingAlgorithm(keysToSearch);

  useDidMountEffect(() => {
    matchingFn(input);
  }, [searchTerm]);

  return (
    <HStack justifyContent={'center'}>
      <img src={searchIcon} />
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="search here"
        onFocus={e => e.preventDefault()}
        className={'rsh-input'}
      />
    </HStack>
  );
};

export default Input;
