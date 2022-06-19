import React, { useRef } from 'react';
import { useContext } from '../context';
import {
  useCharacterMatching,
  useDebounce,
  useOffScreen,
  useStringMatching,
  useThrottle
} from '../hooks';
import Input from './input';

const inputAlgorithms: Record<string, any> = {
  DEBOUNCE: useDebounce,
  THROTTLE: useThrottle,
  DEFAULT: (e: any) => e
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
}> = ({
  keysToSearch,
  data,
  inputAlgorithm,
  duration,
  matchingAlgorithm,
  ...any
}) => {
  const {state} = useContext();

  const listRef = useRef<HTMLUListElement>(null);
  const [isListVisible, setIsListVisible] = useOffScreen(listRef);

  return (
    <section
      style={{width: '100vw'}}
      ref={listRef}
      /**
       * onFocusCapture is triggered when input(child) is focused
       */
      onFocusCapture={() => setIsListVisible(true)}
    >
      <Input
        keysToSearch={keysToSearch}
        duration={duration}
        inputAlgorithm={inputAlgorithms[inputAlgorithm]}
        matchingAlgorithm={matchingAlgorithms[matchingAlgorithm]}
        w={'400px'}
        data={data}
        {...any}
      />
      {isListVisible && (
        <ul className="rsh-search-list" style={{width: '400px'}}>
          {state.searchData?.map((item: typeof data[0], index) => (
            <li className="rsh-search-list-item" key={item?.key ?? index}>
              <h3 dangerouslySetInnerHTML={{__html: item.heading}} />
              <h5 dangerouslySetInnerHTML={{__html: item.title}} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Index;
