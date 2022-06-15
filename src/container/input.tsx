import { useEffect, useState } from 'react';
import { SEARCH_DATA, START_LOADING } from '../const';
import { useContext } from '../context';
import { useDebounce } from '../hooks';

const Input = () => {
  const [input, setInput] = useState('');
  const [state, dispatch] = useContext();
  const debouncedSearchTerm = useDebounce<string>(input, 500);

  useEffect(() => {
    console.log(input);
    searchValue();
  }, [debouncedSearchTerm]);

  const searchValue = () => {
    const inputArr = input.toLowerCase().split('');
    const regex = new RegExp(inputArr.join('|'), 'gi');

    dispatch?.({type: START_LOADING});

    const newArr = state.data
      ?.filter(single =>
        inputArr.every(inputChar =>
          single.heading.toLowerCase().includes(inputChar)
        )
      )
      .map(single => {
        const newHeading = single.heading.replaceAll(
          regex,
          (match: any) => `<mark>${match}</mark>`
        );

        return {
          ...single,
          heading: newHeading
        };
      });

    console.log('newArr :', newArr);

    dispatch?.({type: SEARCH_DATA, payload: newArr});
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
