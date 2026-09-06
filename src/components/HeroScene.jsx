import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';

function EnergyCore({ scrollProgress }) {
  const meshRef = useRef();
  const wireRef = useRef();
  const groupRef = useRef();

  useFrame((state, delta) => {
    const { pointer } = state;
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.16;
      meshRef.current.rotation.x += delta * 0.04;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.08;
    }
    if (groupRef.current) {
      const targetX = pointer.y * 0.25;
      const targetY = pointer.x * 0.35;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.04);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.04);
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        -scrollProgress.current * 1.4,
        0.06
      );
    }
  });

  return (
    <group ref={groupRef} position={[1.7, 0, 0]}>
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.7}>
        <mesh ref={meshRef} scale={1.05}>
          <icosahedronGeometry args={[1, 4]} />
          <MeshDistortMaterial
            color="#4ce0d2"
            emissive="#0c3733"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.25}
            distort={0.32}
            speed={1.4}
            transparent
            opacity={0.55}
          />
        </mesh>
        <mesh ref={wireRef} scale={1.32}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#7c5cfc" wireframe transparent opacity={0.25} />
        </mesh>
        <mesh scale={0.32}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#eafffb" transparent opacity={0.9} />
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
    <group position={[1.7, 0, 0]} rotation={[tilt, 0, 0]}>
      <mesh ref={ref}>
        <torusGeometry args={[radius, thickness, 16, 128]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function SceneContents({ quality, scrollProgress }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 3, 4]} intensity={30} color="#4ce0d2" />
      <pointLight position={[-2, -2, 2]} intensity={18} color="#7c5cfc" />

      <EnergyCore scrollProgress={scrollProgress} />

      <OrbitRing radius={1.65} tilt={0.6} speed={0.12} color="#4ce0d2" />
      <OrbitRing radius={2.0} tilt={-0.35} speed={-0.08} color="#7c5cfc" thickness={0.006} />

      {quality !== 'low' && (
        <Sparkles
          count={quality === 'high' ? 180 : 100}
          scale={[6, 5, 4]}
          position={[1.7, 0, 0]}
          size={2}
          speed={0.25}
          color="#4ce0d2"
          opacity={0.6}
        />
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
    <div className="absolute inset-0">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 7], fov: 40 }}
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
