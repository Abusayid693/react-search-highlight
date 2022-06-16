import { SEARCH_DATA } from '../const';
import { useContext } from '../context';
import { isMatch, replaceAll } from '../utils';

export const useStringMatching = (vals: string[]) => {
  const [state, dispatch] = useContext();
  return (input: string) => {

    const regex = new RegExp(input, 'gi');
    if (!Array.isArray(state.data))
      throw new ReferenceError('Please provide data array');

    const newArr = state.data
      ?.filter((single: any) =>
       isMatch(single, input, vals)
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