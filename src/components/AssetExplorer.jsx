import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, TrendingDown, TrendingUp, X } from 'lucide-react';

function DetailChart({ data, positive }) {
  const width = 560;
  const height = 200;
  const padding = 12;

  const { path, areaPath } = useMemo(() => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const pts = data.map((v, i) => {
      const x = padding + (i / (data.length - 1)) * (width - padding * 2);
      const y = height - padding - ((v - min) / range) * (height - padding * 2);
      return [x, y];
    });
    const linePath = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ');
    const area = `${linePath} L${pts[pts.length - 1][0]},${height - padding} L${pts[0][0]},${height - padding} Z`;
    return { path: linePath, areaPath: area };
  }, [data]);

  const color = positive ? '#34d399' : '#f87171';

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
      <defs>
        <linearGradient id="detail-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={areaPath}
        fill="url(#detail-gradient)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />
    </svg>
  );
}

export default function AssetExplorer({ asset, onClose, onAddToPortfolio }) {
  const [toast, setToast] = useState(null);

  if (!asset) return null;

  const positive = asset.change24h >= 0;

  function simulate(action) {
    setToast(`Transaction simulation successful — ${action}.`);
    if (action === 'Added to portfolio') onAddToPortfolio?.(asset);
    setTimeout(() => setToast(null), 2600);
  }

  return (
    <AnimatePresence>
      {asset && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="glass relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-white/10 p-6 sm:rounded-3xl sm:p-8"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 rounded-full border border-white/10 p-2 text-white/60 transition-colors hover:border-white/30 hover:text-white"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-4">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full text-2xl font-semibold"
                style={{ backgroundColor: `${asset.color}22`, color: asset.color }}
              >
                {asset.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">{asset.name}</h3>
                <p className="text-sm text-white/40">{asset.symbol} · {asset.category}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono-tabular text-3xl font-semibold text-white">
                  ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className={`mt-1 flex items-center gap-1 text-sm font-medium ${positive ? 'text-emerald-400' : 'text-red-400'}`}>
                  {positive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {Math.abs(asset.change24h).toFixed(2)}% (24H)
                </p>
              </div>
            </div>

            <div className="mt-6">
              <DetailChart data={asset.sparkline} positive={positive} />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat label="Market Cap" value={`$${(asset.marketCap / 1_000_000_000).toFixed(1)}B`} />
              <Stat label="Volume (24H)" value={`$${(asset.volume24h / 1_000_000_000).toFixed(1)}B`} />
              <Stat label="24H High" value={`$${asset.high24h.toLocaleString()}`} />
              <Stat label="24H Low" value={`$${asset.low24h.toLocaleString()}`} />
            </div>

            <div className="mt-8">
              <h4 className="mb-2 text-sm font-semibold text-white/80">About {asset.name}</h4>
              <p className="text-sm leading-relaxed text-white/50">{asset.about}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => simulate('Buy order executed')}
                className="flex-1 rounded-full bg-cyan px-6 py-3 text-sm font-semibold text-void shadow-glow transition-transform hover:scale-[1.02]"
              >
                Buy
              </button>
              <button
                onClick={() => simulate('Sell order executed')}
                className="flex-1 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Sell
              </button>
              <button
                onClick={() => simulate('Added to portfolio')}
                className="flex-1 rounded-full border border-violet/30 bg-violet/10 px-6 py-3 text-sm font-semibold text-violet transition-colors hover:bg-violet/20"
              >
                Add to Portfolio
              </button>
            </div>

            <AnimatePresence>
              {toast && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300"
                >
                  <CheckCircle2 size={16} />
                  {toast}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/5 px-4 py-3">
      <p className="text-[10px] uppercase tracking-wide text-white/35">{label}</p>
      <p className="mt-1 font-mono-tabular text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
