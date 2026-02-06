import React, { useState } from 'react';
import './MobileLayout.css';
import homeIcon from '../img/Windows XP Icons/Desktop.png';
import AboutMe from './apps/AboutMe';
import Projects from './apps/Projects';
import Contact from './apps/Contact';
import Resume from './apps/Resume';
import ProjectDetails from './apps/ProjectDetails';
import userIcon from '../img/Windows XP Icons/User Accounts.png';
import briefcaseIcon from '../img/Windows XP Icons/Briefcase.png';
import emailIcon from '../img/Windows XP Icons/Email.png';
import documentIcon from '../img/Windows XP Icons/Generic Document.png';

const MobileLayout = () => {
  const [currentApp, setCurrentApp] = useState('menu');
  const [selectedProject, setSelectedProject] = useState(null);

  const apps = [
    { id: 'about', name: 'About Me', icon: userIcon, component: AboutMe },
    { id: 'projects', name: 'Projects', icon: briefcaseIcon, component: Projects },
    { id: 'contact', name: 'Contact', icon: emailIcon, component: Contact },
    { id: 'resume', name: 'Resume / CV', icon: documentIcon, component: Resume },
  ];

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setCurrentApp('project-detail');
  };

  const handleBackClick = () => {
    if (currentApp === 'project-detail') {
      setCurrentApp('projects');
      setSelectedProject(null);
    } else {
      setCurrentApp('menu');
    }
  };

  const renderContent = () => {
    if (currentApp === 'menu') {
      return (
        <div className="mobile-menu">
          <div className="mobile-header">
            <h1>Duarte Fernandes</h1>
            <p className="mobile-subtitle">Full-stack developer, 📍 Porto, Portugal</p>
          </div>
          <div className="mobile-app-grid">
            {apps.map(app => (
              <div 
                key={app.id} 
                className="mobile-app-card"
                onClick={() => setCurrentApp(app.id)}
              >
                <img src={app.icon} alt={app.name} className="mobile-app-icon" />
                <span className="mobile-app-name">{app.name}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (currentApp === 'project-detail') {
      return <ProjectDetails project={selectedProject} />;
    }

    const app = apps.find(a => a.id === currentApp);
    if (!app) return null;

    const AppComponent = app.component;
    const componentProps = currentApp === 'projects' 
      ? { onProjectClick: handleProjectClick }
      : {};

    return <AppComponent {...componentProps} />;
  };

  return (
    <div className="mobile-layout">
      {/* Mobile Header */}
      <header className="mobile-app-header">
        {currentApp !== 'menu' && (
          <button className="mobile-back-btn" onClick={handleBackClick}>
            ← Back
          </button>
        )}
        <h2 className="mobile-app-title">
          {currentApp === 'menu' ? '' : 
           currentApp === 'project-detail' ? selectedProject?.title :
           apps.find(a => a.id === currentApp)?.name}
        </h2>
      </header>

      {/* Mobile Content */}
      <main className="mobile-content">
        {renderContent()}
      </main>

      {/* Mobile Navigation Bar */}
      {currentApp === 'menu' && (
        <nav className="mobile-nav">
          <div className="mobile-nav-item active">
            <span className="mobile-nav-icon"><img src={homeIcon} alt="Home" style={{ width: '20px', height: '20px' }} /></span>
            <span className="mobile-nav-label">Home</span>
          </div>
        </nav>
      )}
    </div>
  );
};

export default MobileLayout;
