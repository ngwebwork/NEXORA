import { lazy, Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';
import { heroStats } from '../data/cryptoData.js';

const HeroScene = lazy(() => import('./HeroScene.jsx'));

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

export default function Hero({ id, onExploreMarkets, onLaunchApp }) {
  const quality = useQuality();

  return (
    <section id={id} className="relative flex min-h-[100svh] items-center overflow-hidden pt-24">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.15] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="absolute inset-0 bg-radial-fade" />

      <Suspense fallback={null}>
        <HeroScene quality={quality} />
      </Suspense>

      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pointer-events-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Network Online
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            The Future of
            <br />
            <span className="text-gradient">Digital Assets.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg"
          >
            Trade, explore and manage your digital assets through a next-generation Web3
            experience built for the decentralized economy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="pointer-events-auto mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={onExploreMarkets}
              className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/30 hover:bg-white/10"
            >
              <Compass size={16} />
              Explore Markets
            </button>
            <button
              onClick={onLaunchApp}
              className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-cyan px-6 py-3.5 text-sm font-semibold text-void shadow-glow transition-transform hover:scale-[1.03]"
            >
              Launch App
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
        {heroStats.map((stat, i) => (
          <motion.div
            key={stat.symbol}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
            className={`absolute animate-float glass rounded-2xl px-4 py-3 ${positions[i]}`}
            style={{ animationDelay: `${i * 0.6}s` }}
          >
            <p className="font-mono-tabular text-xs text-white/50">{stat.symbol}</p>
            <p className="font-mono-tabular text-lg font-semibold text-white">{stat.price}</p>
            <p className="font-mono-tabular text-xs font-medium text-emerald-400">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center"
      >
        <div className="mx-auto h-9 w-6 rounded-full border border-white/20 p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="h-1.5 w-1.5 rounded-full bg-cyan"
          />
        </div>
      </motion.div>
    </section>
  );
}

const positions = [
  'right-[8%] top-[22%]',
  'right-[4%] top-[48%]',
  'right-[12%] top-[70%]',
];
