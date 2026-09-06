import { useRef } from 'react';
import { useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { useIsTouchDevice } from './useIsTouchDevice.js';

// Reusable card-tilt + cursor-spotlight hook. `max` is the half-range of
// rotation in degrees (max=5 -> the card rotates roughly ±5deg). Spread the
// returned handlers/style onto a motion.div; disabled automatically on touch.
export function useTilt({ max = 8, glow = 'rgba(76,224,210,0.12)', radius = 240 } = {}) {
  const ref = useRef(null);
  const isTouch = useIsTouchDevice();
  const rotateX = useSpring(0, { stiffness: 220, damping: 22 });
  const rotateY = useSpring(0, { stiffness: 220, damping: 22 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${glowX}% ${glowY}%, ${glow}, transparent 70%)`;

  function onMouseMove(e) {
    if (isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * max * 2);
    rotateX.set((0.5 - py) * max * 2);
    glowX.set(px * 100);
    glowY.set(py * 100);
  }

  function onMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return {
    ref,
    onMouseMove,
    onMouseLeave,
    style: { rotateX, rotateY, background },
  };
}
