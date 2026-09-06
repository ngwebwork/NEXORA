import { lazy, Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ecosystemStats } from '../data/portfolioData.js';
import { useIsTouchDevice } from '../hooks/useIsTouchDevice.js';

const EcosystemScene = lazy(() => import('./EcosystemScene.jsx'));

function useQuality() {
  const [quality, setQuality] = useState('high');
  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w < 640) setQuality('low');
      else if (w < 1024) setQuality('medium');
      else setQuality('high');
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return quality;
}

export default function Ecosystem({ id }) {
  const quality = useQuality();
  const isTouch = useIsTouchDevice();

  return (
    <section id={id} className="relative overflow-hidden py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-violet">The Network</p>
          <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            Built for a<br />decentralized world.
          </h2>
          <p className="mt-6 max-w-md text-white/50">
            NEXORA connects a global mesh of nodes, validators, and liquidity pools into a single
            seamless experience — engineered for resilience, speed, and transparency.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-6">
            {ecosystemStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className="font-mono-tabular text-2xl font-semibold text-white sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs text-white/40">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="relative h-[420px] w-full sm:h-[500px]">
          <Suspense fallback={null}>
            <EcosystemScene quality={quality} reduceMotion={isTouch} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
