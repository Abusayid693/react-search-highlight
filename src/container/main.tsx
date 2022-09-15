import React, { createContext, ReactNode, useRef, useState } from 'react';
import { CHARACTER_MATCHING, STRING_MATCHING, __DEV__ } from '../const';
import {
  ReactSearchHighlightProvider,
  useReactSearchHighlight
} from '../context';
import Text from '../elements/Text';
import {
  useDidMountEffect,
  useKeyDown,
  useOffScreen,
  useRefComposition
} from '../hooks';
import { ContextType } from '../types';

/**
 * InternalContext manages internal states between the components
 * without exposing methods to global states
 */

interface InternalContextInitialStateType {
  isPopoverExpanded: boolean;
  listItemActiveIndex: number;
  updateInternalContext: any;

  /**
   * Need for popover list active index keydown
   */
  dataLength: number;

  /**
   * Need while rendering highlighted words
   */
  matchingAlgorithm?: typeof CHARACTER_MATCHING | typeof STRING_MATCHING;
}

const InternalContextInitialState: InternalContextInitialStateType = {
  isPopoverExpanded: false,
  listItemActiveIndex: 0,
  updateInternalContext: (key: string, value: any) => {},
  dataLength: 0
};

export const InternalContext = createContext(InternalContextInitialState);

type D = (values: ContextType) => JSX.Element;

interface WrapperProps {
  children: D | any;
  isFunction: boolean;
}

const WrapperInner = React.forwardRef<HTMLDivElement, WrapperProps>(
  ({children, isFunction}, forwardedRef) => {
    const [state, setState] = useState(InternalContextInitialState);
    const __state = useReactSearchHighlight();

    const updateInternalContext = (
      key: keyof InternalContextInitialStateType,
      value: any
    ) => {
      setState(prev => ({...prev, [key]: value}));
    };

    const listRef = useRef<HTMLElement>(null);
    const composedRefs = useRefComposition([listRef, forwardedRef]);
    const [isListVisible, setIsListVisible] = useOffScreen(listRef);

    useDidMountEffect(() => {
      updateInternalContext('isPopoverExpanded', isListVisible);
    }, [isListVisible]);

    return (
      <InternalContext.Provider value={{...state, updateInternalContext}}>
        <section
          ref={composedRefs}
          className="rsh-search-wrapper"
          /**
           * onFocusCapture is triggered when input(child) is focused
           */
          onFocusCapture={() => setIsListVisible(true)}
        >
          {isFunction ? children(__state) : children}
        </section>
      </InternalContext.Provider>
    );
  }
);

export const Wrapper = React.forwardRef<
  HTMLDivElement,
  Pick<WrapperProps, 'children'>
>(({children}: Pick<WrapperProps, 'children'>, forwardedRef) => {
  const isFunction = typeof children === 'function';
  return (
    <>
      {isFunction ? (
        <ReactSearchHighlightProvider>
          <WrapperInner
            ref={forwardedRef}
            isFunction={isFunction}
            children={children}
          />
        </ReactSearchHighlightProvider>
      ) : (
        <WrapperInner
          ref={forwardedRef}
          isFunction={isFunction}
          children={children}
        />
      )}
    </>
  );
});

export interface PopOverListProps
  extends React.OlHTMLAttributes<HTMLUListElement> {
  children: ReactNode;
}


export const PopOverList = React.forwardRef<HTMLUListElement, PopOverListProps>(
  ({children, ...any}, forwardedRef) => {
    const {suggestions} = useReactSearchHighlight();
    const {
      isPopoverExpanded,
      listItemActiveIndex,
      updateInternalContext
    } = React.useContext(InternalContext);

    const listItemActiveIndexArrowDown = () => {
      if (listItemActiveIndex < suggestions.length - 1)
        updateInternalContext('listItemActiveIndex', listItemActiveIndex + 1);
    };

    const listItemActiveIndexArrowUp = () => {
      if (listItemActiveIndex > 0)
        updateInternalContext('listItemActiveIndex', listItemActiveIndex - 1);
    };

    useKeyDown(listItemActiveIndexArrowDown, false, 'arrowdown', [
      listItemActiveIndex,
      suggestions.length
    ]);
    useKeyDown(listItemActiveIndexArrowUp, false, 'arrowup', [
      listItemActiveIndex
    ]);

    return (
      <>
        {isPopoverExpanded && (
          <ul
            data-popover-expanded={isPopoverExpanded}
            ref={forwardedRef}
            className="rsh-search-list"
            {...any}
          >
            {children}
          </ul>
        )}
      </>
    );
  }
);


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
  as = 'h3',
  ...any
}) => {
  const {input} = useReactSearchHighlight();
  const {matchingAlgorithm} = React.useContext(InternalContext);
  const words = value?.split(/<mark>/);

  const isHighlighted = (word: string) => {
    return matchingAlgorithm === STRING_MATCHING
      ? word.toLocaleLowerCase() === input
      : input.includes(word.toLocaleLowerCase());
  };
  return (
    <Text
      as={as}
      classNames={`${className} rsh-search-list-item-text`}
      {...any}
    >
      {words?.map((word, index) =>
        isHighlighted(word) ? (
          <span
            key={`${word}-${index}`}
            data-user-value={true}
            data-suggested-value={true}
            data-heightlighted-value={true}
          >
            {word}
          </span>
        ) : (
          <span key={`${word}-${index}`}>{word}</span>
        )
      )}
    </Text>
  );
};
