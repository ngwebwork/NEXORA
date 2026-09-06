import { useEffect, useRef } from 'react';
import { getMouse, subscribeMouse } from '../lib/mouseStore.js';
import { useIsTouchDevice } from './useIsTouchDevice.js';

// Attach to an element for a layered-depth parallax drift: larger `depth`
// values (closer elements) travel further; smaller values (background)
// barely move. No-ops on touch.
export function useParallaxLayer({ depth = 16, smoothing = 0.08 } = {}) {
  const ref = useRef(null);
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    if (isTouch || !ref.current) return undefined;
    const el = ref.current;
    const unsubscribe = subscribeMouse();
    const pos = { x: 0, y: 0 };
    let frame;

    function tick() {
      const m = getMouse();
      pos.x += (m.nx * depth - pos.x) * smoothing;
      pos.y += (-m.ny * depth * 0.6 - pos.y) * smoothing;
      el.style.transform = `translate3d(${pos.x.toFixed(2)}px, ${pos.y.toFixed(2)}px, 0)`;
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      unsubscribe();
      el.style.transform = '';
    };
  }, [isTouch, depth, smoothing]);

  return ref;
}
