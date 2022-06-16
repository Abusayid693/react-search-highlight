import React, { ReactNode } from 'react';

interface HStackPropsType extends React.CSSProperties {
  children: ReactNode;
}

export const HStack: React.FC<HStackPropsType> = ({children, ...args}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        ...args
      }}
    >
      {children}
    </div>
  );
};

export const VStack: React.FC<HStackPropsType> = ({children, ...args}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...args
      }}
    >
      {children}
    </div>
  );
};
