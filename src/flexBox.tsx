import React, { ReactNode } from 'react';

interface HStackPropsType extends React.CSSProperties {
  as?: 'VStack' | 'HStack';
  children: ReactNode;
  className?: string;
  onClick?: VoidFunction;
  onMouseDown?: VoidFunction;
  onFocusCapture?: VoidFunction
}

export const Stack: React.FC<HStackPropsType> = ({
  as,
  children,
  className,
  onClick,
  onMouseDown,
  onFocusCapture,
  ...args
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: as === 'HStack' ? 'row' : 'column',
        alignItems: 'center',
        ...args
      }}
      className={className}
      onClick={onClick}
      onFocusCapture={onFocusCapture}
    >
      {children}
    </div>
  );
};