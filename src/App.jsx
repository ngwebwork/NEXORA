import { useState } from 'react';
import LoadingScreen from './components/LoadingScreen.jsx';
import Home from './pages/Home.jsx';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      {!loading && <Home />}
    </>
  );
}
