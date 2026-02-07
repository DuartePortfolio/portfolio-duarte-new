import React from 'react';
import './Taskbar.css';
import volumeIcon from '../img/Windows XP Icons/Volume.webp';
import networkIcon from '../img/Windows XP Icons/Network and Internet.webp';
import { TaskbarProps } from '../types';

const Taskbar = ({ openApps, activeApp, onAppClick, onStartClick, startMenuOpen }: TaskbarProps) => {
  return (
    <div className="xp-taskbar">
      <button className={`xp-start-button ${startMenuOpen ? 'active' : ''}`} onClick={onStartClick}>
        <span className="start-text">start</span>
      </button>
      
      <div className="xp-taskbar-apps">
        {openApps.filter(app => app.isOpen).map((app) => (
          <button
            key={app.id}
            className={`xp-taskbar-app ${activeApp === app.id ? 'active' : ''} ${app.isMinimized ? 'minimized' : ''}`}
            onClick={() => onAppClick(app.id)}
          >
            <span className="taskbar-app-icon"><img src={app.icon} alt={app.name} /></span>
            <span className="taskbar-app-name">{app.name}</span>
          </button>
        ))}
      </div>
      
      <div className="xp-system-tray">
        <div className="tray-icons">
          <span className="tray-icon"><img src={volumeIcon} alt="Volume" /></span>
          <span className="tray-icon"><img src={networkIcon} alt="Network" /></span>
        </div>
        <div className="xp-clock">
          {new Date().toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
          })}
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
