import React, { useState, useEffect } from 'react';
import './XpDesktop.css';
import XpWindow from './XpWindow';
import Taskbar from './Taskbar';
import XpStartMenu from './XpStartMenu';
import CrtShutdownOverlay from './CrtShutdownOverlay';
import AboutMe from './apps/AboutMe';
import Projects from './apps/Projects';
import Contact from './apps/Contact';
import Resume from './apps/Resume';
import ProjectDetails from './apps/ProjectDetails';
import userIcon from '../img/Windows XP Icons/User Accounts.png';
import briefcaseIcon from '../img/Windows XP Icons/Briefcase.png';
import emailIcon from '../img/Windows XP Icons/Email.png';
import documentIcon from '../img/Windows XP Icons/Generic Document.png';

const XpDesktop = () => {
  const [apps, setApps] = useState([
    { id: 'about', name: 'About Me', icon: userIcon, component: AboutMe, position: { x: 110, y: 40 }, isOpen: true, isMinimized: false, zIndex: 100 },
    { id: 'projects', name: 'Projects', icon: briefcaseIcon, component: Projects, position: { x: 860, y: 40 }, isOpen: true, isMinimized: false, zIndex: 101, componentProps: {} },
    { id: 'contact', name: 'Contact', icon: emailIcon, component: Contact, position: { x: 1425, y: 40 }, isOpen: true, isMinimized: false, zIndex: 102 },
    { id: 'resume', name: 'Resume / CV', icon: documentIcon, component: Resume, position: { x: 250, y: 200 }, isOpen: false, isMinimized: false, zIndex: 100 },
  ]);
  
  const [activeApp, setActiveApp] = useState('contact');
  const [nextZIndex, setNextZIndex] = useState(103);
  const [startMenuOpen, setStartMenuOpen] = useState(true);
  const [showShutdown, setShowShutdown] = useState(false);
  const [projectDetailWindows, setProjectDetailWindows] = useState([]);

  // Desktop icons (first 3 apps)
  const desktopIcons = apps.slice(0, 3);

  const openApp = (appId) => {
    const app = apps.find(a => a.id === appId);
    if (!app) return;

    if (app.isOpen) {
      // If already open, just restore and focus
      setApps(apps.map(a => 
        a.id === appId 
          ? { ...a, isMinimized: false, zIndex: nextZIndex }
          : a
      ));
      setActiveApp(appId);
      setNextZIndex(nextZIndex + 1);
    } else {
      // Open new app
      setApps(apps.map(a => 
        a.id === appId 
          ? { ...a, isOpen: true, isMinimized: false, zIndex: nextZIndex }
          : a
      ));
      setActiveApp(appId);
      setNextZIndex(nextZIndex + 1);
    }
  };

  const closeApp = (appId) => {
    setApps(apps.map(a => 
      a.id === appId 
        ? { ...a, isOpen: false, isMinimized: false }
        : a
    ));
    if (activeApp === appId) {
      setActiveApp(null);
    }
  };

  const minimizeApp = (appId) => {
    setApps(apps.map(a => 
      a.id === appId 
        ? { ...a, isMinimized: true }
        : a
    ));
    if (activeApp === appId) {
      setActiveApp(null);
    }
  };

  const focusApp = (appId) => {
    setActiveApp(appId);
    setApps(apps.map(a => 
      a.id === appId 
        ? { ...a, zIndex: nextZIndex, isMinimized: false }
        : a
    ));
    setNextZIndex(nextZIndex + 1);
  };

  const handleTaskbarAppClick = (appId) => {
    const app = apps.find(a => a.id === appId);
    if (!app) return;

    if (app.isMinimized || activeApp !== appId) {
      focusApp(appId);
    } else {
      minimizeApp(appId);
    }
  };

  const toggleStartMenu = () => {
    setStartMenuOpen(!startMenuOpen);
  };

  const triggerShutdown = () => {
    setShowShutdown(true);
  };

  const handleShutdownComplete = () => {
    setShowShutdown(false);
  };

  const handleProjectClick = (project) => {
    const windowId = `project-${project.id}`;
    
    // Check if window already exists
    const existingWindow = projectDetailWindows.find(w => w.id === windowId);
    if (existingWindow) {
      // Focus existing window
      setProjectDetailWindows(projectDetailWindows.map(w =>
        w.id === windowId ? { ...w, isMinimized: false, zIndex: nextZIndex } : w
      ));
      setActiveApp(windowId);
      setNextZIndex(nextZIndex + 1);
      return;
    }

    // Create new project detail window
    const newWindow = {
      id: windowId,
      name: project.title,
      icon: briefcaseIcon,
      component: ProjectDetails,
      componentProps: { project },
      position: { x: 300 + (projectDetailWindows.length * 30), y: 80 + (projectDetailWindows.length * 30) },
      isMinimized: false,
      zIndex: nextZIndex
    };

    setProjectDetailWindows([...projectDetailWindows, newWindow]);
    setActiveApp(windowId);
    setNextZIndex(nextZIndex + 1);
  };

  const closeProjectWindow = (windowId) => {
    setProjectDetailWindows(projectDetailWindows.filter(w => w.id !== windowId));
    if (activeApp === windowId) {
      setActiveApp(null);
    }
  };

  const minimizeProjectWindow = (windowId) => {
    setProjectDetailWindows(projectDetailWindows.map(w =>
      w.id === windowId ? { ...w, isMinimized: true } : w
    ));
    if (activeApp === windowId) {
      setActiveApp(null);
    }
  };

  const focusProjectWindow = (windowId) => {
    setActiveApp(windowId);
    setProjectDetailWindows(projectDetailWindows.map(w =>
      w.id === windowId ? { ...w, zIndex: nextZIndex, isMinimized: false } : w
    ));
    setNextZIndex(nextZIndex + 1);
  };

  // Close Start menu on Esc key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && startMenuOpen) {
        setStartMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [startMenuOpen]);

  return (
    <div className="xp-desktop">
      <div className="xp-desktop-icons">
        {desktopIcons.map((app) => (
          <div
            key={app.id}
            className="xp-desktop-icon"
            onDoubleClick={() => openApp(app.id)}
          >
            <div className="icon-image"><img src={app.icon} alt={app.name} /></div>
            <div className="icon-label">{app.name}</div>
          </div>
        ))}
      </div>

      {apps.map((app) => {
        if (!app.isOpen || app.isMinimized) return null;
        
        const AppComponent = app.component;
        const componentProps = app.id === 'projects' 
          ? { onProjectClick: handleProjectClick }
          : (app.componentProps || {});
          
        return (
          <XpWindow
            key={app.id}
            title={app.name}
            onClose={() => closeApp(app.id)}
            onMinimize={() => minimizeApp(app.id)}
            onFocus={() => focusApp(app.id)}
            isActive={activeApp === app.id}
            initialPosition={app.position}
            zIndex={app.zIndex}
          >
            <AppComponent {...componentProps} />
          </XpWindow>
        );
      })}

      {projectDetailWindows.map((window) => {
        if (window.isMinimized) return null;
        
        const WindowComponent = window.component;
        return (
          <XpWindow
            key={window.id}
            title={window.name}
            onClose={() => closeProjectWindow(window.id)}
            onMinimize={() => minimizeProjectWindow(window.id)}
            onFocus={() => focusProjectWindow(window.id)}
            isActive={activeApp === window.id}
            initialPosition={window.position}
            zIndex={window.zIndex}
          >
            <WindowComponent {...window.componentProps} />
          </XpWindow>
        );
      })}

      {startMenuOpen && (
        <XpStartMenu
          userName="Duarte Fernandes"
          userIcon={userIcon}
          onAppClick={openApp}
          onShutdown={triggerShutdown}
          onClose={() => setStartMenuOpen(false)}
        />
      )}

      <Taskbar
        openApps={[...apps, ...projectDetailWindows.map(w => ({ ...w, isOpen: true }))]}
        activeApp={activeApp}
        onAppClick={(appId) => {
          if (appId.startsWith('project-')) {
            const window = projectDetailWindows.find(w => w.id === appId);
            if (window) {
              if (window.isMinimized || activeApp !== appId) {
                focusProjectWindow(appId);
              } else {
                minimizeProjectWindow(appId);
              }
            }
          } else {
            handleTaskbarAppClick(appId);
          }
        }}
        onStartClick={toggleStartMenu}
        startMenuOpen={startMenuOpen}
      />

      {showShutdown && <CrtShutdownOverlay onComplete={handleShutdownComplete} />}
    </div>
  );
};

export default XpDesktop;
