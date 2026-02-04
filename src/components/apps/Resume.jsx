import React from 'react';

const Resume = () => {
  return (
    <div style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '12px' }}>
      <h2 style={{ color: '#0053ee', marginTop: 0 }}>Resume / CV</h2>
      
      <section style={{ marginBottom: '20px' }}>
        <h3 style={{ color: '#0053ee', fontSize: '13px' }}>Duarte Fernandes</h3>
        <p style={{ margin: '4px 0', fontSize: '11px', color: '#666' }}>
          Full Stack Developer | Web Designer
        </p>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h3 style={{ color: '#0053ee', fontSize: '13px', borderBottom: '2px solid #0053ee', paddingBottom: '4px' }}>
          Education
        </h3>
        <div style={{ marginTop: '8px' }}>
          <p style={{ margin: '4px 0', fontWeight: 'bold' }}>Bachelor in Computer Science</p>
          <p style={{ margin: '4px 0', fontSize: '11px', color: '#666' }}>
            University Name • 2019 - 2023
          </p>
        </div>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h3 style={{ color: '#0053ee', fontSize: '13px', borderBottom: '2px solid #0053ee', paddingBottom: '4px' }}>
          Experience
        </h3>
        <div style={{ marginTop: '8px', marginBottom: '12px' }}>
          <p style={{ margin: '4px 0', fontWeight: 'bold' }}>Front-End Developer</p>
          <p style={{ margin: '4px 0', fontSize: '11px', color: '#666' }}>
            Tech Company • 2023 - Present
          </p>
          <ul style={{ marginTop: '4px', paddingLeft: '20px', fontSize: '11px' }}>
            <li>Built responsive web applications using React</li>
            <li>Collaborated with design team on UI/UX</li>
            <li>Optimized application performance</li>
          </ul>
        </div>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h3 style={{ color: '#0053ee', fontSize: '13px', borderBottom: '2px solid #0053ee', paddingBottom: '4px' }}>
          Technical Skills
        </h3>
        <div style={{ marginTop: '8px' }}>
          <p style={{ margin: '4px 0' }}>
            <strong>Languages:</strong> JavaScript, HTML, CSS, Python, SQL
          </p>
          <p style={{ margin: '4px 0' }}>
            <strong>Frameworks:</strong> React, Node.js, Express
          </p>
          <p style={{ margin: '4px 0' }}>
            <strong>Tools:</strong> Git, VS Code, Figma, Webpack
          </p>
        </div>
      </section>

      <button
        style={{
          padding: '6px 20px',
          background: '#ece9d8',
          border: '1px solid',
          borderColor: '#fff #000 #000 #fff',
          fontFamily: 'Tahoma, sans-serif',
          fontSize: '11px',
          cursor: 'pointer',
          marginTop: '10px'
        }}
        onClick={() => alert('Download feature - Coming soon!')}
      >
        📥 Download PDF
      </button>
    </div>
  );
};

export default Resume;
