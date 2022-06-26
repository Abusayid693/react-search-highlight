import { useEffect } from 'react';

/**
 * Triggers callback function on keydown while holding cmd
 * @param callback function - triggered on keydown event
 * @param withCmd boolean - with command key pressed
 * @param eventKey string - keydown event key
 * @param deps array - dependencies
 */
export const useKeyDown = (
  callback: VoidFunction,
  withCmd?: boolean,
  eventKey: string = 'k',
  deps: any[] = []
) => {
  useEffect(() => {
    const keydownCb = (event: KeyboardEvent) => {
      const key = event['key'];
      const cmdHeld = withCmd ? event['metaKey'] : true;

      if (cmdHeld && key.toLowerCase() === eventKey) {
        callback?.();
      }
    };
    document.addEventListener('keydown', keydownCb);
    return () => {
      document.removeEventListener('keydown', keydownCb);
    };
  }, deps);
};
