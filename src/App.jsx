import { useState } from 'react';
import LoadingScreen from './components/LoadingScreen.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import CursorGlow from './components/CursorGlow.jsx';
import Home from './pages/Home.jsx';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <CursorGlow />
      <CustomCursor />
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      {!loading && <Home />}
    </>
  );
}
