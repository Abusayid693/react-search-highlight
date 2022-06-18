import { useEffect } from 'react';

export const useKeyDown = (callback: VoidFunction) => {
  useEffect(() => {
    const keydownCb = (event: KeyboardEvent) => {
      const key = event.key;
      const cmdHeld = event.metaKey;

      if (cmdHeld && key.toLowerCase() == 'k') {
        callback?.();
      }
    };
    document.addEventListener('keydown', keydownCb);
    return () => {
      document.removeEventListener('keydown', keydownCb);
    };
  }, []);
};
