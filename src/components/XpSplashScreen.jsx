import React, { useState } from 'react';
import './XpSplashScreen.css';
import turnOffIcon from '../img/Windows_Turn_Off_22528.png';
import CrtShutdownOverlay from './CrtShutdownOverlay';

const XpSplashScreen = ({ 
  userName = 'User', 
  userIcon = '', 
  onLogin = () => {},
  logoSrc = ''
}) => {
  const [hovered, setHovered] = useState(false);
  const [showShutdown, setShowShutdown] = useState(false);

  const defaultUserIcon = `
    <svg viewBox="0 0 48 48" fill="white">
      <circle cx="24" cy="16" r="8"/>
      <path d="M8 40 Q8 28 24 28 Q40 28 40 40 L40 44 Q40 46 38 46 L10 46 Q8 46 8 44 Z"/>
    </svg>
  `;

  const handlePowerOff = () => {
    setShowShutdown(true);
  };

  const handleShutdownComplete = () => {
    setShowShutdown(false);
  };

  return (
    <div className="xp-container">
      <div className="xp-left">
        <div className="xp-logo-block">
          <img src={logoSrc} alt="Windows XP" className="xp-logo" />
        </div>
        <div className="xp-subtitle">To begin, click your user name</div>
      </div>
      
      <div className="xp-divider"></div>
      
      <div className="xp-right">
        <div 
          className={`xp-user-tile ${hovered ? 'hovered' : ''}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={onLogin}
        >
          <div className="xp-user-icon" dangerouslySetInnerHTML={{ __html: userIcon || defaultUserIcon }} />
          <span className="xp-user-name">{userName}</span>
        </div>
      </div>
      
      <div className="xp-bottom">
        <div className="xp-power" onClick={handlePowerOff} style={{ cursor: 'pointer' }}>
          <img src={turnOffIcon} alt="Turn off" width="32" height="32" />
          <span>Turn off computer</span>
        </div>
        <div className="xp-help">
          After you log on, you can add or change accounts.<br />
          Just go to Control Panel and click User Accounts.
        </div>
      </div>

      {showShutdown && <CrtShutdownOverlay onComplete={handleShutdownComplete} />}
    </div>
  );
};

export default XpSplashScreen;
