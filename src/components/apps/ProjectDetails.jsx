import React, { useState, memo, useCallback } from 'react';
import styles from './ProjectDetails.module.css';

const ImageGallery = memo(({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;
  
  if (images.length === 1) {
    const img = images[0];
    return (
      <div className={styles.singleImageContainer}>
        {img.placeholder ? (
          <div className={styles.placeholderImage}>
            <span className={styles.placeholderText}>
              Image Placeholder
            </span>
          </div>
        ) : (
          <div className={styles.imageWrapper}>
            <img 
              src={img.src} 
              alt={img.caption}
              onClick={() => window.open(img.src, '_blank')}
              className={`${styles.image} ${img.type === 'screenshot' ? styles.screenshotImage : ''}`}
              title="Click to view full size"
            />
            <div className={styles.enlargeHint}>
              🔍 Click to enlarge
            </div>
          </div>
        )}
        <div className={styles.imageCaption}>
          {img.caption}
        </div>
      </div>
    );
  }

  // Gallery for multiple images
  const currentImage = images[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.galleryWrapper}>
        {currentImage.placeholder ? (
          <div className={styles.placeholderImage}>
            <span className={styles.placeholderText}>
              Image Placeholder
            </span>
          </div>
        ) : (
          <>
            <div className={styles.galleryImageContainer}>
              <img 
                src={currentImage.src} 
                alt={currentImage.caption}
                onClick={() => window.open(currentImage.src, '_blank')}
                className={`${styles.galleryImage} ${currentImage.type === 'screenshot' ? styles.screenshotImage : ''}`}
                title="Click to view full size"
              />
            </div>
            <div className={styles.enlargeHint}>
              🔍 Click to enlarge
            </div>
          </>
        )}
        
        <button
          onClick={handlePrevious}
          className={`${styles.arrowButton} ${styles.arrowButtonLeft}`}
        >
          ◄
        </button>
        
        <button
          onClick={handleNext}
          className={`${styles.arrowButton} ${styles.arrowButtonRight}`}
        >
          ►
        </button>
      </div>
      
      <div className={styles.imageCaption}>
        {currentImage.caption} ({currentIndex + 1} / {images.length})
      </div>
    </div>
  );
});

ImageGallery.displayName = 'ImageGallery';

const highlightText = (text) => {
  const keywords = [
    'microservices', 'API gateway', 'Docker Compose', 'GraphQL',
    'REST', 'JWT', 'NGINX', 'MySQL', 'MongoDB'
  ];
  
  const regex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, i) => {
    if (keywords.some(keyword => keyword.toLowerCase() === part.toLowerCase())) {
      return <span key={i} className={styles.highlight}>{part}</span>;
    }
    return part;
  });
};

const ProjectDetails = memo(({ project }) => {
  const scrollToSection = useCallback((index) => {
    const element = document.getElementById(`section-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  if (!project) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{project.title}</h2>
      
      <div className={styles.heroImageContainer}>
        <img 
          src={project.image} 
          alt={project.title}
          className={`${styles.heroImage} ${project.id === 'voltzy' ? styles.heroImageVoltzy : ''}`}
        />
      </div>

      {project.sections && (
        <section className={styles.toc}>
          <h3 className={styles.tocHeading}>Table of Contents</h3>
          <div className={styles.tocList}>
            {project.sections.map((section, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(index)}
                className={styles.tocButton}
              >
                → {section.title}
              </button>
            ))}
          </div>
        </section>
      )}

      {project.sections ? (
        <>
          {project.sections.map((section, index) => (
            <section 
              key={index} 
              id={`section-${index}`}
              className={styles.section}
            >
              <h3 className={styles.sectionTitle}>{section.title}</h3>
              <div className={styles.sectionContent}>{highlightText(section.content)}</div>
              
              {section.images && section.images.length > 0 && (
                <div className={styles.imagesContainer}>
                  <ImageGallery images={section.images} />
                </div>
              )}
            </section>
          ))}
        </>
      ) : (
        <>
          {project.features && (
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Key Features</h3>
              <ul className={styles.featuresList}>
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </section>
          )}

          {project.responsibilities && (
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>My Role & Responsibilities</h3>
              <ul className={styles.responsibilitiesList}>
                {project.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </section>
          )}

          {project.challenges && (
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Challenges & Solutions</h3>
              <div className={styles.challengesList}>
                {project.challenges.map((challenge, index) => (
                  <div key={index} className={styles.challengeItem}>
                    <p>
                      <strong>Challenge:</strong> {challenge.problem}
                    </p>
                    <p className={styles.challengeSolution}>
                      <strong>Solution:</strong> {challenge.solution}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {project.duration && (
            <section className={`${styles.section} ${styles.timeline}`}>
              <h3 className={styles.sectionTitle}>Project Timeline</h3>
              <p><strong>Duration:</strong> {project.duration}</p>
              <p><strong>Status:</strong> {project.status}</p>
            </section>
          )}
        </>
      )}

      {project.technologies && (
        <section className={`${styles.section} ${styles.technologies}`}>
          <h3 className={styles.sectionTitle}>Technologies Used</h3>
          <div className={styles.techGrid}>
            {project.technologies.map((tech, index) => (
              <span 
                key={index}
                className={styles.techTag}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      )}

      {project.links && (
        <section className={styles.links}>
          <h3 className={styles.sectionTitle}>Links</h3>
          {project.links.github && (
            <p>
              <strong>GitHub:</strong>{' '}
              <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                View Repository
              </a>
            </p>
          )}
          {project.links.live && (
            <p>
              <strong>Live Demo:</strong>{' '}
              <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                View Live Site
              </a>
            </p>
          )}
        </section>
      )}
    </div>
  );
});

ProjectDetails.displayName = 'ProjectDetails';

export default ProjectDetails;
