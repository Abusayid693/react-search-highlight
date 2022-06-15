import React, { useEffect } from 'react';
import { SET_DATA } from '../const';
import { useContext } from '../context';
import Input from './input';

const Index: React.FC<{
  keysToSearch: any[];
  duration: number;
  inputAlgo: string;
  data: any[];
  matchingAlogo: string;
}> = ({keysToSearch, data, inputAlgo, duration, matchingAlogo}) => {
  const [state, dispatch] = useContext();

  useEffect(() => {
    dispatch?.({type: SET_DATA, payload: data});
    console.warn('state :', state);
  }, [dispatch]);

  return (
    <React.Fragment>
      <Input
        keysToSearch={keysToSearch}
        duration={duration}
        inputAlgo={inputAlgo}
        matchingAlogo={matchingAlogo}
      />
      {state.isLoading ? (
        <>Loading...</>
      ) : (
        <ul>
          {state.searchData?.map((item: typeof data[0]) => (
            <li>
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
