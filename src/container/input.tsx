import { useState } from 'react';
import {
  DEBOUNCE, STRING_MATCHING, THROTTLE
} from '../const';
import {
  useCharacterMatching, useDebounce,
  useDidMountEffect,
  useStringMatching,
  useThrottle
} from '../hooks';

const Input: React.FC<{
  keysToSearch: any[];
  duration: number;
  inputAlgo: string;
  matchingAlogo: string;
}> = ({keysToSearch, inputAlgo, matchingAlogo}) => {
  const [input, setInput] = useState('');

  const searchTerm = () => {
    if (inputAlgo === THROTTLE) return useThrottle<string>(input, 1000);
    if (inputAlgo === DEBOUNCE) return useDebounce<string>(input, 1000);
    return input;
  };

  const matchingFn =
    matchingAlogo === STRING_MATCHING
      ? useStringMatching(keysToSearch)
      : useCharacterMatching(keysToSearch);

  useDidMountEffect(() => {
    matchingFn(input);
  }, [searchTerm]);

  return (
    <input
      value={input}
      onChange={e => setInput(e.target.value)}
      placeholder="search here"
    />
  );
};

export default Input;
