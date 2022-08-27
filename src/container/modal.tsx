import React, { ReactNode } from 'react';

export const Modal: React.FC<{
  children: ReactNode;
  onClose?: VoidFunction;
  isOpen?: boolean;
}> = ({children, isOpen, onClose}) => {
  const __modal = isOpen ?? true;

  return (
    <>
      {__modal && (
        <div
          onClick={onClose ?? undefined}
          className="rsh-modal-dialog"
          style={{
            backgroundColor: 'rgba(220,220,220,0.5)',
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 1000
          }}
        >
          <div
            className="rsh-modal-dialog-box-wrapper"
            style={{
              maxWidth: 400,
              margin: 'auto',
              padding: 5,
            }}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};
