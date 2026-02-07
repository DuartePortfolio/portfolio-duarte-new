import React from 'react';
import './XpStartMenu.css';
import userAccountIcon from '../img/Windows XP Icons/User Accounts.webp';
import briefcaseIcon from '../img/Windows XP Icons/Briefcase.webp';
import emailIcon from '../img/Windows XP Icons/Email.webp';
import documentIcon from '../img/Windows XP Icons/Generic Document.webp';
import networkIcon from '../img/Windows XP Icons/Network and Internet.webp';
import computerIcon from '../img/Windows XP Icons/My Computer.webp';
import linkIcon from '../img/Windows XP Icons/Internet Shortcut.webp';
import logoutIcon from '../img/Windows XP Icons/Logout.webp';
import powerIcon from '../img/Windows XP Icons/Power.webp';
import { XpStartMenuProps } from '../types';

const XpStartMenu = ({ userName, userIcon, onAppClick, onShutdown, onClose }: XpStartMenuProps) => {
  const apps = [
    { id: 'about', name: 'About Me', icon: userAccountIcon },
    { id: 'projects', name: 'Projects', icon: briefcaseIcon },
    { id: 'contact', name: 'Contact', icon: emailIcon },
    { id: 'resume', name: 'Resume / CV', icon: documentIcon },
  ];

  const handleAppClick = (appId: string) => {
    onAppClick(appId);
    onClose();
  };

  const handleShutdown = () => {
    onClose();
    onShutdown();
  };

  return (
    <>
      <div className="start-menu-backdrop" onClick={onClose} />
      <div className="xp-start-menu">
        <div className="start-menu-header">
          <div className="start-menu-user">
            <div className="start-menu-avatar">
              {userIcon && <img src={userIcon} alt="User" />}
            </div>
            <span className="start-menu-username">{userName}</span>
          </div>
        </div>

        <div className="start-menu-body">
          <div className="start-menu-left">
            <div className="start-menu-apps">
              {apps.map((app) => (
                <div
                  key={app.id}
                  className="start-menu-item"
                  onClick={() => handleAppClick(app.id)}
                >
                  <span className="start-menu-icon"><img src={app.icon} alt={app.name} /></span>
                  <span className="start-menu-label">{app.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="start-menu-right">
            <div className="start-menu-secondary">
              <div className="start-menu-item secondary">
                <span className="start-menu-icon"><img src={networkIcon} alt="Website" /></span>
                <span className="start-menu-label">My Website</span>
              </div>
              <div className="start-menu-item secondary">
                <span className="start-menu-icon"><img src={computerIcon} alt="GitHub" /></span>
                <span className="start-menu-label">GitHub</span>
              </div>
              <div className="start-menu-item secondary">
                <span className="start-menu-icon"><img src={linkIcon} alt="LinkedIn" /></span>
                <span className="start-menu-label">LinkedIn</span>
              </div>
            </div>
          </div>
        </div>

        <div className="start-menu-footer">
          <div className="start-menu-item footer" onClick={onClose}>
            <span className="start-menu-icon"><img src={logoutIcon} alt="Log Off" /></span>
            <span className="start-menu-label">Log Off</span>
          </div>
          <div className="start-menu-item footer" onClick={handleShutdown}>
            <span className="start-menu-icon"><img src={powerIcon} alt="Power" /></span>
            <span className="start-menu-label">Turn Off Computer</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default XpStartMenu;
