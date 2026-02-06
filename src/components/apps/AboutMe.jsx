import React, { memo } from 'react';
import profilePhoto from '../../img/meme.jfif';
import styles from './AboutMe.module.css';

const AboutMe = memo(() => {
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <h2 className={styles.heading}>About Me</h2>
        <p>
          Hello! I'm Duarte Fernandes, a <strong>full-stack</strong> developer from <span className={styles.locationBadge}>📍 <strong>Porto, Portugal</strong></span>, focused on back-end systems.
        </p>
        <p>
          I am fluent in English and Portuguese.
        </p>
        
        <h3 className={styles.subheading}>Skills</h3>
        
        <div className={styles.skillRow}>
          <div className={styles.skillCategory}>Backend</div>
          <div className={styles.divider}></div>
          <div className={styles.skillGrid}>
            <div className={styles.skillItem}>
              <i className={`devicon-java-plain colored ${styles.skillIcon}`}></i>
              <span className={styles.skillName}>Java</span>
            </div>
            <div className={styles.skillItem}>
              <i className={`devicon-spring-plain colored ${styles.skillIcon}`}></i>
              <span className={styles.skillName}>Spring Boot</span>
            </div>
            <div className={styles.skillItem}>
              <i className={`devicon-nodejs-plain colored ${styles.skillIcon}`}></i>
              <span>Node.js</span>
            </div>
            <div className={styles.skillItem}>
              <i className={`devicon-express-original ${styles.skillIcon}`}></i>
              <span>Express</span>
            </div>
          </div>
        </div>

        <div className={styles.skillRow}>
          <div className={styles.skillCategory}>Databases</div>
          <div className={styles.divider}></div>
          <div className={styles.skillGrid}>
            <div className={styles.skillItem}>
              <i className={`devicon-mysql-plain colored ${styles.skillIcon}`}></i>
              <span>MySQL</span>
            </div>
            <div className={styles.skillItem}>
              <i className={`devicon-mongodb-plain colored ${styles.skillIcon}`}></i>
              <span>MongoDB</span>
            </div>
          </div>
        </div>

        <div className={styles.skillRow}>
          <div className={styles.skillCategory}>Frontend</div>
          <div className={styles.divider}></div>
          <div className={styles.skillGrid}>
            <div className={styles.skillItemFaded}>
              <i className={`devicon-javascript-plain colored ${styles.skillIcon}`}></i>
              <span>JavaScript</span>
            </div>
            <div className={styles.skillItemFaded}>
              <i className={`devicon-react-original colored ${styles.skillIcon}`}></i>
              <span>React</span>
            </div>
            <div className={styles.skillItemFaded}>
              <i className={`devicon-vuejs-plain colored ${styles.skillIcon}`}></i>
              <span>Vue</span>
            </div>
            <div className={styles.skillItemFaded}>
              <i className={`devicon-html5-plain colored ${styles.skillIcon}`}></i>
              <span>HTML</span>
            </div>
            <div className={styles.skillItemFaded}>
              <i className={`devicon-css3-plain colored ${styles.skillIcon}`}></i>
              <span>CSS</span>
            </div>
          </div>
        </div>

        <div className={styles.skillRow}>
          <div className={styles.skillCategory}>Tools</div>
          <div className={styles.divider}></div>
          <div className={styles.skillGrid}>
            <div className={styles.skillItem}>
              <i className={`devicon-git-plain colored ${styles.skillIcon}`}></i>
              <span>Git</span>
            </div>
            <div className={styles.skillItem}>
              <i className={`devicon-github-original ${styles.skillIcon}`}></i>
              <span>GitHub</span>
            </div>
          </div>
        </div>
        
        <h3 className={styles.subheading}>Education</h3>
        <div className={styles.educationSection}>
          <div>
            <strong>Bachelor's Degree</strong>
          </div>
          <div className={styles.educationDivider}></div>
          <div>
            <strong>ESMAD - Escola Superior de Media Artes e Design</strong><br />
            Web Development & Multimedia Design<br />
            2023-2027
          </div>
        </div>

        <h3 className={styles.subheading}>Find Me Here</h3>
        <div className={styles.socialLinks}>
          <a href="https://github.com/DuartePortfolio" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <div className={styles.socialItem}>
              <i className={`devicon-github-original ${styles.socialIcon}`}></i>
              <span className={styles.socialLabel}>GitHub</span>
            </div>
          </a>
          <a href="https://www.linkedin.com/in/duartepfernandes/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <div className={styles.socialItem}>
              <i className={`devicon-linkedin-plain ${styles.socialIcon}`}></i>
              <span className={styles.socialLabel}>LinkedIn</span>
            </div>
          </a>
          <a href="mailto:dufernandes753@gmail.com" className={styles.socialLink}>
            <div className={styles.socialItem}>
              <span className={styles.socialIcon}>✉️</span>
              <span className={styles.socialLabel}>Email</span>
            </div>
          </a>
        </div>
      </div>
      
      <div className={`${styles.photoContainer} about-me-photo`}>
        <img 
          src={profilePhoto} 
          alt="Duarte Fernandes" 
          className={styles.photo}
        />
      </div>
    </div>
  );
});

AboutMe.displayName = 'AboutMe';

export default AboutMe;
