import { useEffect, useRef } from 'react';
import { getMouse, subscribeMouse } from '../lib/mouseStore.js';
import { useIsTouchDevice } from '../hooks/useIsTouchDevice.js';

export default function CursorGlow() {
  const isTouch = useIsTouchDevice();
  const glowRef = useRef(null);

  useEffect(() => {
    if (isTouch) return undefined;

    const unsubscribe = subscribeMouse();
    const pos = { x: getMouse().x, y: getMouse().y };
    let frame;

    function tick() {
      const m = getMouse();
      // Trails noticeably behind the real cursor for a soft, ambient feel.
      pos.x += (m.x - pos.x) * 0.06;
      pos.y += (m.y - pos.y) * 0.06;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      unsubscribe();
    };
  }, [isTouch]);

  if (isTouch) return null;

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />;
}
