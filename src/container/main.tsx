import React, { ReactNode, useRef } from 'react';
import { POPOVER_EXPANDED } from '../const';
import { useContext } from '../context';
import { useDidMountEffect, useOffScreen } from '../hooks';

export const Wrapper: React.FC<{
  children: ReactNode;
}> = ({children}) => {
  const {dispatch} = useContext();

  const listRef = useRef<HTMLUListElement>(null);
  const [isListVisible, setIsListVisible] = useOffScreen(listRef);

  useDidMountEffect(
    () => {
      dispatch?.({type: POPOVER_EXPANDED, payload: isListVisible})
    },
    [isListVisible]
  );

  return (
    <section
      style={{width: '100vw'}}
      ref={listRef}
      /**
       * onFocusCapture is triggered when input(child) is focused
       */
      onFocusCapture={() => setIsListVisible(true)}
    >
      {children}
    </section>
  );
};

export const PopOverList = () => {
  const {state,} = useContext();

  return (
    <>
      {state.isPopoverExpanded && (
        <ul className="rsh-search-list" style={{width: '400px'}}>
          {state.searchData?.map((item: any, index) => (
            <li className="rsh-search-list-item" key={item?.key ?? index}>
              <h3 dangerouslySetInnerHTML={{__html: item.heading}} />
              <h5 dangerouslySetInnerHTML={{__html: item.title}} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
