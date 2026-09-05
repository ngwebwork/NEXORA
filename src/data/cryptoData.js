// Deterministic pseudo-random sparkline generator so charts stay stable across renders
function generateSparkline(seed, points = 24, volatility = 0.04) {
  let value = 1;
  let s = seed;
  const random = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const data = [value];
  for (let i = 1; i < points; i++) {
    const change = (random() - 0.48) * volatility;
    value = Math.max(0.05, value + change);
    data.push(value);
  }
  return data;
}

export const cryptoAssets = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: '₿',
    color: '#F7931A',
    price: 108421.32,
    change24h: 4.82,
    marketCap: 2142000000000,
    volume24h: 48200000000,
    high24h: 109840.11,
    low24h: 103902.44,
    category: 'Layer 1',
    sparkline: generateSparkline(11, 24, 0.05),
    about:
      'Bitcoin is the original decentralized digital currency, powered by a peer-to-peer network without a central authority. It remains the largest cryptocurrency by market capitalization and is widely regarded as digital gold.',
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    icon: 'Ξ',
    color: '#627EEA',
    price: 4231.09,
    change24h: 3.21,
    marketCap: 508900000000,
    volume24h: 21400000000,
    high24h: 4312.5,
    low24h: 4088.2,
    category: 'Layer 1',
    sparkline: generateSparkline(22, 24, 0.045),
    about:
      'Ethereum is a decentralized, programmable blockchain that powers smart contracts and a vast ecosystem of decentralized applications, DeFi protocols, and NFTs.',
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    icon: '◎',
    color: '#14F195',
    price: 218.47,
    change24h: 8.14,
    marketCap: 104300000000,
    volume24h: 6800000000,
    high24h: 224.9,
    low24h: 198.31,
    category: 'Layer 1',
    sparkline: generateSparkline(33, 24, 0.07),
    about:
      'Solana is a high-performance blockchain designed for speed and scalability, supporting thousands of transactions per second with minimal fees.',
  },
  {
    id: 'bnb',
    name: 'BNB',
    symbol: 'BNB',
    icon: '◆',
    color: '#F0B90B',
    price: 612.84,
    change24h: -1.42,
    marketCap: 89100000000,
    volume24h: 1900000000,
    high24h: 628.11,
    low24h: 605.02,
    category: 'Exchange',
    sparkline: generateSparkline(44, 24, 0.03),
    about:
      'BNB is the native token of the BNB Chain ecosystem, used for transaction fees, staking, and access to a wide range of decentralized applications.',
  },
  {
    id: 'xrp',
    name: 'XRP',
    symbol: 'XRP',
    icon: '✕',
    color: '#00AAE4',
    price: 2.84,
    change24h: 2.11,
    marketCap: 163200000000,
    volume24h: 5100000000,
    high24h: 2.91,
    low24h: 2.72,
    category: 'Payments',
    sparkline: generateSparkline(55, 24, 0.04),
    about:
      'XRP is designed for fast, low-cost cross-border payments and is used by the XRP Ledger, a decentralized public blockchain built for enterprise-grade financial use cases.',
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    icon: '❖',
    color: '#0033AD',
    price: 1.12,
    change24h: -0.68,
    marketCap: 39800000000,
    volume24h: 980000000,
    high24h: 1.16,
    low24h: 1.08,
    category: 'Layer 1',
    sparkline: generateSparkline(66, 24, 0.035),
    about:
      'Cardano is a research-driven blockchain platform built on peer-reviewed academic principles, focused on sustainability, scalability, and transparency.',
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    symbol: 'AVAX',
    icon: '▲',
    color: '#E84142',
    price: 58.32,
    change24h: 5.94,
    marketCap: 24100000000,
    volume24h: 1200000000,
    high24h: 60.11,
    low24h: 54.9,
    category: 'Layer 1',
    sparkline: generateSparkline(77, 24, 0.06),
    about:
      'Avalanche is a fast, low-cost, eco-friendly blockchain platform built for launching custom, interoperable blockchain networks and decentralized applications.',
  },
];

export const heroStats = [
  { symbol: 'BTC', price: '$108,421', change: '+4.82%', positive: true },
  { symbol: 'ETH', price: '$4,231', change: '+3.21%', positive: true },
  { symbol: 'SOL', price: '$218', change: '+8.14%', positive: true },
];

export const categories = ['All', 'Layer 1', 'Exchange', 'Payments'];
