import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function useNetwork(count, radius) {
  return useMemo(() => {
    const random = seededRandom(42);
    const nodes = [];
    for (let i = 0; i < count; i++) {
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      const r = radius * (0.6 + random() * 0.4);
      nodes.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        )
      );
    }

    const edges = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < radius * 0.75) {
          edges.push([nodes[i], nodes[j]]);
        }
      }
    }

    return { nodes, edges };
  }, [count, radius]);
}

function Nodes({ nodes }) {
  const groupRef = useRef();
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      const t = state.clock.elapsedTime;
      child.position.y = nodes[i].y + Math.sin(t * 0.6 + i) * 0.08;
      const s = 1 + Math.sin(t * 1.2 + i) * 0.15;
      child.scale.setScalar(s);
    });
  });

  return (
    <group ref={groupRef}>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color={i % 3 === 0 ? '#7c5cfc' : '#4ce0d2'} />
        </mesh>
      ))}
    </group>
  );
}

function Edges({ edges }) {
  const geometry = useMemo(() => {
    const positions = [];
    edges.forEach(([a, b]) => {
      positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [edges]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#4ce0d2" transparent opacity={0.15} />
    </lineSegments>
  );
}

function NetworkGroup({ motionScale }) {
  const { nodes, edges } = useNetwork(26, 2.6);
  const ref = useRef();

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.06 + state.pointer.x * 0.002 * motionScale;
    const targetX = state.pointer.y * 0.2 * motionScale;
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetX, 0.03);
  });

  return (
    <group ref={ref}>
      <Nodes nodes={nodes} />
      <Edges edges={edges} />
    </group>
  );
}

function CursorLight({ motionScale }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const { pointer } = state;
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, pointer.x * 3 * motionScale, 0.05);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, pointer.y * 2 * motionScale, 0.05);
  });
  return <pointLight ref={ref} position={[3, 2, 4]} intensity={20} color="#7c5cfc" />;
}

export default function EcosystemScene({ quality = 'high', reduceMotion = false }) {
  const motionScale = reduceMotion ? 0.35 : 1;

  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={quality === 'low' ? 1 : [1, 1.6]}
        camera={{ position: [0, 0, 6.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <CursorLight motionScale={motionScale} />
          <NetworkGroup motionScale={motionScale} />
          {quality !== 'low' && (
            <Sparkles count={quality === 'high' ? 150 : 80} scale={6} size={1.5} speed={0.2} color="#7c5cfc" opacity={0.5} />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
