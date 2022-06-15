import { useEffect, useState } from 'react';
import { SEARCH_DATA, START_LOADING } from '../const';
import { useContext } from '../context';
import { useDebounce } from '../hooks';

const vals = ['heading', 'title'];

const isMatch = (obj: any, char: any, toCheck = vals) => {
  return toCheck.some((match: any) => obj[match].toLowerCase().includes(char));
};

const replaceAll = (obj:any, regex:RegExp, toCheck = vals,)=>{
    const newObj = {...obj}
     toCheck.forEach(key => newObj[key] = obj[key].replaceAll(regex, (match:any) => `<mark>${match}</mark>`))
     return newObj;
}
    
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
            isMatch(single, inputChar)
        )
      )
      .map(single => {
       const newHeading = replaceAll(single, regex)
        console.log('newHeading :',newHeading)

        return {
          ...single,
          ...newHeading
        };
      });

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
