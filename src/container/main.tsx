import React, { useCallback, useEffect } from 'react';
import { SET_DATA } from '../const';
import { useContext } from '../context';
import {
  useCharacterMatching,
  useDebounce, useStringMatching,
  useThrottle
} from '../hooks';
import Input from './input';

const inputAlgorithms: Record<string, any> = {
  DEBOUNCE: useDebounce<string>,
  THROTTLE: useThrottle<string>,
  DEFAULT: (e: any,) => e
};

const matchingAlgorithms: Record<string, any> = {
  CHARACTER_MATCHING: useCharacterMatching,
  STRING_MATCHING: useStringMatching
};

const Index: React.FC<{
  keysToSearch: any[];
  duration: number;
  inputAlgorithm: string;
  data: any[];
  matchingAlgorithm: string;
}> = ({keysToSearch, data, inputAlgorithm, duration, matchingAlgorithm}) => {
  const [state, dispatch] = useContext();

  useEffect(() => {
    dispatch?.({type: SET_DATA, payload: data});
    console.warn('state :', state);
  }, [dispatch]);

  const InputBox = useCallback(() => {
    return (
      <Input
        keysToSearch={keysToSearch}
        duration={duration}
        inputAlgorithm={inputAlgorithms[inputAlgorithm]}
        matchingAlgorithm={matchingAlgorithms[matchingAlgorithm]}
      />
    );
  },[inputAlgorithm, matchingAlgorithm])

  return (
    <React.Fragment>
      <InputBox/>
      {state.isLoading ? (
        <>Loading...</>
      ) : (
        <ul>
          {state.searchData?.map((item: typeof data[0], index) => (
            <li key={item?.key ?? index}>
              <h3 dangerouslySetInnerHTML={{__html: item.heading}} />
              <h5 dangerouslySetInnerHTML={{__html: item.title}} />
            </li>
          ))}
        </ul>
      )}
    </React.Fragment>
  );
};

export default Index;
