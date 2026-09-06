import { useEffect, useRef } from 'react';
import { getMouse, subscribeMouse } from '../lib/mouseStore.js';
import { useIsTouchDevice } from './useIsTouchDevice.js';

// Attach the returned ref to a button. It pulls gently toward the cursor
// when within `radius` px, clamped to `maxOffset`, and eases back to rest
// when the cursor leaves. No-ops entirely on touch devices.
export function useMagnetic({ strength = 0.3, maxOffset = 8, radius = 90 } = {}) {
  const ref = useRef(null);
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    if (isTouch || !ref.current) return undefined;
    const el = ref.current;
    const unsubscribe = subscribeMouse();
    const current = { x: 0, y: 0 };
    let frame;

    function tick() {
      const m = getMouse();
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = m.x - cx;
      const dy = m.y - cy;
      const dist = Math.hypot(dx, dy);

      const inRange = dist < radius;
      const targetX = inRange ? Math.max(-maxOffset, Math.min(maxOffset, dx * strength)) : 0;
      const targetY = inRange ? Math.max(-maxOffset, Math.min(maxOffset, dy * strength)) : 0;

      current.x += (targetX - current.x) * 0.2;
      current.y += (targetY - current.y) * 0.2;
      el.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`;

      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      unsubscribe();
      el.style.transform = '';
    };
  }, [isTouch, strength, maxOffset, radius]);

  return ref;
}
