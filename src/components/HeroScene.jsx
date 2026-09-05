import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';

function EnergyCore({ scrollProgress }) {
  const meshRef = useRef();
  const groupRef = useRef();

  useFrame((state, delta) => {
    const { pointer } = state;
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.18;
      meshRef.current.rotation.x += delta * 0.05;
    }
    if (groupRef.current) {
      const targetX = pointer.y * 0.3;
      const targetY = pointer.x * 0.4;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.04);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.04);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -scrollProgress.current * 1.6, 0.06);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh ref={meshRef} scale={1.7}>
          <icosahedronGeometry args={[1, 4]} />
          <MeshDistortMaterial
            color="#4ce0d2"
            emissive="#0d3d38"
            roughness={0.15}
            metalness={0.6}
            distort={0.35}
            speed={1.6}
            transparent
            opacity={0.92}
          />
        </mesh>
      </Float>
    </group>
  );
}

function OrbitRing({ radius, tilt, speed, color, thickness = 0.01 }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed;
  });
  return (
    <group rotation={[tilt, 0, 0]}>
      <mesh ref={ref}>
        <torusGeometry args={[radius, thickness, 16, 128]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function SceneContents({ quality, scrollProgress }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 3, 4]} intensity={40} color="#4ce0d2" />
      <pointLight position={[-4, -2, -3]} intensity={25} color="#7c5cfc" />

      <EnergyCore scrollProgress={scrollProgress} />

      <OrbitRing radius={2.4} tilt={0.6} speed={0.12} color="#4ce0d2" />
      <OrbitRing radius={2.9} tilt={-0.35} speed={-0.08} color="#7c5cfc" thickness={0.006} />

      {quality !== 'low' && (
        <Sparkles count={quality === 'high' ? 220 : 120} scale={7} size={2} speed={0.25} color="#4ce0d2" opacity={0.6} />
      )}
    </>
  );
}

export default function HeroScene({ quality = 'high' }) {
  const scrollProgress = useRef(0);

  const dpr = useMemo(() => (quality === 'low' ? 1 : [1, 1.8]), [quality]);

  function handleScrollUpdate(v) {
    scrollProgress.current = v;
  }

  return (
    <div className="absolute inset-0" onWheelCapture={() => {}}>
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <SceneContents quality={quality} scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
      <ScrollBridge onUpdate={handleScrollUpdate} />
    </div>
  );
}

function ScrollBridge({ onUpdate }) {
  useEffect(() => {
    function handle() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      onUpdate(p);
    }
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
