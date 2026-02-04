import React from 'react';

const AboutMe = () => {
  return (
    <div style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '12px' }}>
      <h2 style={{ color: '#0053ee', marginTop: 0 }}>About Me</h2>
      <p>
        Hello! I'm <strong>Duarte Fernandes</strong>, a web developer passionate about creating innovative digital solutions.
      </p>
      <p>
        I specialize in full-stack development with a focus on modern web technologies, 
        building responsive and user-friendly applications.
      </p>
      <h3 style={{ color: '#0053ee' }}>Skills</h3>
      <ul>
        <li>JavaScript & TypeScript</li>
        <li>React & Next.js</li>
        <li>Node.js & Express</li>
        <li>HTML5 & CSS3</li>
        <li>MongoDB & MySQL</li>
        <li>RESTful APIs</li>
        <li>Git & Version Control</li>
      </ul>
      <h3 style={{ color: '#0053ee' }}>Education</h3>
      <p>
        <strong>ESMAD - Escola Superior de Media Artes e Design</strong><br />
        Web Development & Multimedia Design
      </p>
    </div>
  );
};

export default AboutMe;
