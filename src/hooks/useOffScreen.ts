import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const useOffScreen = (
  ref: React.MutableRefObject<any>
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [state, setState] = useState(false);

  useEffect(() => {
    function handleClickEvent(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) setState(false);
    }

    document.addEventListener('mousedown', handleClickEvent);

    return () => {
      document.removeEventListener('mousedown', handleClickEvent);
    };
  }, [ref]);

  return [state, setState];
};
