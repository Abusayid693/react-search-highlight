import React, {
  createContext,
  ReactNode, useEffect,
  useRef,
  useState
} from 'react';
import { useDidMountEffect, useOffScreen } from '../hooks';
import Text from '../Text';

/**
 * InternalContext manages internal states between the components
 * without exposing methods to global states
 */

interface InternalContextInitialStateType {
  isPopoverExpanded: boolean;
  listItemActiveIndex: number;
  listItemRef: React.RefObject<HTMLLIElement> | null;
  updateInternalContext: any;
}

const InternalContextInitialState: InternalContextInitialStateType = {
  isPopoverExpanded: false,
  listItemActiveIndex: 0,
  listItemRef: null,
  updateInternalContext: (key: string, value: any) => {}
};

const InternalContext = createContext(InternalContextInitialState);

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
        style={{width: '100vw'}}
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
  const {isPopoverExpanded, listItemRef} = React.useContext(InternalContext);

  useEffect(() => {
    listItemRef?.current?.classList.add('rsh-search-list-item__active');
    return () => 
      listItemRef?.current?.classList.remove('rsh-search-list-item__active');
  }, [listItemRef]);

  return (
    <>
      {isPopoverExpanded && (
        <ul
          ref={listRef}
          className="rsh-search-list"
          style={{width: '400px'}}
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
}

export const PopOverOption: React.FC<PopOverOptionProps> = ({
  children,
  ...any
}) => {
  const listItemRef = useRef<HTMLLIElement>(null);
  const {updateInternalContext} = React.useContext(InternalContext);

  const handleMouserEnter = () => {
    updateInternalContext('listItemRef', listItemRef);
  };

  return (
    <li
      ref={listItemRef}
      onMouseEnter={handleMouserEnter}
      className="rsh-search-list-item"
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
