import { useEffect, useState } from 'react';

export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(() =>
    typeof window !== 'undefined' ? !window.matchMedia('(hover: hover) and (pointer: fine)').matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setIsTouch(!mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return isTouch;
}
