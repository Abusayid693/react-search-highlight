import { SEARCH_DATA } from '../const';
import { useContext } from '../context';
import { isMatch, replaceAll } from '../utils';

export const useCharacterMatching = (vals: string[]) => {
  const [state, dispatch] = useContext();
  return (input: string) => {
    const inputArr = input.toLowerCase().split('');
    const regex = new RegExp(inputArr.join('|'), 'gi');
    if (!Array.isArray(state.data))
      throw new ReferenceError('Please provide data array');

    const newArr = state.data
      ?.filter((single: any) =>
        inputArr.every((inputChar: any) => isMatch(single, inputChar, vals))
      )
      .map((item: any) => {
        const newItem = replaceAll(item, regex, vals);
        return {
          ...item,
          ...newItem
        };
      });

    dispatch?.({type: SEARCH_DATA, payload: newArr});
  };
};
