import React, { useState, useEffect } from 'react';
import { AppWindow, Project } from '../types';
import XpWindow from './XpWindow';
import Taskbar from './Taskbar';
import XpStartMenu from './XpStartMenu';
import CrtShutdownOverlay from './CrtShutdownOverlay';
import AboutMe from './apps/AboutMe';
import Projects from './apps/Projects';
import Contact from './apps/Contact';
import Resume from './apps/Resume';
import ProjectDetails from './apps/ProjectDetails';
import userIcon from '../img/Windows XP Icons/User Accounts.webp';
import briefcaseIcon from '../img/Windows XP Icons/Briefcase.webp';
import emailIcon from '../img/Windows XP Icons/Email.webp';
import documentIcon from '../img/Windows XP Icons/Generic Document.webp';
import windowPositionManager from '../utils/windowPositionManager';
import './XpDesktop.css';

const XpDesktop = () => {
  // Get screen dimensions
  const getScreenDimensions = () => ({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const [screenSize, setScreenSize] = useState(getScreenDimensions());

  // Initialize apps with responsive positions
  const initializeApps = () => {
    const { width, height } = screenSize;
    return [
      { 
        id: 'about', 
        name: 'About Me', 
        icon: userIcon, 
        component: AboutMe, 
        position: windowPositionManager.getDefaultPosition('about', width, height), 
        isOpen: true, 
        isMinimized: false, 
        isMaximized: false, 
        zIndex: 100, 
        width: 750, 
        height: 700 
      },
      { 
        id: 'projects', 
        name: 'Projects', 
        icon: briefcaseIcon, 
        component: Projects, 
        position: windowPositionManager.getDefaultPosition('projects', width, height), 
        isOpen: false, 
        isMinimized: false, 
        isMaximized: false, 
        zIndex: 101, 
        componentProps: {} 
      },
      { 
        id: 'contact', 
        name: 'Contact', 
        icon: emailIcon, 
        component: Contact, 
        position: windowPositionManager.getDefaultPosition('contact', width, height), 
        isOpen: false, 
        isMinimized: false, 
        isMaximized: false, 
        zIndex: 102 
      },
      { 
        id: 'resume', 
        name: 'Resume / CV', 
        icon: documentIcon, 
        component: Resume, 
        position: windowPositionManager.getDefaultPosition('resume', width, height), 
        isOpen: false, 
        isMinimized: false, 
        isMaximized: false, 
        zIndex: 100,
        width: 800,
        height: 600
      },
    ];
  };

  const [apps, setApps] = useState<AppWindow[]>(initializeApps());
  
  const [activeApp, setActiveApp] = useState<string | null>('about');
  const [nextZIndex, setNextZIndex] = useState(101);
  const [startMenuOpen, setStartMenuOpen] = useState(true);
  const [showShutdown, setShowShutdown] = useState(false);
  const [projectDetailWindows, setProjectDetailWindows] = useState<AppWindow[]>([]);

  // Desktop icons (first 4 apps - About, Projects, Contact, Resume)
  const desktopIcons = apps.slice(0, 4);

  const openApp = (appId: string) => {
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

  const closeApp = (appId: string) => {
    setApps(apps.map(a => 
      a.id === appId 
        ? { ...a, isOpen: false, isMinimized: false }
        : a
    ));
    if (activeApp === appId) {
      setActiveApp(null);
    }
  };

  const minimizeApp = (appId: string) => {
    setApps(apps.map(a => 
      a.id === appId 
        ? { ...a, isMinimized: true }
        : a
    ));
    if (activeApp === appId) {
      setActiveApp(null);
    }
  };

  const maximizeApp = (appId: string) => {
    setApps(apps.map(a => 
      a.id === appId 
        ? { ...a, isMaximized: !a.isMaximized }
        : a
    ));
  };

  const focusApp = (appId: string) => {
    setActiveApp(appId);
    setApps(apps.map(a => 
      a.id === appId 
        ? { ...a, zIndex: nextZIndex }
        : a
    ));
    setNextZIndex(nextZIndex + 1);
  };

  const handleTaskbarAppClick = (appId: string) => {
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

  // Update window positions on screen resize
  useEffect(() => {
    const handleResize = () => {
      const newSize = getScreenDimensions();
      setScreenSize(newSize);
      
      setApps(prevApps => prevApps.map(app => {
        if (!app.isOpen || app.isMaximized) return app;
        
        const newPosition = windowPositionManager.getDefaultPosition(
          app.id, 
          newSize.width, 
          newSize.height
        );
        
        return { ...app, position: newPosition };
      }));

      // Update project detail windows too
      setProjectDetailWindows(prevWindows => prevWindows.map((window, index) => {
        if (window.isMaximized) return window;
        
        const basePosition = windowPositionManager.getDefaultPosition(
          'projectDetail', 
          newSize.width, 
          newSize.height
        );
        
        const newPosition = windowPositionManager.getCascadedPosition(
          basePosition.x,
          basePosition.y,
          index,
          newSize.width,
          newSize.height
        );
        
        return { ...window, position: newPosition };
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleProjectClick = (project: Project) => {
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

    // Calculate position using window position manager
    const basePosition = windowPositionManager.getDefaultPosition(
      'projectDetail', 
      screenSize.width, 
      screenSize.height
    );
    
    const position = windowPositionManager.getCascadedPosition(
      basePosition.x,
      basePosition.y,
      projectDetailWindows.length,
      screenSize.width,
      screenSize.height
    );

    // Create new project detail window
    const newWindow: AppWindow = {
      id: windowId,
      name: project.title,
      icon: briefcaseIcon,
      component: ProjectDetails,
      componentProps: { project },
      position,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZIndex,
      width: 900,
      height: 650
    };

    setProjectDetailWindows([...projectDetailWindows, newWindow]);
    setActiveApp(windowId);
    setNextZIndex(nextZIndex + 1);
  };

  const closeProjectWindow = (windowId: string) => {
    setProjectDetailWindows(projectDetailWindows.filter(w => w.id !== windowId));
    if (activeApp === windowId) {
      setActiveApp(null);
    }
  };

  const minimizeProjectWindow = (windowId: string) => {
    setProjectDetailWindows(projectDetailWindows.map(w =>
      w.id === windowId ? { ...w, isMinimized: true } : w
    ));
    if (activeApp === windowId) {
      setActiveApp(null);
    }
  };

  const maximizeProjectWindow = (windowId: string) => {
    setProjectDetailWindows(projectDetailWindows.map(w =>
      w.id === windowId ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  };

  const focusProjectWindow = (windowId: string) => {
    setActiveApp(windowId);
    setProjectDetailWindows(projectDetailWindows.map(w =>
      w.id === windowId ? { ...w, zIndex: nextZIndex, isMinimized: false } : w
    ));
    setNextZIndex(nextZIndex + 1);
  };

  // Close Start menu on Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
            onClick={() => openApp(app.id)}
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
            onMaximize={() => maximizeApp(app.id)}
            onFocus={() => focusApp(app.id)}
            isActive={activeApp === app.id}
            isMaximized={app.isMaximized}
            initialPosition={app.position}
            zIndex={app.zIndex}
            width={app.width}
            height={app.height}
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
            onMaximize={() => maximizeProjectWindow(window.id)}
            onFocus={() => focusProjectWindow(window.id)}
            isActive={activeApp === window.id}
            isMaximized={window.isMaximized}
            initialPosition={window.position}
            zIndex={window.zIndex}
            width={window.width}
            height={window.height}
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
