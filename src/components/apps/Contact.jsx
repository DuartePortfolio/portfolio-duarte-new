import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent! (This is a demo - no actual email is sent)');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '12px' }}>
      <h2 style={{ color: '#0053ee', marginTop: 0 }}>Contact Me</h2>
      <p>Feel free to reach out! I'd love to hear from you.</p>
      
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '4px',
              border: '1px solid #7f9db9',
              fontFamily: 'Tahoma, sans-serif',
              fontSize: '11px'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '4px',
              border: '1px solid #7f9db9',
              fontFamily: 'Tahoma, sans-serif',
              fontSize: '11px'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            Message:
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            style={{
              width: '100%',
              padding: '4px',
              border: '1px solid #7f9db9',
              fontFamily: 'Tahoma, sans-serif',
              fontSize: '11px',
              resize: 'vertical'
            }}
          />
        </div>
        
        <button
          type="submit"
          style={{
            padding: '6px 20px',
            background: '#ece9d8',
            border: '1px solid',
            borderColor: '#fff #000 #000 #fff',
            fontFamily: 'Tahoma, sans-serif',
            fontSize: '11px',
            cursor: 'pointer'
          }}
        >
          Send Message
        </button>
      </form>
      
      <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #ccc' }}>
        <p><strong>Email:</strong> duarte.fernandes@example.com</p>
        <p><strong>LinkedIn:</strong> linkedin.com/in/duartefernandes</p>
        <p><strong>GitHub:</strong> github.com/duartefernandes</p>
        <p><strong>Location:</strong> Porto, Portugal</p>
      </div>
    </div>
  );
};

export default Contact;
