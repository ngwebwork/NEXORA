import { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { Globe2, Lock, Sparkles, Waypoints } from 'lucide-react';
import { SectionHeading } from './MarketSection.jsx';

const FEATURES = [
  {
    icon: Waypoints,
    title: 'Decentralized',
    description: 'Designed for the open financial ecosystem.',
  },
  {
    icon: Lock,
    title: 'Secure',
    description: 'Built around modern blockchain principles.',
  },
  {
    icon: Globe2,
    title: 'Global',
    description: 'Access digital assets from anywhere.',
  },
  {
    icon: Sparkles,
    title: 'Intelligent',
    description: 'Advanced analytics for better decisions.',
  },
];

function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  const rotateX = useSpring(0, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const background = useMotionTemplate`radial-gradient(240px circle at ${glowX}% ${glowY}%, rgba(76,224,210,0.12), transparent 70%)`;

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 14);
    rotateX.set((0.5 - py) * 14);
    glowX.set(px * 100);
    glowY.set(py * 100);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, background }}
        className="card-glow group relative overflow-hidden rounded-3xl border border-white/8 bg-surface/60 p-8"
      >
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan/20 bg-cyan/10 text-cyan transition-transform duration-300 group-hover:scale-110">
          <Icon size={22} />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-white">{feature.title}</h3>
        <p className="text-sm leading-relaxed text-white/50">{feature.description}</p>
      </motion.div>
    </motion.div>
  );
}

export default function Features({ id }) {
  return (
    <section id={id} className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10">
      <SectionHeading
        eyebrow="Why Nexora"
        title="A platform built to last"
        description="Every layer of NEXORA is engineered around resilience, clarity, and performance."
        align="center"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature, i) => (
          <FeatureCard key={feature.title} feature={feature} index={i} />
        ))}
      </div>
    </section>
  );
}
