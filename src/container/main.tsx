import React, { createContext, ReactNode, useRef, useState } from 'react';
import { __DEV__ } from '../const';
import { useDidMountEffect, useKeyDown, useOffScreen } from '../hooks';
import Text from '../Text';

/**
 * InternalContext manages internal states between the components
 * without exposing methods to global states
 */

interface InternalContextInitialStateType {
  isPopoverExpanded: boolean;
  listItemActiveIndex: number;
  updateInternalContext: any;

  // need for popover list active index keydown
  dataLength: number;
}

const InternalContextInitialState: InternalContextInitialStateType = {
  isPopoverExpanded: false,
  listItemActiveIndex: 0,
  updateInternalContext: (key: string, value: any) => {},
  dataLength: 0
};

export const InternalContext = createContext(InternalContextInitialState);

export const Wrapper: React.FC<{
  children: ReactNode;
}> = ({children}) => {
  const [state, setState] = useState(InternalContextInitialState);

  const updateInternalContext = (key: string, value: any) => {
    setState(prev => ({...prev, [key]: value}));
  };

  const listRef = useRef<HTMLElement>(null);
  const [isListVisible, setIsListVisible] = useOffScreen(listRef);

  useDidMountEffect(() => {
    updateInternalContext('isPopoverExpanded', isListVisible);
  }, [isListVisible]);

  return (
    <InternalContext.Provider value={{...state, updateInternalContext}}>
      <section
        ref={listRef}
        className="rsh-search-wrapper"
        /**
         * onFocusCapture is triggered when input(child) is focused
         */
        onFocusCapture={() => setIsListVisible(true)}
      >
        {children}
      </section>
    </InternalContext.Provider>
  );
};

export interface PopOverListProps
  extends React.OlHTMLAttributes<HTMLUListElement> {
  children: ReactNode;
}

export const PopOverList: React.FC<PopOverListProps> = ({children, ...any}) => {
  const listRef = useRef<HTMLUListElement>(null);
  const {
    isPopoverExpanded,
    listItemActiveIndex,
    updateInternalContext,
    dataLength
  } = React.useContext(InternalContext);

  const listItemActiveIndexArrowDown = () => {
    if (listItemActiveIndex < dataLength - 1)
      updateInternalContext('listItemActiveIndex', listItemActiveIndex + 1);
  };

  const listItemActiveIndexArrowUp = () => {
    if (listItemActiveIndex > 0)
      updateInternalContext('listItemActiveIndex', listItemActiveIndex - 1);
  };

  useKeyDown(listItemActiveIndexArrowDown, false, 'arrowdown', [
    listItemActiveIndex,
    dataLength
  ]);
  useKeyDown(listItemActiveIndexArrowUp, false, 'arrowup', [
    listItemActiveIndex
  ]);

  return (
    <>
      {isPopoverExpanded && (
        <ul
          ref={listRef}
          className="rsh-search-list"
          {...any}
        >
          {children}
        </ul>
      )}
    </>
  );
};

export interface PopOverOptionProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  children: ReactNode;
  optionIndex: number;
}

export const PopOverOption: React.FC<PopOverOptionProps> = ({
  children,
  optionIndex,
  ...any
}) => {
  const {updateInternalContext, listItemActiveIndex} = React.useContext(
    InternalContext
  );

  if (__DEV__ && typeof optionIndex !== 'number')
    throw new ReferenceError(
      `optionIndex type is invalid: expected a number but got: ${typeof optionIndex}. ` +
        `To avoid the error please provide optionIndex in PopOverOption component` +
        `\n\t{state.searchData?.map((item, index) => (` +
        `\n\t\t\t<PopOverOption` +
        `\n\t\t\t\toptionIndex={index}`
    );

  const handleMouserEnter = () => {
    updateInternalContext('listItemActiveIndex', optionIndex);
  };

  return (
    <li
      onMouseEnter={handleMouserEnter}
      className={`rsh-search-list-item ${listItemActiveIndex === optionIndex &&
        'rsh-search-list-item__active'}`}
      {...any}
    >
      {children}
    </li>
  );
};

export interface PopOverOptionTextProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  value: string;
  as: string;
}

export const PopOverOptionText: React.FC<PopOverOptionTextProps> = ({
  className,
  value,
  as,
  ...any
}) => {
  const words = value?.split(/\(([^)]+)\)/);
  as = as ?? 'h3';
  return (
    <Text
      as={as}
      classNames={`${className} rsh-search-list-item-text`}
      {...any}
    >
      {words?.map((word, index) =>
        word[0] === '<' ? (
          <span key={index} dangerouslySetInnerHTML={{__html: word}} />
        ) : (
          <span key={index}>{word}</span>
        )
      )}
    </Text>
  );
};
