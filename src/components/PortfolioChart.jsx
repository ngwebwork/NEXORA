import { useId, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function PortfolioChart({ labels, data }) {
  const gradientId = useId();
  const width = 600;
  const height = 240;
  const padding = 16;

  const { path, areaPath, points } = useMemo(() => {
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

    return { path: linePath, areaPath: area, points: pts };
  }, [data]);

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full overflow-visible">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4CE0D2" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#4CE0D2" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1={padding}
            x2={width - padding}
            y1={height - padding - f * (height - padding * 2)}
            y2={height - padding - f * (height - padding * 2)}
            stroke="rgba(255,255,255,0.06)"
          />
        ))}

        <motion.path
          key={`area-${labels.join(',')}`}
          d={areaPath}
          fill={`url(#${gradientId})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        <motion.path
          key={`line-${labels.join(',')}`}
          d={path}
          fill="none"
          stroke="#4CE0D2"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />

        {points.length > 0 && (
          <motion.circle
            key={`dot-${labels.join(',')}`}
            cx={points[points.length - 1][0]}
            cy={points[points.length - 1][1]}
            r="5"
            fill="#4CE0D2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.3 }}
          />
        )}
      </svg>

      <div className="mt-3 flex justify-between text-[10px] text-white/30">
        {labels
          .filter((_, i) => i % Math.ceil(labels.length / 6) === 0)
          .map((label) => (
            <span key={label} className="font-mono-tabular">
              {label}
            </span>
          ))}
      </div>
    </div>
  );
}
