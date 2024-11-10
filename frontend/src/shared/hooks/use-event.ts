import { useLayoutEffect, useRef } from 'react';

export function useEvent<TArgs extends unknown[], TResult>(
  callback: (...args: TArgs) => TResult
): (...args: TArgs) => TResult {
  const ref = useRef(callback);

  useLayoutEffect(() => {
    ref.current = callback;
  }, [callback]);

  const stableRef = useRef((...args: TArgs): TResult => {
    return ref.current(...args);
  });

  return stableRef.current;
}
