import { useEffect, useRef } from 'react';
/**
 * Triggers callback function when deps update skipping initial mount
 * @param deps dependency array for useEffect hook
 * @param func callback - triggered on keydown event 
 */
export const useDidMountEffect = (func: () => any, deps: any[]) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

export default useDidMountEffect;
