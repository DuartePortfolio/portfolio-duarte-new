import React, { useState, memo } from 'react';
import emailjs from '@emailjs/browser';
import styles from './Contact.module.css';

const Contact = memo(() => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('sending');

    try {
      // Replace these with your EmailJS credentials
      // Get them from: https://www.emailjs.com/
      const result = await emailjs.send(
        'YOUR_SERVICE_ID',     // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID',    // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Duarte',
        },
        'YOUR_PUBLIC_KEY'      // Replace with your EmailJS public key
      );

      if (result.text === 'OK') {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 5000);
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      setTimeout(() => setStatus(''), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Contact Me</h2>
      <p>Feel free to reach out! I'd love to hear from you.</p>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Message:
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            className={styles.textarea}
          />
        </div>
        
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
      
      {status === 'success' && (
        <div className={styles.statusMessage} style={{ color: '#008000', marginTop: '10px' }}>
          ✓ Message sent successfully! I'll get back to you soon.
        </div>
      )}
      {status === 'error' && (
        <div className={styles.statusMessage} style={{ color: '#cc0000', marginTop: '10px' }}>
          ✗ Failed to send message. Please try again or contact me directly via email.
        </div>
      )}
      
      <div className={styles.contactInfo}>
        <p><strong>Email:</strong> duarte.fernandes@example.com</p>
        <p><strong>LinkedIn:</strong> linkedin.com/in/duartefernandes</p>
        <p><strong>GitHub:</strong> github.com/duartefernandes</p>
        <p><strong>Location:</strong> Porto, Portugal</p>
      </div>
    </div>
  );
});

Contact.displayName = 'Contact';

export default Contact;
