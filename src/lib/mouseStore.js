// Single shared pointer tracker. Every mouse hook reads from this instead of
// attaching its own window listener, so N components cost one listener, not N.
const state = {
  x: 0,
  y: 0,
  nx: 0,
  ny: 0,
  active: false,
};

let listenerCount = 0;

function handleMove(e) {
  const point = e.touches ? e.touches[0] : e;
  if (!point) return;
  state.x = point.clientX;
  state.y = point.clientY;
  state.nx = (point.clientX / window.innerWidth) * 2 - 1;
  state.ny = -(point.clientY / window.innerHeight) * 2 + 1;
  state.active = true;
}

function handleLeave() {
  state.active = false;
}

export function subscribeMouse() {
  if (typeof window === 'undefined') return () => {};
  listenerCount += 1;
  if (listenerCount === 1) {
    state.x = window.innerWidth / 2;
    state.y = window.innerHeight / 2;
    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('touchmove', handleMove, { passive: true });
    window.addEventListener('mouseleave', handleLeave, { passive: true });
  }
  return () => {
    listenerCount -= 1;
    if (listenerCount === 0) {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
    }
  };
}

export function getMouse() {
  return state;
}
