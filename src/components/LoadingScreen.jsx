import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from './Logo.jsx';

const STAGES = ['Initializing Network...', 'Loading 3D Environment...', 'Connecting to Web3...'];

export default function LoadingScreen({ onComplete }) {
  const [stageIndex, setStageIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const stageTimer = setInterval(() => {
      setStageIndex((i) => Math.min(i + 1, STAGES.length - 1));
    }, 550);

    const exitTimer = setTimeout(() => setExiting(true), 1900);
    const doneTimer = setTimeout(() => onComplete(), 2400);

    return () => {
      clearInterval(stageTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative flex flex-col items-center gap-6"
          >
            <div className="relative flex h-20 w-20 items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-cyan/30" />
              <motion.div
                className="absolute inset-0 rounded-full border-t-2 border-cyan"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute inset-3 rounded-full bg-cyan/10 blur-md" />
              <Logo size={40} />
            </div>

            <h1 className="font-display text-3xl tracking-[0.35em] text-white">NEXORA</h1>

            <div className="h-5 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={stageIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="font-mono-tabular text-xs tracking-wide text-white/50"
                >
                  {STAGES[stageIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
