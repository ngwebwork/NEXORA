import { useEffect, useRef } from 'react';
import { getMouse, subscribeMouse } from '../lib/mouseStore.js';
import { useIsTouchDevice } from '../hooks/useIsTouchDevice.js';

const HOVER_SELECTOR = 'a, button, input, textarea, select, [role="button"], [data-cursor-hover]';

export default function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (isTouch) return undefined;

    document.documentElement.classList.add('custom-cursor-active');

    const unsubscribe = subscribeMouse();
    const dotPos = { x: getMouse().x, y: getMouse().y };
    const ringPos = { x: dotPos.x, y: dotPos.y };
    let frame;

    function tick() {
      const m = getMouse();
      dotPos.x += (m.x - dotPos.x) * 0.45;
      dotPos.y += (m.y - dotPos.y) * 0.45;
      ringPos.x += (m.x - ringPos.x) * 0.16;
      ringPos.y += (m.y - ringPos.y) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);

    function handleOver(e) {
      if (e.target.closest?.(HOVER_SELECTOR)) {
        ringRef.current?.classList.add('cursor-ring--hover');
        dotRef.current?.classList.add('cursor-dot--hover');
      }
    }
    function handleOut(e) {
      if (e.target.closest?.(HOVER_SELECTOR)) {
        ringRef.current?.classList.remove('cursor-ring--hover');
        dotRef.current?.classList.remove('cursor-dot--hover');
      }
    }
    function handleDown() {
      ringRef.current?.classList.add('cursor-ring--press');
    }
    function handleUp() {
      ringRef.current?.classList.remove('cursor-ring--press');
    }

    document.addEventListener('mouseover', handleOver, { passive: true });
    document.addEventListener('mouseout', handleOut, { passive: true });
    document.addEventListener('mousedown', handleDown, { passive: true });
    document.addEventListener('mouseup', handleUp, { passive: true });

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      cancelAnimationFrame(frame);
      unsubscribe();
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      document.removeEventListener('mousedown', handleDown);
      document.removeEventListener('mouseup', handleUp);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
