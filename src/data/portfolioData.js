function generateSeries(base, points, volatility, trend = 0.002) {
  let value = base;
  let seed = base * 13;
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const series = [];
  for (let i = 0; i < points; i++) {
    value = value * (1 + (random() - 0.45) * volatility + trend);
    series.push(Math.round(value * 100) / 100);
  }
  return series;
}

export const portfolioRanges = {
  '24H': {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    data: generateSeries(238000, 24, 0.01, 0.0015),
  },
  '7D': {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: generateSeries(225000, 7, 0.025, 0.006),
  },
  '1M': {
    labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
    data: generateSeries(198000, 30, 0.02, 0.003),
  },
  '1Y': {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    data: generateSeries(142000, 12, 0.05, 0.02),
  },
};

export const portfolioSummary = {
  totalBalance: 248492.81,
  change24h: 8.42,
};

export const assetAllocation = [
  { symbol: 'BTC', name: 'Bitcoin', percent: 42, color: '#F7931A' },
  { symbol: 'ETH', name: 'Ethereum', percent: 31, color: '#627EEA' },
  { symbol: 'SOL', name: 'Solana', percent: 17, color: '#14F195' },
  { symbol: 'Others', name: 'Others', percent: 10, color: '#8B8FA3' },
];

export const ecosystemStats = [
  { label: 'Transactions', value: '10M+' },
  { label: 'Active Users', value: '240K+' },
  { label: 'Network Uptime', value: '99.99%' },
];

export const walletProviders = [
  { id: 'metamask', name: 'MetaMask', description: 'Connect using browser extension' },
  { id: 'walletconnect', name: 'WalletConnect', description: 'Scan with a mobile wallet' },
  { id: 'coinbase', name: 'Coinbase Wallet', description: 'Connect using Coinbase' },
];
