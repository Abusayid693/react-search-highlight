import { SEARCH_DATA, __DEV__ } from '../const';
import { useContext } from '../context';
import { isMatch, replaceAll } from '../utils';

/**
 * @param vals - keys to search for from available data
 * @returns {callback} - dispatches action to update search results after character strings
 */
export const useCharacterMatching = (vals: string[]) => {
  const [state, dispatch] = useContext();
  return (input: string) => {
    const inputArr = input.toLowerCase().split('');
    const regex = new RegExp(inputArr.join('|'), 'gi');

    if (!Array.isArray(state.data) || !Array.isArray(vals)) {
      if (__DEV__) {
        console.error(
          `Element type is invalid: expected a array but got: ${typeof state.data}.` +
            ' This could happen for one of the following reasons:\n' +
            '\t1. You might have passed wrong data types in data props\n' +
            '\t2. You might have passed wrong data types in keysToSearch props\n'
        );
      }
      return;
    }
    if (
      state.data.length > 0 &&
      !Object.keys(state.data[0]).some(key => vals.includes(key))
    ) {
      if (__DEV__) {
        console.error(
          'Keys are invalid: cannot perform matching operation. ' +
          'keysToSearch must contain atleast one key for which data object has valid value'
        );
      }
      return;
    }
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
