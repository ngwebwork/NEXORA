import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpDown, Search } from 'lucide-react';
import { categories, cryptoAssets } from '../data/cryptoData.js';
import CryptoCard from './CryptoCard.jsx';

const SORT_OPTIONS = [
  { key: 'marketCap', label: 'Market Cap' },
  { key: 'price', label: 'Price' },
  { key: 'change24h', label: '24H Change' },
];

export default function MarketSection({ id, onSelectAsset }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sortKey, setSortKey] = useState('marketCap');
  const [sortDesc, setSortDesc] = useState(true);

  const filtered = useMemo(() => {
    let list = cryptoAssets.filter((asset) => {
      const matchesQuery =
        asset.name.toLowerCase().includes(query.toLowerCase()) ||
        asset.symbol.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === 'All' || asset.category === category;
      return matchesQuery && matchesCategory;
    });

    list = [...list].sort((a, b) => (sortDesc ? b[sortKey] - a[sortKey] : a[sortKey] - b[sortKey]));
    return list;
  }, [query, category, sortKey, sortDesc]);

  return (
    <section id={id} className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10">
      <SectionHeading
        eyebrow="Live Markets"
        title="Explore crypto markets"
        description="Real-time simulated pricing across the assets shaping the decentralized economy."
      />

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search assets..."
            className="w-full rounded-full border border-white/10 bg-surface/60 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-cyan/40"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                category === cat
                  ? 'border-cyan/40 bg-cyan/10 text-cyan'
                  : 'border-white/10 text-white/50 hover:border-white/20 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="flex items-center gap-1 text-xs text-white/40">
          <ArrowUpDown size={12} /> Sort:
        </span>
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            onClick={() => {
              if (sortKey === opt.key) setSortDesc((d) => !d);
              else {
                setSortKey(opt.key);
                setSortDesc(true);
              }
            }}
            className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              sortKey === opt.key ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'
            }`}
          >
            {opt.label} {sortKey === opt.key ? (sortDesc ? '↓' : '↑') : ''}
          </button>
        ))}
      </div>

      <motion.div layout className="flex flex-col gap-3">
        {filtered.map((asset) => (
          <CryptoCard key={asset.id} asset={asset} onSelect={onSelectAsset} />
        ))}
        {filtered.length === 0 && (
          <p className="py-12 text-center text-sm text-white/40">No assets match your search.</p>
        )}
      </motion.div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className={`mb-12 max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-cyan/80">{eyebrow}</p>
      <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-white/50">{description}</p>}
    </motion.div>
  );
}
