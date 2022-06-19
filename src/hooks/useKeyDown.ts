import { useEffect } from 'react';

/**
 * Triggers callback function on keydown while holding cmd
 * @param callback function - triggered on keydown event 
 */
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
