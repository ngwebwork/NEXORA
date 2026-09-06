import { useEffect, useRef } from 'react';
import { getMouse, subscribeMouse } from '../lib/mouseStore.js';

// Returns a ref (never triggers re-renders) whose .current is a lerped,
// physical-feeling trail of the real cursor position. Read it inside your
// own rAF loop or a react-three-fiber useFrame — not during React render.
export function useSmoothMouse(smoothing = 0.12) {
  const smooth = useRef({ x: 0, y: 0, nx: 0, ny: 0 });
  const frame = useRef();

  useEffect(() => {
    const unsubscribe = subscribeMouse();
    const initial = getMouse();
    smooth.current.x = initial.x;
    smooth.current.y = initial.y;

    function tick() {
      const target = getMouse();
      const s = smooth.current;
      s.x += (target.x - s.x) * smoothing;
      s.y += (target.y - s.y) * smoothing;
      s.nx += (target.nx - s.nx) * smoothing;
      s.ny += (target.ny - s.ny) * smoothing;
      frame.current = requestAnimationFrame(tick);
    }
    frame.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame.current);
      unsubscribe();
    };
  }, [smoothing]);

  return smooth;
}
