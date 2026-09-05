import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import MarketSection from '../components/MarketSection.jsx';
import Portfolio from '../components/Portfolio.jsx';
import Ecosystem from '../components/Ecosystem.jsx';
import Features from '../components/Features.jsx';
import AssetExplorer from '../components/AssetExplorer.jsx';
import WalletModal from '../components/WalletModal.jsx';
import Footer from '../components/Footer.jsx';

const SECTION_IDS = ['home', 'markets', 'analytics', 'ecosystem', 'about'];

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [walletOpen, setWalletOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="relative min-h-screen bg-void">
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onConnectWallet={() => setWalletOpen(true)}
        walletAddress={walletAddress}
      />

      <main>
        <Hero
          id="home"
          onExploreMarkets={() => scrollToSection('markets')}
          onLaunchApp={() => scrollToSection('analytics')}
        />
        <MarketSection id="markets" onSelectAsset={setSelectedAsset} />
        <Portfolio id="analytics" />
        <Ecosystem id="ecosystem" />
        <Features id="about" />
      </main>

      <Footer />

      <AssetExplorer asset={selectedAsset} onClose={() => setSelectedAsset(null)} />

      <WalletModal
        open={walletOpen}
        onClose={() => setWalletOpen(false)}
        walletAddress={walletAddress}
        onConnect={setWalletAddress}
        onDisconnect={() => {
          setWalletAddress(null);
          setWalletOpen(false);
        }}
      />
    </div>
  );
}
