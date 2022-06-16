import React, { HTMLAttributes } from "react";
import { CHARACTER_MATCHING, DEBOUNCE, STRING_MATCHING, TEST_DATA, THROTTLE } from '../const';
import { ContextProvider } from '../context';
import Main from './main';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  data: any[];
  keysToSearch?: string[];

  withDebounce?: boolean;
  withThrottle?: boolean;
  duration?: number;

  withStringMatching?: boolean;
  withCharacterMatching?: boolean;
}

const getInputAlgo = (condition1: boolean, condition2: boolean) => {
  if (condition1) return DEBOUNCE;
  if (condition2) return THROTTLE;
  return 'DEFAULT';
};

const Index: React.FC<Props> = props => {
  let {data, keysToSearch, withDebounce, withThrottle, duration, withStringMatching, withCharacterMatching} = props;
  
  data = data ?? TEST_DATA;
  keysToSearch = keysToSearch ?? Object.keys(data?.[0]);
  const inputAlgo = getInputAlgo(!!withDebounce, !!withThrottle);
  const matchingAlogo = withStringMatching ? STRING_MATCHING : CHARACTER_MATCHING
  duration = duration ?? 500;

  return (
    <ContextProvider>
      <Main
        inputAlgo={inputAlgo}
        matchingAlogo={matchingAlogo}
        keysToSearch={keysToSearch}
        duration={duration}
        data={data}
      />
    </ContextProvider>
  );
};

export default Index;
