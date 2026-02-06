import React from 'react';
import profilePhoto from '../../img/meme.jfif';

const AboutMe = () => {
  return (
    <div style={{ 
      fontFamily: 'Tahoma, sans-serif', 
      fontSize: '12px',
      display: 'flex',
      gap: '30px'
    }}>
      <div style={{ flex: 1 }}>
        <h2 style={{ color: '#0053ee', marginTop: 0, marginBottom: '16px' }}>About Me</h2>
        <p>
          Hello! I'm Duarte Fernandes, a <strong>full-stack</strong> developer from <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>📍 <strong>Porto, Portugal</strong></span>, focused on back-end systems.
        </p>
        <p>
          I am fluent in English and Portuguese.
        </p>
        
        <h3 style={{ color: '#0053ee', marginTop: '28px', marginBottom: '16px' }}>Skills</h3>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <div style={{ 
            minWidth: '105px', 
            fontWeight: '600',
            color: '#000'
          }}>
            Backend
          </div>
          <div style={{ 
            width: '2px', 
            minHeight: '40px', 
            background: '#ccc',
            alignSelf: 'stretch'
          }}></div>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
            gap: '12px',
            flex: 1
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <i className="devicon-java-plain colored" style={{ fontSize: '22px', width: '22px', height: '22px', flexShrink: 0 }}></i>
              <span style={{ fontWeight: '500' }}>Java</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <i className="devicon-spring-plain colored" style={{ fontSize: '22px', width: '22px', height: '22px', flexShrink: 0 }}></i>
              <span style={{ fontWeight: '500' }}>Spring Boot</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <i className="devicon-nodejs-plain colored" style={{ fontSize: '22px', width: '22px', height: '22px', flexShrink: 0 }}></i>
              <span>Node.js</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <i className="devicon-express-original" style={{ fontSize: '22px', width: '22px', height: '22px', flexShrink: 0 }}></i>
              <span>Express</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <div style={{ 
            minWidth: '105px', 
            fontWeight: '600',
            color: '#000'
          }}>
            Databases
          </div>
          <div style={{ 
            width: '2px', 
            minHeight: '40px', 
            background: '#ccc',
            alignSelf: 'stretch'
          }}></div>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
            gap: '12px',
            flex: 1
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <i className="devicon-mysql-plain colored" style={{ fontSize: '22px', width: '22px', height: '22px', flexShrink: 0 }}></i>
              <span>MySQL</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <i className="devicon-mongodb-plain colored" style={{ fontSize: '22px', width: '22px', height: '22px', flexShrink: 0 }}></i>
              <span>MongoDB</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <div style={{ 
            minWidth: '105px', 
            fontWeight: '600',
            color: '#000'
          }}>
            Frontend
          </div>
          <div style={{ 
            width: '2px', 
            minHeight: '40px', 
            background: '#ccc',
            alignSelf: 'stretch'
          }}></div>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
            gap: '12px',
            flex: 1
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', opacity: 0.85 }}>
              <i className="devicon-javascript-plain colored" style={{ fontSize: '22px', width: '22px', height: '22px', flexShrink: 0 }}></i>
              <span>JavaScript</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', opacity: 0.85 }}>
              <i className="devicon-react-original colored" style={{ fontSize: '22px', width: '22px', height: '22px', flexShrink: 0 }}></i>
              <span>React</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', opacity: 0.85 }}>
              <i className="devicon-vuejs-plain colored" style={{ fontSize: '22px', width: '22px', height: '22px', flexShrink: 0 }}></i>
              <span>Vue</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', opacity: 0.85 }}>
              <i className="devicon-html5-plain colored" style={{ fontSize: '22px', width: '22px', height: '22px', flexShrink: 0 }}></i>
              <span>HTML</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', opacity: 0.85 }}>
              <i className="devicon-css3-plain colored" style={{ fontSize: '22px', width: '22px', height: '22px', flexShrink: 0 }}></i>
              <span>CSS</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ 
            minWidth: '105px', 
            fontWeight: '600',
            color: '#000'
          }}>
            Tools
          </div>
          <div style={{ 
            width: '2px', 
            minHeight: '40px', 
            background: '#ccc',
            alignSelf: 'stretch'
          }}></div>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
            gap: '12px',
            flex: 1
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <i className="devicon-git-plain colored" style={{ fontSize: '22px', width: '22px', height: '22px', flexShrink: 0 }}></i>
              <span>Git</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <i className="devicon-github-original" style={{ fontSize: '22px', width: '22px', height: '22px', flexShrink: 0 }}></i>
              <span>GitHub</span>
            </div>
          </div>
        </div>
        
        <h3 style={{ color: '#0053ee', marginTop: '28px' }}>Education</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
          <div>
            <strong>Bachelor's Degree</strong>
          </div>
          <div style={{ 
            width: '2px', 
            height: '40px', 
            background: '#ccc',
            margin: '0 4px'
          }}></div>
          <div>
            <strong>ESMAD - Escola Superior de Media Artes e Design</strong><br />
            Web Development & Multimedia Design<br />
            2023-2027
          </div>
        </div>

        <h3 style={{ color: '#0053ee', marginTop: '32px', marginBottom: '16px' }}>Find Me Here</h3>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <a href="https://github.com/DuartePortfolio" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <i className="devicon-github-original" style={{ fontSize: '28px', filter: 'grayscale(100%)', opacity: 0.7 }}></i>
              <span style={{ fontSize: '11px', color: '#666' }}>GitHub</span>
            </div>
          </a>
          <a href="https://www.linkedin.com/in/duartepfernandes/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <i className="devicon-linkedin-plain" style={{ fontSize: '28px', filter: 'grayscale(100%)', opacity: 0.7 }}></i>
              <span style={{ fontSize: '11px', color: '#666' }}>LinkedIn</span>
            </div>
          </a>
          <a href="mailto:dufernandes753@gmail.com" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <span style={{ fontSize: '28px', filter: 'grayscale(100%)', opacity: 0.7 }}>✉️</span>
              <span style={{ fontSize: '11px', color: '#666' }}>Email</span>
            </div>
          </a>
        </div>
      </div>
      
      <div style={{ 
        width: '200px', 
        height: '200px', 
        border: '2px solid #ccc',
        background: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        marginTop: '0',
        overflow: 'hidden'
      }}>
        <img 
          src={profilePhoto} 
          alt="Duarte Fernandes" 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover' 
          }} 
        />
      </div>
    </div>
  );
};

export default AboutMe;
