import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

const CORE_POSITION = [2.1, 0, 0];

function EnergyCore({ scrollProgress, motionScale }) {
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
      const targetX = pointer.y * 0.25 * motionScale;
      const targetY = pointer.x * 0.35 * motionScale;
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
    <group ref={groupRef} position={CORE_POSITION}>
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

function OrbitRing({ radius, tilt, speed, color, thickness = 0.01, motionScale }) {
  const outerRef = useRef();
  const spinRef = useRef();

  useFrame((state, delta) => {
    if (spinRef.current) spinRef.current.rotation.z += delta * speed;
    if (outerRef.current) {
      const { pointer } = state;
      const targetX = tilt + pointer.y * 0.08 * motionScale;
      const targetZ = pointer.x * 0.06 * motionScale;
      outerRef.current.rotation.x = THREE.MathUtils.lerp(outerRef.current.rotation.x, targetX, 0.03);
      outerRef.current.rotation.z = THREE.MathUtils.lerp(outerRef.current.rotation.z, targetZ, 0.03);
    }
  });

  return (
    <group ref={outerRef} position={CORE_POSITION} rotation={[tilt, 0, 0]}>
      <mesh ref={spinRef}>
        <torusGeometry args={[radius, thickness, 16, 128]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

// Custom point field (rather than a black-box Sparkles instance) so each
// particle can be individually repelled from the cursor in screen space.
function InteractiveParticles({ count, motionScale }) {
  const pointsRef = useRef();
  const tempVec = useMemo(() => new THREE.Vector3(), []);

  const basePositions = useMemo(() => {
    const random = seededRandom(7);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = CORE_POSITION[0] + (random() - 0.5) * 6.2;
      arr[i * 3 + 1] = (random() - 0.5) * 5;
      arr[i * 3 + 2] = (random() - 0.5) * 4;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    const geo = pointsRef.current?.geometry;
    if (!geo) return;
    const posAttr = geo.attributes.position;
    const { camera, pointer } = state;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      tempVec.set(basePositions[ix], basePositions[ix + 1], basePositions[ix + 2]);
      tempVec.project(camera);

      const dx = tempVec.x - pointer.x;
      const dy = tempVec.y - pointer.y;
      const dist = Math.hypot(dx, dy);

      let targetX = basePositions[ix];
      let targetY = basePositions[ix + 1];
      const targetZ = basePositions[ix + 2];

      const influence = 0.22 * motionScale;
      if (motionScale > 0 && dist < influence) {
        const force = ((influence - dist) / influence) * 1.6;
        targetX += dx * force;
        targetY += dy * force;
      }

      const cx = posAttr.getX(i);
      const cy = posAttr.getY(i);
      const cz = posAttr.getZ(i);
      posAttr.setXYZ(i, cx + (targetX - cx) * 0.08, cy + (targetY - cy) * 0.08, cz + (targetZ - cz) * 0.08);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={basePositions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#4ce0d2"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function CursorLight({ motionScale }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const { pointer } = state;
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, 2 + pointer.x * 2.2 * motionScale, 0.05);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, pointer.y * 1.6 * motionScale, 0.05);
  });
  return <pointLight ref={ref} position={[2, 0, 3]} intensity={22} color="#7c5cfc" />;
}

function CameraParallax({ motionScale }) {
  useFrame((state) => {
    const { pointer, camera } = state;
    const targetX = pointer.x * 0.4 * motionScale;
    const targetY = pointer.y * 0.25 * motionScale;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.03);
    camera.lookAt(1.2, 0, 0);
  });
  return null;
}

function SceneContents({ quality, scrollProgress, motionScale }) {
  const particleCount = quality === 'high' ? 160 : quality === 'medium' ? 90 : 0;

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 3, 4]} intensity={30} color="#4ce0d2" />
      <CursorLight motionScale={motionScale} />
      <CameraParallax motionScale={motionScale} />

      <EnergyCore scrollProgress={scrollProgress} motionScale={motionScale} />

      <OrbitRing radius={1.65} tilt={0.6} speed={0.12} color="#4ce0d2" motionScale={motionScale} />
      <OrbitRing radius={2.0} tilt={-0.35} speed={-0.08} color="#7c5cfc" thickness={0.006} motionScale={motionScale} />

      {particleCount > 0 && <InteractiveParticles count={particleCount} motionScale={motionScale} />}
    </>
  );
}

export default function HeroScene({ quality = 'high', reduceMotion = false }) {
  const scrollProgress = useRef(0);
  const motionScale = reduceMotion ? 0.35 : 1;

  const dpr = useMemo(() => (quality === 'low' ? 1 : [1, 1.8]), [quality]);

  function handleScrollUpdate(v) {
    scrollProgress.current = v;
  }

  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 7], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', preserveDrawingBuffer: true }}
      >
        <Suspense fallback={null}>
          <SceneContents quality={quality} scrollProgress={scrollProgress} motionScale={motionScale} />
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
