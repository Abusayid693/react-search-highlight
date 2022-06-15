import { useState } from 'react';
import { useCharacterMatching, useDidMountEffect, useThrottle } from '../hooks';

const vals = ['heading', 'title'];

const Input = () => {
  const [input, setInput] = useState('');
  const debouncedSearchTerm = useThrottle<string>(input, 1000);
  const searchValueCharacterMatching = useCharacterMatching(vals);

  useDidMountEffect(() => {
    console.log(input);
    searchValueCharacterMatching(input);
  }, [debouncedSearchTerm]);

  return (
    <input
      value={input}
      onChange={e => setInput(e.target.value)}
      placeholder="search here"
    />
  );
};

export default Input;
