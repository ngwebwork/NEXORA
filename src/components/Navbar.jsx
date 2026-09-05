import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Menu, X, Wallet } from 'lucide-react';

const LINKS = ['Home', 'Markets', 'Ecosystem', 'Analytics', 'About'];

export default function Navbar({ activeSection, onNavigate, onConnectWallet, walletAddress }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleNav(link) {
    setMenuOpen(false);
    onNavigate(link.toLowerCase());
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-void/70 backdrop-blur-xl border-b border-white/5' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <button
          onClick={() => handleNav('home')}
          className="font-display text-xl font-semibold tracking-[0.2em] text-white"
        >
          NEX<span className="text-cyan">ORA</span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => {
            const key = link.toLowerCase();
            const isActive = activeSection === key;
            return (
              <li key={link}>
                <button
                  onClick={() => handleNav(link)}
                  className="relative px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
                >
                  {link}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-cyan shadow-glow"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            aria-label="Search"
            className="rounded-full border border-white/10 p-2.5 text-white/70 transition-all hover:border-cyan/40 hover:text-cyan"
          >
            <Search size={16} />
          </button>
          <button
            onClick={onConnectWallet}
            className="group relative flex items-center gap-2 overflow-hidden rounded-full border border-cyan/30 bg-cyan/10 px-5 py-2.5 text-sm font-semibold text-cyan transition-all hover:bg-cyan/20 hover:shadow-glow"
          >
            <Wallet size={15} />
            {walletAddress ? walletAddress : 'Connect Wallet'}
          </button>
        </div>

        <button
          className="text-white lg:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-white/5 bg-void/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map((link) => (
                <button
                  key={link}
                  onClick={() => handleNav(link)}
                  className="rounded-lg px-3 py-3 text-left text-base font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-cyan"
                >
                  {link}
                </button>
              ))}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onConnectWallet();
                }}
                className="mt-2 flex items-center justify-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-5 py-3 text-sm font-semibold text-cyan"
              >
                <Wallet size={15} />
                {walletAddress ? walletAddress : 'Connect Wallet'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
