import React, { useState } from 'react';
import './App.css';
import XpSplashScreen from './components/XpSplashScreen';
import XpDesktop from './components/XpDesktop';
import MobileLayout from './components/MobileLayout';
import { useResponsive } from './hooks/useMediaQuery';
import windowsLogo from './img/pngimg.com - windows_logos_PNG20.png';

type ViewType = 'login' | 'desktop';

function App(): React.ReactElement {
  const [currentView, setCurrentView] = useState<ViewType>('login');
  const { isMobile } = useResponsive();

  const handleLogin = () => {
    setCurrentView('desktop');
  };

  const handleShutdown = () => {
    setCurrentView('login');
  };

  return (
    <div className="App">
      {currentView === 'login' ? (
        <XpSplashScreen 
          userName="Duarte Fernandes"
          onLogin={handleLogin}
          logoSrc={windowsLogo}
        />
      ) : (
        isMobile ? <MobileLayout onShutdown={handleShutdown} /> : <XpDesktop />
      )}
    </div>
  );
}

export default App;
