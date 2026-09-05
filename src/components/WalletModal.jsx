import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, LogOut, Wallet, X } from 'lucide-react';
import { walletProviders } from '../data/portfolioData.js';

function randomAddress() {
  const chars = '0123456789ABCDEF';
  const part = (n) => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `0x${part(2)}...${part(4)}`;
}

export default function WalletModal({ open, onClose, walletAddress, onConnect, onDisconnect }) {
  const [connecting, setConnecting] = useState(null);

  function handleSelect(provider) {
    setConnecting(provider.id);
    setTimeout(() => {
      onConnect(randomAddress());
      setConnecting(null);
    }, 1400);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="glass relative w-full max-w-sm rounded-3xl border border-white/10 p-6"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 rounded-full border border-white/10 p-2 text-white/60 transition-colors hover:border-white/30 hover:text-white"
            >
              <X size={16} />
            </button>

            {walletAddress ? (
              <div className="flex flex-col items-center py-4 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-400">
                  <CheckCircle2 size={26} />
                </div>
                <h3 className="text-lg font-semibold text-white">Wallet Connected</h3>
                <p className="mt-2 font-mono-tabular text-sm text-cyan">{walletAddress}</p>
                <button
                  onClick={onDisconnect}
                  className="mt-6 flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/70 transition-colors hover:border-red-400/40 hover:text-red-400"
                >
                  <LogOut size={14} />
                  Disconnect
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan/10 text-cyan">
                    <Wallet size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Connect Wallet</h3>
                    <p className="text-xs text-white/40">Simulated connection — no real wallet required</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {walletProviders.map((provider) => (
                    <button
                      key={provider.id}
                      onClick={() => handleSelect(provider)}
                      disabled={connecting !== null}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-left transition-colors hover:border-cyan/30 hover:bg-white/10 disabled:opacity-50"
                    >
                      <div>
                        <p className="text-sm font-semibold text-white">{provider.name}</p>
                        <p className="text-xs text-white/40">{provider.description}</p>
                      </div>
                      {connecting === provider.id && (
                        <motion.span
                          className="h-4 w-4 rounded-full border-2 border-cyan/30 border-t-cyan"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                {connecting && (
                  <p className="mt-4 text-center text-xs text-white/40">Connecting...</p>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
