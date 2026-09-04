# 🌐 NEXORA - The Future of Digital Assets

> A futuristic, immersive crypto/Web3 platform built with React, Three.js, React Three Fiber, Spline, and Framer Motion.

NEXORA is a **frontend-only 3D cryptocurrency platform** designed to demonstrate modern frontend engineering, immersive 3D experiences, advanced animations, and interactive UI/UX.

The platform combines a futuristic Web3 aesthetic with interactive cryptocurrency markets, portfolio analytics, simulated wallet connections, and responsive 3D environments.
---

## 📊 Crypto Markets

Explore a simulated cryptocurrency market containing assets such as:

* Bitcoin
* Ethereum
* Solana
* BNB
* XRP
* Cardano
* Avalanche

Each asset includes:

* Current price
* 24-hour change
* Market capitalization
* Trading volume
* Mini price chart
* Interactive details

All market information is **mock frontend data**.

---

## 💼 Portfolio Dashboard

A futuristic portfolio experience displaying:

* Total portfolio balance
* 24-hour performance
* Interactive performance chart
* Asset allocation
* Time-range filtering
* Portfolio statistics

Available time ranges:

`24H` · `7D` · `1M` · `1Y`

---

## 🔗 Web3 Wallet Simulation

NEXORA includes a simulated wallet connection experience.

Supported UI options:

* MetaMask
* WalletConnect
* Coinbase Wallet

Users can simulate:

* Connecting a wallet
* Wallet loading state
* Connected wallet state
* Disconnecting

> ⚠️ No real blockchain transactions or wallet authentication are performed.

---

## 🌌 Interactive Web3 Ecosystem

A dedicated 3D ecosystem visualization represents a decentralized network using:

* Nodes
* Connections
* Floating particles
* Glowing spheres
* Digital structures
* Animated network activity

The environment responds to mouse movement and scrolling.

---

## 🎨 Design

NEXORA follows a modern futuristic design language:

* Dark interface
* Glassmorphism
* Neon accents
* Soft gradients
* Glowing borders
* Ambient lighting
* Large typography
* Cinematic animations
* Responsive layouts

The design intentionally avoids the appearance of a generic crypto dashboard.

---

## 🛠️ Tech Stack

| Technology        | Purpose                   |
| ----------------- | ------------------------- |
| React             | UI development            |
| Vite              | Development/build tooling |
| JavaScript        | Application logic         |
| Three.js          | 3D graphics               |
| React Three Fiber | React-based 3D            |
| Drei              | Three.js utilities        |
| Spline            | Interactive 3D scenes     |
| Framer Motion     | UI animations             |
| Tailwind CSS      | Styling                   |
| Lucide React      | Icons                     |

---

## 📁 Project Structure

```text
nexora/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── HeroScene.jsx
│   │   ├── MarketSection.jsx
│   │   ├── CryptoCard.jsx
│   │   ├── Portfolio.jsx
│   │   ├── PortfolioChart.jsx
│   │   ├── Ecosystem.jsx
│   │   ├── EcosystemScene.jsx
│   │   ├── Features.jsx
│   │   ├── AssetExplorer.jsx
│   │   ├── WalletModal.jsx
│   │   ├── LoadingScreen.jsx
│   │   └── Footer.jsx
│   │
│   ├── data/
│   │   ├── cryptoData.js
│   │   └── portfolioData.js
│   │
│   ├── hooks/
│   │   ├── useMousePosition.js
│   │   ├── useSmoothMouse.js
│   │   ├── useMagnetic.js
│   │   └── useTilt.js
│   │
│   ├── pages/
│   │   └── Home.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/nexora.git
```

### 2. Enter the project

```bash
cd nexora
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at the local development URL shown in your terminal.

---

## ⚡ Performance

Because NEXORA uses WebGL and interactive 3D scenes, performance is treated as a first-class concern.

The project uses:

* Optimized particle counts
* Reusable 3D components
* Lazy loading
* Suspense boundaries
* Efficient animation loops
* `requestAnimationFrame`
* Reduced effects on mobile
* Minimal unnecessary React re-renders

Desktop receives the full immersive experience while mobile devices receive optimized 3D effects.

---

## 📱 Responsive Design

NEXORA is designed for:

* 🖥️ Desktop
* 💻 Laptop
* 📱 Mobile
* 📟 Tablet

The layout, navigation, animations, charts, and 3D scenes adapt according to screen size.

---

## 🔐 Disclaimer

NEXORA is a **frontend demonstration project**.

It does not:

* Execute real cryptocurrency transactions
* Store cryptocurrency
* Connect to real blockchain networks
* Process payments
* Store private keys
* Provide financial advice

All cryptocurrency data and transaction interactions are simulated.

---

## 🎯 Project Goals

This project was created to demonstrate advanced frontend development skills, including:

* Modern React architecture
* 3D web development
* Three.js
* React Three Fiber
* Spline
* WebGL
* Interactive animations
* Motion design
* Responsive UI/UX
* Performance optimization
* Component architecture

---

## 🔮 Future Improvements

Potential future versions could include:

* Real-time cryptocurrency API
* Live blockchain data
* Web3 wallet integration
* Ethereum/Solana integration
* Real portfolio tracking
* Authentication
* Trading simulation
* AI-powered market insights
* Real-time WebSocket market updates

---

## 👨‍💻 Author

**Alpha01**

Full-Stack Developer focused on building modern web applications, interactive experiences, and scalable software.

---

## ⭐ Support

If you find this project interesting, consider giving the repository a ⭐ on GitHub.

---

### Built with React + Three.js + Spline + Framer Motion 🚀

**NEXORA — The Future of Digital Assets.**
