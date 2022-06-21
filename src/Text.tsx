import React, { createElement, ReactNode } from 'react';

const Text: React.FC<{
  as: string;
  children?: ReactNode;
  classNames?: string;
}> = ({as, children, classNames, ...any}) => {
  return createElement(
    as,
    {className: classNames, ...any},
    children
  );
};

export default Text;