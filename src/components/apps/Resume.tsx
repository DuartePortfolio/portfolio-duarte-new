import React, { memo } from 'react';
import styles from './Resume.module.css';

const Resume = memo(() => {
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Duarte_Fernandes_CV.pdf';
    link.download = 'Duarte_Fernandes_CV.pdf';
    link.click();
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <h2 className={styles.heading}>Resume / CV</h2>
        <button 
          onClick={handleDownloadCV} 
          className={styles.downloadButton}
          aria-label="Download CV as PDF"
        >
          📥 Download PDF
        </button>
      </div>
      
      <section className={styles.section}>
        <h3 className={styles.name}>Duarte Fernandes</h3>
        <p className={styles.title}>
          Full Stack Developer
        </p>
        <p className={styles.contactInfo}>
          📧 dufernandes753@gmail.com | +351 911 024 055
        </p>
        <p className={styles.links}>
          🔗 <a href="https://www.linkedin.com/in/duartepfernandes/" target="_blank" rel="noopener noreferrer">LinkedIn</a> | 
          💻 <a href="https://github.com/DuartePortfolio" target="_blank" rel="noopener noreferrer">GitHub</a>
        </p>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>
          Professional Summary
        </h3>
        <p className={styles.summary}>
          As a soon-to-be graduated Full Stack Developer, I am eager to apply my skills in building innovative web and mobile 
          applications. With strong foundations in both frontend and backend development, I am excited about creating 
          user-friendly, efficient solutions and continuously expanding my knowledge in emerging technologies.
        </p>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>
          Education
        </h3>
        <div className={styles.educationItem}>
          <p className={styles.educationTitle}>Bachelor's Degree in Computer Engineering</p>
          <p className={styles.educationDetails}>
            ESMAD | School of Media Arts and Design, Polytechnic of Porto
          </p>
          <p className={styles.educationDetails}>
            Sept 2023 - February 2027 | Vila do Conde, Portugal
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>
          Technical Skills
        </h3>
        <div>
          <div className={styles.skillCategory}>
            <p className={styles.skillCategoryTitle}>Programming Languages:</p>
            <p className={styles.skillList}>
              JavaScript, TypeScript, Python, Java, C#, PHP, HTML, CSS
            </p>
          </div>
          
          <div className={styles.skillCategory}>
            <p className={styles.skillCategoryTitle}>Frameworks & Libraries:</p>
            <p className={styles.skillList}>
              React.js, Next.js, Vue.js, Node.js, Express.js, React Native, Flask, .NET
            </p>
          </div>
          
          <div className={styles.skillCategory}>
            <p className={styles.skillCategoryTitle}>Databases:</p>
            <p className={styles.skillList}>
              MySQL, MongoDB, PostgreSQL, SQL Server
            </p>
          </div>
          
          <div className={styles.skillCategory}>
            <p className={styles.skillCategoryTitle}>Tools & Platforms:</p>
            <p className={styles.skillList}>
              Git, GitHub, Docker, Postman, VS Code, Figma
            </p>
          </div>
          
          <div className={styles.skillCategory}>
            <p className={styles.skillCategoryTitle}>Other:</p>
            <p className={styles.skillList}>
              REST APIs, GraphQL, Microservices, JWT, Agile Methodologies
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>
          Projects
        </h3>
        
        <div className={styles.projectItem}>
          <p className={styles.projectTitle}>Voltzy - Mobile Energy Management App</p>
          <p className={styles.projectDate}>October 2025 - Jan 2026</p>
          <p className={styles.projectTech}>React Native, TypeScript, Expo, Node.js, MySQL</p>
          <ul className={styles.projectList}>
            <li>Developed a cross-platform mobile application to monitor and manage home energy consumption</li>
            <li>Built REST APIs with JWT authentication for secure user management</li>
            <li>Designed a MySQL database to store user data, consumption metrics, and device statuses</li>
            <li>Implemented real-time energy consumption charts and device automation features</li>
          </ul>
        </div>
        
        <div className={styles.projectItem}>
          <p className={styles.projectTitle}>PokéStop - Microservices Architecture Platform</p>
          <p className={styles.projectDate}>October 2025 - Jan 2026</p>
          <p className={styles.projectTech}>Node.js, Python, Flask, Docker, MySQL, MongoDB, GraphQL</p>
          <ul className={styles.projectList}>
            <li>Designed and implemented a microservices architecture with independent services communicating via REST and GraphQL APIs</li>
            <li>Configured an NGINX API Gateway for centralized routing and load balancing</li>
            <li>Built JWT-based authentication and authorization across services</li>
            <li>Deployed the entire stack using Docker Compose for streamlined development and deployment</li>
          </ul>
        </div>
        
        <div className={styles.projectItem}>
          <p className={styles.projectTitle}>Bus API</p>
          <p className={styles.projectDate}>March 2024</p>
          <p className={styles.projectTech}>Node.js, Express.js, MySQL</p>
          <ul className={styles.projectList}>
            <li>Developed a RESTful API to retrieve bus schedules and route information</li>
            <li>Integrated MySQL for data storage and optimized queries for performance</li>
          </ul>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>
          Soft Skills
        </h3>
        <p className={styles.skillList}>
          Problem-solving, Teamwork, Adaptability, Effective Communication, Time Management, 
          Attention to Detail, Willingness to Learn
        </p>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>
          Languages
        </h3>
        <div>
          <p className={styles.languageItem}>
            <strong>Portuguese:</strong> Native
          </p>
          <p className={styles.languageItem}>
            <strong>English:</strong> Proficient
          </p>
        </div>
      </section>


    </div>
  );
});

Resume.displayName = 'Resume';

export default Resume;
