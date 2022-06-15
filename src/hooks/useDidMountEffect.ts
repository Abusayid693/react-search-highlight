import { useEffect, useRef } from 'react';

export const useDidMountEffect = (func: () => any, deps: any[]) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

export default useDidMountEffect;
