import React, { ReactNode, useRef } from 'react';
import { POPOVER_EXPANDED } from '../const';
import { useContext } from '../context';
import { useDidMountEffect, useOffScreen } from '../hooks';
import Text from '../Text';

export const Wrapper: React.FC<{
  children: ReactNode;
}> = ({children}) => {
  const {dispatch} = useContext();

  const listRef = useRef<HTMLElement>(null);
  const [isListVisible, setIsListVisible] = useOffScreen(listRef);

  useDidMountEffect(() => {
    dispatch?.({type: POPOVER_EXPANDED, payload: isListVisible});
  }, [isListVisible]);

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

export interface PopOverListProps
  extends React.OlHTMLAttributes<HTMLUListElement> {
  children: ReactNode;
}

export const PopOverList: React.FC<PopOverListProps> = ({children, ...any}) => {
  const {state} = useContext();
  return (
    <>
      {state.isPopoverExpanded && (
        <ul className="rsh-search-list" style={{width: '400px'}} {...any}>
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

export const PopOverOption: React.FC<PopOverOptionProps> = ({children, ...any}) => {
  return <li className="rsh-search-list-item" {...any}>{children}</li>;
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
    <Text as={as} classNames={className} {...any}>
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
