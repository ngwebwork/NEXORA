import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp } from 'lucide-react';

function Sparkline({ data, positive }) {
  const width = 100;
  const height = 32;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-8 w-24 overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={positive ? '#34d399' : '#f87171'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.9}
      />
    </svg>
  );
}

export default function CryptoCard({ asset, onSelect }) {
  const positive = asset.change24h >= 0;

  return (
    <motion.button
      layout
      onClick={() => onSelect(asset)}
      whileHover={{ y: -4 }}
      className="card-glow group relative flex w-full items-center justify-between gap-4 rounded-2xl border border-white/8 bg-surface/60 px-5 py-4 text-left transition-colors hover:border-white/15"
    >
      <div className="flex min-w-0 items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-semibold"
          style={{ backgroundColor: `${asset.color}22`, color: asset.color }}
        >
          {asset.icon}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{asset.name}</p>
          <p className="text-xs text-white/40">{asset.symbol}</p>
        </div>
      </div>

      <div className="hidden shrink-0 sm:block">
        <Sparkline data={asset.sparkline} positive={positive} />
      </div>

      <div className="hidden shrink-0 text-right md:block">
        <p className="font-mono-tabular text-xs text-white/40">Market Cap</p>
        <p className="font-mono-tabular text-sm text-white/70">
          ${(asset.marketCap / 1_000_000_000).toFixed(1)}B
        </p>
      </div>

      <div className="shrink-0 text-right">
        <p className="font-mono-tabular text-sm font-semibold text-white">
          ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <p
          className={`flex items-center justify-end gap-1 font-mono-tabular text-xs font-medium ${
            positive ? 'text-emerald-400' : 'text-red-400'
          }`}
        >
          {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(asset.change24h).toFixed(2)}%
        </p>
      </div>
    </motion.button>
  );
}
