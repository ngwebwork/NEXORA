import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { assetAllocation, portfolioRanges, portfolioSummary } from '../data/portfolioData.js';
import PortfolioChart from './PortfolioChart.jsx';
import { SectionHeading } from './MarketSection.jsx';

const RANGES = ['24H', '7D', '1M', '1Y'];

export default function Portfolio({ id }) {
  const [range, setRange] = useState('24H');
  const activeRange = portfolioRanges[range];

  return (
    <section id={id} className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10">
      <SectionHeading
        eyebrow="Portfolio"
        title="Track performance in real time"
        description="A futuristic dashboard for monitoring your simulated digital asset portfolio."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="glass card-glow relative col-span-1 rounded-3xl p-6 lg:col-span-2"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">Total Balance</p>
              <p className="mt-2 font-mono-tabular text-3xl font-semibold text-white sm:text-4xl">
                $
                {portfolioSummary.totalBalance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="mt-2 flex items-center gap-1 text-sm font-medium text-emerald-400">
                <TrendingUp size={14} />
                +{portfolioSummary.change24h}% (24H)
              </p>
            </div>

            <div className="flex gap-1 rounded-full border border-white/10 bg-white/5 p-1">
              {RANGES.map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    range === r ? 'bg-cyan text-void' : 'text-white/50 hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <PortfolioChart labels={activeRange.labels} data={activeRange.data} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass card-glow rounded-3xl p-6"
        >
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-white/40">Asset Allocation</p>

          <div className="mb-6 flex h-3 w-full overflow-hidden rounded-full bg-white/5">
            {assetAllocation.map((a) => (
              <div key={a.symbol} style={{ width: `${a.percent}%`, backgroundColor: a.color }} />
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {assetAllocation.map((a) => (
              <div key={a.symbol} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: a.color }} />
                  <span className="text-sm text-white/70">{a.name}</span>
                </div>
                <span className="font-mono-tabular text-sm font-semibold text-white">{a.percent}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
