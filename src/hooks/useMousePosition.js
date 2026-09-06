import { useEffect, useRef, useState } from 'react';
import { getMouse, subscribeMouse } from '../lib/mouseStore.js';

// React-state version of the shared mouse store, throttled to one update per
// animation frame. Use this only when a component needs to re-render on
// mouse move (e.g. to drive JSX); for anything high-frequency/visual, prefer
// useSmoothMouse (ref-based, zero re-renders).
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0, nx: 0, ny: 0 });
  const frame = useRef();

  useEffect(() => {
    const unsubscribe = subscribeMouse();

    function tick() {
      const m = getMouse();
      setPosition((prev) => (prev.x === m.x && prev.y === m.y ? prev : { x: m.x, y: m.y, nx: m.nx, ny: m.ny }));
      frame.current = requestAnimationFrame(tick);
    }
    frame.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame.current);
      unsubscribe();
    };
  }, []);

  return position;
}
