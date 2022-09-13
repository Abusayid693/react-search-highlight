import React, { Ref } from 'react';

/**
 * useRefComposition combines multiple refs into a single compose ref
 * @param refs - Array of refs
 * @returns - callback function to update ref
 */
export const useRefComposition = <T>(
  refs: Ref<T>[]
) => {
  return (el: any) => {
    refs.forEach(ref => {
      if(ref === null) return;
      if (typeof ref === 'function') ref(el);
      else (ref as React.MutableRefObject<T>).current = el;
    });
  };
};
