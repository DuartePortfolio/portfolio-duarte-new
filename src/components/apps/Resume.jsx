import React, { memo } from 'react';
import styles from './Resume.module.css';

const Resume = memo(() => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Resume / CV</h2>
      
      <section className={styles.section}>
        <h3 className={styles.name}>Duarte Fernandes</h3>
        <p className={styles.contactInfo}>
          Full-stack Developer | Porto, Portugal
        </p>
        <p className={styles.contactInfo}>
          📧 duarte.ofernandes@gmail.com | 📱 (+351) 917 213 850
        </p>
        <p className={styles.links}>
          🔗 <a href="https://www.linkedin.com/in/duartefernandes-/" target="_blank" rel="noopener noreferrer">LinkedIn</a> | 
          💻 <a href="https://github.com/DuartePortfolio" target="_blank" rel="noopener noreferrer">GitHub</a>
        </p>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>
          Professional Summary
        </h3>
        <p className={styles.summary}>
          Full-stack developer with expertise in building scalable web and mobile applications using modern technologies. 
          Experienced in microservices architecture, RESTful APIs, and cross-platform mobile development. Passionate about 
          creating efficient, user-focused solutions and continuously learning emerging technologies.
        </p>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>
          Education
        </h3>
        <div className={styles.educationItem}>
          <p className={styles.educationTitle}>Bachelor's Degree in Informatics Engineering</p>
          <p className={styles.educationDetails}>
            ESMAD (Escola Superior de Media Artes e Design) - Politécnico do Porto
          </p>
          <p className={styles.educationDetails}>
            2021 - 2024 | Vila do Conde, Portugal
          </p>
        </div>
        <div className={styles.educationItem}>
          <p className={styles.educationTitle}>High School Diploma - Sciences and Technologies</p>
          <p className={styles.educationDetails}>
            Externato Ribadouro | 2018 - 2021 | Porto, Portugal
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
              JavaScript/TypeScript, Python, Java, C#, PHP, SQL, HTML5, CSS3
            </p>
          </div>
          
          <div className={styles.skillCategory}>
            <p className={styles.skillCategoryTitle}>Frontend Development:</p>
            <p className={styles.skillList}>
              React, React Native, Expo, Vue.js, Next.js, Angular, Bootstrap, Tailwind CSS
            </p>
          </div>
          
          <div className={styles.skillCategory}>
            <p className={styles.skillCategoryTitle}>Backend Development:</p>
            <p className={styles.skillList}>
              Node.js, Express.js, Flask, .NET, REST APIs, GraphQL, JWT Authentication
            </p>
          </div>
          
          <div className={styles.skillCategory}>
            <p className={styles.skillCategoryTitle}>Databases:</p>
            <p className={styles.skillList}>
              MySQL, MongoDB, PostgreSQL, SQL Server, Firebase
            </p>
          </div>
          
          <div className={styles.skillCategory}>
            <p className={styles.skillCategoryTitle}>DevOps & Tools:</p>
            <p className={styles.skillList}>
              Docker, Docker Compose, NGINX, Git, GitHub, Postman, Swagger/OpenAPI
            </p>
          </div>
          
          <div className={styles.skillCategory}>
            <p className={styles.skillCategoryTitle}>Design & Multimedia:</p>
            <p className={styles.skillList}>
              Figma, Adobe XD, Adobe Photoshop, Adobe Illustrator, Adobe Premiere Pro, DaVinci Resolve
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>
          Key Projects
        </h3>
        
        <div className={styles.projectItem}>
          <p className={styles.projectTitle}>Voltzy - Smart Energy Management App</p>
          <p className={styles.projectTech}>React Native, TypeScript, Node.js, MySQL</p>
          <ul className={styles.projectList}>
            <li>Built cross-platform mobile app for real-time energy monitoring and smart home control</li>
            <li>Implemented JWT authentication, REST API backend, and MySQL database design</li>
            <li>Created interactive charts for consumption analytics and solar panel monitoring</li>
            <li>Developed automation routines for energy optimization</li>
          </ul>
        </div>
        
        <div className={styles.projectItem}>
          <p className={styles.projectTitle}>PokéStop - Microservices Platform</p>
          <p className={styles.projectTech}>Node.js, Python/Flask, Docker, MySQL, MongoDB</p>
          <ul className={styles.projectList}>
            <li>Designed and implemented microservices architecture with 7 independent services</li>
            <li>Built API gateway using NGINX for centralized routing and load balancing</li>
            <li>Developed GraphQL and REST APIs with JWT-based authentication</li>
            <li>Containerized entire stack using Docker Compose for seamless deployment</li>
          </ul>
        </div>
        
        <div className={styles.projectItem}>
          <p className={styles.projectTitle}>Bus API - Public Transportation Service</p>
          <p className={styles.projectTech}>Node.js, Express.js, MySQL</p>
          <ul className={styles.projectList}>
            <li>Developed RESTful API for real-time bus tracking and route information</li>
            <li>Implemented caching strategies and database optimization for performance</li>
            <li>Created comprehensive API documentation using Swagger</li>
          </ul>
        </div>
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
            <strong>English:</strong> Fluent (Professional proficiency)
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>
          Interests & Hobbies
        </h3>
        <p className={styles.interests}>
          Technology enthusiast, video editing, graphic design, photography, gaming, continuous learning through 
          online courses and tech communities.
        </p>
      </section>

      <div className={styles.downloadNotice}>
        <p className={styles.downloadText}>
          💾 PDF download feature coming soon
        </p>
      </div>
    </div>
  );
});

Resume.displayName = 'Resume';

export default Resume;
