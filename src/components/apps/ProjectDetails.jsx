import React, { useState } from 'react';

const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;
  if (images.length === 1) {
    const img = images[0];
    return (
      <div style={{ marginBottom: '8px' }}>
        {img.placeholder ? (
          <div style={{ 
            width: 'calc(100% - 16px)', 
            height: '400px',
            margin: '0 8px',
            background: '#f0f0f0',
            border: '2px dashed #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '4px'
          }}>
            <span style={{ color: '#999', fontSize: '11px', textAlign: 'center', padding: '10px' }}>
              Image Placeholder
            </span>
          </div>
        ) : (
          <div style={{ position: 'relative' }}>
            <img 
              src={img.src} 
              alt={img.caption}
              onClick={() => window.open(img.src, '_blank')}
              style={{ 
                width: 'calc(100% - 16px)',
                margin: '0 8px',
                height: 'auto',
                objectFit: 'contain',
                border: '1px solid #ccc',
                marginBottom: '4px',
                cursor: 'pointer'
              }}
              title="Click to view full size"
            />
            <div style={{
              position: 'absolute',
              top: '4px',
              right: '12px',
              background: 'rgba(236, 233, 216, 0.9)',
              border: '1px solid #0053ee',
              padding: '2px 6px',
              fontSize: '9px',
              color: '#0053ee',
              pointerEvents: 'none'
            }}>
              🔍 Click to enlarge
            </div>
          </div>
        )}
        <div style={{ 
          fontSize: '10px', 
          color: '#666', 
          fontStyle: 'italic',
          textAlign: 'center',
          padding: '4px'
        }}>
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

  const arrowButtonStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '32px',
    height: '32px',
    background: 'rgba(236, 233, 216, 0.85)',
    border: '2px outset #dfdfdf',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#000',
    userSelect: 'none',
    zIndex: 10
  };

  return (
    <div style={{ marginBottom: '8px' }}>
      <div style={{ position: 'relative', marginBottom: '4px', padding: '0 8px' }}>
        {currentImage.placeholder ? (
          <div style={{ 
            width: '100%', 
            height: '400px',
            background: '#f0f0f0',
            border: '2px dashed #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ color: '#999', fontSize: '11px', textAlign: 'center', padding: '10px' }}>
              Image Placeholder
            </span>
          </div>
        ) : (
          <>
            <img 
              src={currentImage.src} 
              alt={currentImage.caption}
              onClick={() => window.open(currentImage.src, '_blank')}
              style={{ 
                width: '100%', 
                height: 'auto',
                objectFit: 'contain',
                border: '1px solid #ccc',
                cursor: 'pointer'
              }}
              title="Click to view full size"
            />
            <div style={{
              position: 'absolute',
              top: '4px',
              right: '12px',
              background: 'rgba(236, 233, 216, 0.9)',
              border: '1px solid #0053ee',
              padding: '2px 6px',
              fontSize: '9px',
              color: '#0053ee',
              pointerEvents: 'none'
            }}>
              🔍 Click to enlarge
            </div>
          </>
        )}
        
        <button
          onClick={handlePrevious}
          style={{ ...arrowButtonStyle, left: '8px' }}
          onMouseDown={(e) => e.currentTarget.style.border = '2px inset #dfdfdf'}
          onMouseUp={(e) => e.currentTarget.style.border = '2px outset #dfdfdf'}
          onMouseLeave={(e) => e.currentTarget.style.border = '2px outset #dfdfdf'}
        >
          ◄
        </button>
        
        <button
          onClick={handleNext}
          style={{ ...arrowButtonStyle, right: '8px' }}
          onMouseDown={(e) => e.currentTarget.style.border = '2px inset #dfdfdf'}
          onMouseUp={(e) => e.currentTarget.style.border = '2px outset #dfdfdf'}
          onMouseLeave={(e) => e.currentTarget.style.border = '2px outset #dfdfdf'}
        >
          ►
        </button>
      </div>
      
      <div style={{ 
        fontSize: '10px', 
        color: '#666', 
        fontStyle: 'italic',
        textAlign: 'center',
        padding: '4px'
      }}>
        {currentImage.caption} ({currentIndex + 1} / {images.length})
      </div>
    </div>
  );
};

const highlightText = (text) => {
  const keywords = [
    'microservices', 'API gateway', 'Docker Compose', 'GraphQL',
    'REST', 'JWT', 'NGINX', 'MySQL', 'MongoDB'
  ];
  
  const regex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, i) => {
    if (keywords.some(keyword => keyword.toLowerCase() === part.toLowerCase())) {
      return <span key={i} style={{ textDecoration: 'underline', fontWeight: '600' }}>{part}</span>;
    }
    return part;
  });
};

