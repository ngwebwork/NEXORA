import { Suspense, lazy, useState } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

// Replace this URL with any published Spline scene to swap the visual instantly.
export const DEFAULT_SPLINE_SCENE = '';

export default function SplineScene({ sceneUrl = DEFAULT_SPLINE_SCENE, fallback = null, className = '' }) {
  const [failed, setFailed] = useState(false);

  if (!sceneUrl || failed) {
    return fallback;
  }

  return (
    <Suspense fallback={fallback}>
      <Spline scene={sceneUrl} className={className} onError={() => setFailed(true)} />
    </Suspense>
  );
}
