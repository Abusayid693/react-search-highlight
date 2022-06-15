import React, { useEffect } from 'react';
import { SET_DATA } from '../const';
import { useContext } from '../context';
import Input from './input';

const data = [
  {
    heading: 'Rehan is good',
    title: 'I am eeatomg food'
  },
  {
    heading: 'AI is the future',
    title: 'I love ai and machine'
  }
];

const Index = () => {
  const [state, dispatch] = useContext();

  useEffect(() => {
    dispatch?.({type: SET_DATA, payload: data});
  }, [dispatch]);

  console.log('state :', state);

  return (
    <React.Fragment>
      <Input />
      <ul>
        {state.searchData?.map((item: any) => (
          <li>
            <h3 dangerouslySetInnerHTML={{__html: item.heading}} />
            <h5>{item.title}</h5>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Index;
