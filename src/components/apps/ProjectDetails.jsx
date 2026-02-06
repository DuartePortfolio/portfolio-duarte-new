import React from 'react';

const ProjectDetails = ({ project }) => {
  if (!project) return null;

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

      <section style={{ marginBottom: '20px' }}>
        <h3 style={{ color: '#0053ee', fontSize: '13px', marginBottom: '8px' }}>Project Overview</h3>
        <p>{project.fullDescription}</p>
      </section>

      {project.sections ? (
        <>
          {project.sections.map((section, index) => (
            <section key={index} style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#0053ee', fontSize: '13px', marginBottom: '8px' }}>{section.title}</h3>
              <div style={{ whiteSpace: 'pre-line', lineHeight: '1.6' }}>{section.content}</div>
              
              {section.images && section.images.length > 0 && (
                <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {section.images.map((img, imgIndex) => (
                    <div key={imgIndex} style={{ marginBottom: '8px' }}>
                      {img.placeholder ? (
                        <div style={{ 
                          width: '100%', 
                          height: '180px',
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
                        <img 
                          src={img.src} 
                          alt={img.caption}
                          style={{ 
                            width: '100%', 
                            height: 'auto',
                            maxHeight: '200px',
                            objectFit: 'contain',
                            border: '1px solid #ccc',
                            marginBottom: '4px'
                          }}
                        />
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
                  ))}
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
