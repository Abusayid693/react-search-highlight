import { useState } from 'react';
import { END_LOADING, SEARCH_DATA, START_LOADING } from '../const';
import { useContext } from '../context';
import { useDidMountEffect, useThrottle } from '../hooks';
import { isMatch, replaceAll } from '../utils';

const vals = ['heading', 'title'];

const Input = () => {
  const [input, setInput] = useState('');
  const [state, dispatch] = useContext();
  const debouncedSearchTerm = useThrottle<string>(input, 1000);

  useDidMountEffect(() => {
    console.log(input);
    searchValueCharacterMatching();
  }, [debouncedSearchTerm]);

  const searchValueCharacterMatching = () => {
    const inputArr = input.toLowerCase().split('');
    const regex = new RegExp(inputArr.join('|'), 'gi');

    dispatch?.({type: START_LOADING});

    if (!Array.isArray(state.data))
      throw new ReferenceError('Please provide data array');

    const newArr = state.data
      ?.filter(single =>
        inputArr.every(inputChar => isMatch(single, inputChar, vals))
      )
      .map(single => {
        const newHeading = replaceAll(single, regex, vals);
        console.log('newHeading :', newHeading);

        return {
          ...single,
          ...newHeading
        };
      });

    dispatch?.({type: SEARCH_DATA, payload: newArr});
    dispatch?.({type: END_LOADING});
  };

  return (
    <input
      value={input}
      onChange={e => setInput(e.target.value)}
      placeholder="search here"
    />
  );
};

export default Input;