const ProjectDetails = ({ project }) => {
  if (!project) return null;

  const scrollToSection = (index) => {
    const element = document.getElementById(`section-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '12px' }}>
      <h2 style={{ color: '#0053ee', marginTop: 0 }}>{project.title}</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <img 
          src={project.image} 
          alt={project.title}
          style={{ 
            width: '100%', 
            height: '200px', 
            objectFit: 'cover',
            border: '1px solid #ccc',
            marginBottom: '10px'
          }}
        />
      </div>

      {project.sections && (
        <section style={{ 
          marginBottom: '20px', 
          padding: '12px',
          background: '#f0f0f0',
          border: '1px solid #ccc'
        }}>
          <h3 style={{ color: '#0053ee', fontSize: '13px', marginTop: 0, marginBottom: '8px' }}>Table of Contents</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {project.sections.map((section, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(index)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#0053ee',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  fontSize: '11px',
                  padding: '2px 4px',
                  textAlign: 'left',
                  fontFamily: 'inherit'
                }}
                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
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
              style={{ marginBottom: '20px', scrollMarginTop: '10px' }}
            >
              <h3 style={{ color: '#0053ee', fontSize: '13px', marginBottom: '8px' }}>{section.title}</h3>
              <div style={{ whiteSpace: 'pre-line', lineHeight: '1.6' }}>{highlightText(section.content)}</div>
              
              {section.images && section.images.length > 0 && (
                <div style={{ marginTop: '12px' }}>
                  <ImageGallery images={section.images} />
                </div>
              )}
            </section>
          ))}
        </>
      ) : (
        <>
          {project.features && (
            <section style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#0053ee', fontSize: '13px', marginBottom: '8px' }}>Key Features</h3>
              <ul>
                {project.features.map((feature, index) => (
                  <li key={index} style={{ marginBottom: '4px' }}>{feature}</li>
                ))}
              </ul>
            </section>
          )}

          {project.responsibilities && (
            <section style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#0053ee', fontSize: '13px', marginBottom: '8px' }}>My Role & Responsibilities</h3>
              <ul>
                {project.responsibilities.map((resp, index) => (
                  <li key={index} style={{ marginBottom: '4px' }}>{resp}</li>
                ))}
              </ul>
            </section>
          )}

          {project.challenges && (
            <section style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#0053ee', fontSize: '13px', marginBottom: '8px' }}>Challenges & Solutions</h3>
              {project.challenges.map((challenge, index) => (
                <div key={index} style={{ marginBottom: '12px' }}>
                  <p style={{ margin: '0 0 4px 0' }}>
                    <strong>Challenge:</strong> {challenge.problem}
                  </p>
                  <p style={{ margin: 0, paddingLeft: '16px' }}>
                    <strong>Solution:</strong> {challenge.solution}
                  </p>
                </div>
              ))}
            </section>
          )}

          {project.duration && (
            <section style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#0053ee', fontSize: '13px', marginBottom: '8px' }}>Project Timeline</h3>
              <p><strong>Duration:</strong> {project.duration}</p>
              <p><strong>Status:</strong> {project.status}</p>
            </section>
          )}
        </>
      )}

      {project.technologies && (
        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#0053ee', fontSize: '13px', marginBottom: '8px' }}>Technologies Used</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {project.technologies.map((tech, index) => (
              <span 
                key={index}
                style={{
                  padding: '4px 8px',
                  background: '#e8eef7',
                  border: '1px solid #0053ee',
                  borderRadius: '3px',
                  fontSize: '11px',
                  color: '#0053ee'
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      )}

      {project.links && (
        <section>
          <h3 style={{ color: '#0053ee', fontSize: '13px', marginBottom: '8px' }}>Links</h3>
          {project.links.github && (
            <p>
              <strong>GitHub:</strong>{' '}
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" style={{ color: '#0053ee' }}>
                View Repository
              </a>
            </p>
          )}
          {project.links.live && (
            <p>
              <strong>Live Demo:</strong>{' '}
              <a href={project.links.live} target="_blank" rel="noopener noreferrer" style={{ color: '#0053ee' }}>
                View Live Site
              </a>
            </p>
          )}
        </section>
      )}
    </div>
  );
};

export default ProjectDetails;
