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
        <h3 style={{ color: '#0053ee', fontSize: '13px', marginBottom: '8px' }}>Overview</h3>
        <p>{project.fullDescription}</p>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h3 style={{ color: '#0053ee', fontSize: '13px', marginBottom: '8px' }}>Key Features</h3>
        <ul>
          {project.features.map((feature, index) => (
            <li key={index} style={{ marginBottom: '4px' }}>{feature}</li>
          ))}
        </ul>
      </section>

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

      <section style={{ marginBottom: '20px' }}>
        <h3 style={{ color: '#0053ee', fontSize: '13px', marginBottom: '8px' }}>My Role & Responsibilities</h3>
        <ul>
          {project.responsibilities.map((resp, index) => (
            <li key={index} style={{ marginBottom: '4px' }}>{resp}</li>
          ))}
        </ul>
      </section>

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

      <section style={{ marginBottom: '20px' }}>
        <h3 style={{ color: '#0053ee', fontSize: '13px', marginBottom: '8px' }}>Project Timeline</h3>
        <p><strong>Duration:</strong> {project.duration}</p>
        <p><strong>Status:</strong> {project.status}</p>
      </section>

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
