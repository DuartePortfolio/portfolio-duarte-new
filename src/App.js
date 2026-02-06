import { useState } from 'react';
import './App.css';
import XpSplashScreen from './components/XpSplashScreen.jsx';
import XpDesktop from './components/XpDesktop.jsx';
import MobileLayout from './components/MobileLayout.jsx';
import { useResponsive } from './hooks/useMediaQuery';
import windowsLogo from './img/pngimg.com - windows_logos_PNG20.png';

function App() {
  const [currentView, setCurrentView] = useState('login'); // 'login' or 'desktop'
  const { isMobile } = useResponsive();

  const handleLogin = () => {
    setCurrentView('desktop');
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
        isMobile ? <MobileLayout /> : <XpDesktop />
      )}
    </div>
  );
}

export default App;
