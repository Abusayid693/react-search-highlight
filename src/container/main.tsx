import React, { useEffect } from 'react';
import { SET_DATA } from '../const';
import { useContext } from '../context';
import Input from './input';

const data = [
  {
    heading: 'Rhan is good',
    title: 'I am eeatomg food'
  },
  {
    heading: 'AI is th futur',
    title: 'I lov ai and machin'
  }
];

const Index = () => {
  const [state, dispatch] = useContext();

  useEffect(() => {
    dispatch?.({type: SET_DATA, payload: data});
    console.warn('state :', state);
  }, [dispatch]);

  return (
    <React.Fragment>
      <Input />
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
