import { SEARCH_DATA, __DEV__ } from '../const';
import { useContext } from '../context';
import { isMatch, replaceAll } from '../utils';

/**
 * @param keys - keys to search for from available data
 * @returns {callback} - dispatches action to update search results after character strings
 */
export const useCharacterMatching = (keys: string[]) => {
  const { dispatch } = useContext();
  return (input: string, data: any[]) => {
    const inputArr = input.toLowerCase().split('');
    const regex = new RegExp(inputArr.join('|'), 'gi');

    if (!Array.isArray(data) || !Array.isArray(keys)) {
      if (__DEV__) {
        console.error(
          `Element type is invalid: expected a array but got: ${typeof data}.` +
          'This could happen because you have passed wrong data type in data props'
        );
      }
      return;
    }
    if (
      data.length > 0 &&
      !Object.keys(data[0]).some(key => keys.includes(key))
    ) {
      if (__DEV__) {
        console.error(
          'Keys are invalid: cannot perform matching operation. \n' +
          'This could happen for one of the following reasons:\n' +
          '\t1. keysToSearch does not contain any key for which data object has valid value' + 
          '\t2. You might have passed wrong data types in keysToSearch props\n'
        );
      }
      return;
    }
    const newArr = data
      ?.filter((single: any) =>
        inputArr.every((inputChar: any) => isMatch(single, inputChar, keys))
      )
      .map((item: any) => {
        const newItem = replaceAll(item, regex, keys);
        return {
          ...item,
          ...newItem
        };
      });

    dispatch?.({ type: SEARCH_DATA, payload: newArr });
  };
};
