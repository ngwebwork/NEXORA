import { useCallback, useRef } from 'react';
import { useIsTouchDevice } from './useIsTouchDevice.js';

// Pairs with the `.spotlight` CSS class: writes local --spot-x/--spot-y
// custom properties on the element itself (no React state, no re-render).
export function useSpotlight() {
  const ref = useRef(null);
  const isTouch = useIsTouchDevice();

  const onMouseMove = useCallback(
    (e) => {
      if (isTouch || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      ref.current.style.setProperty('--spot-x', `${x}%`);
      ref.current.style.setProperty('--spot-y', `${y}%`);
    },
    [isTouch]
  );

  return { ref, onMouseMove };
}
