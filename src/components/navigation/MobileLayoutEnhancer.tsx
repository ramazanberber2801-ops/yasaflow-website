import { useLayoutEffect } from 'react';

export function MobileLayoutEnhancer() {
  useLayoutEffect(() => {
    document.body.classList.add('yasaflow-mobile-polish');
    return () => document.body.classList.remove('yasaflow-mobile-polish');
  }, []);

  return null;
}
