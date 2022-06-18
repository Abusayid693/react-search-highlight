import React, { ReactNode } from 'react';

interface HStackPropsType extends React.CSSProperties {
  children: ReactNode;
  className?: string;
  onClick?: () => void
  onMouseDown?: any
}

export const HStack: React.FC<HStackPropsType> = ({
  children,
  className,
  onClick,
  onMouseDown,
  ...args
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        ...args
      }}
      className={className}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const VStack: React.FC<HStackPropsType> = ({
  children,
  className,
  onClick,
  onMouseDown,
  ...args
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...args
      }}
      className={className}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
