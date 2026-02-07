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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setTimeout(() => setStatus(''), 3000);
      return;
    }

    setIsSubmitting(true);
    setStatus('sending');

    try {
      // EmailJS Configuration - Set these in your .env file:
      // REACT_APP_EMAILJS_SERVICE_ID=your_service_id
      // REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
      // REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
      
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';
      
      if (serviceId === 'YOUR_SERVICE_ID' || templateId === 'YOUR_TEMPLATE_ID' || publicKey === 'YOUR_PUBLIC_KEY') {
        console.warn('EmailJS not configured. Please set up environment variables.');
        setStatus('error');
        setIsSubmitting(false);
        setTimeout(() => setStatus(''), 5000);
        return;
      }

      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Duarte',
        },
        publicKey
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Contact Me</h2>
      <p>Feel free to reach out! I'd love to hear from you.</p>
      
      <form onSubmit={handleSubmit} className={styles.form} aria-label="Contact form">
        <div className={styles.formGroup}>
          <label htmlFor="contact-name" className={styles.label}>
            Name:
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            aria-required="true"
            className={styles.input}
            placeholder="Your name"
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="contact-email" className={styles.label}>
            Email:
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            aria-required="true"
            className={styles.input}
            placeholder="your.email@example.com"
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="contact-message" className={styles.label}>
            Message:
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            aria-required="true"
            rows={5}
            className={styles.textarea}
            placeholder="Your message here..."
          />
        </div>
        
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
          aria-label={isSubmitting ? 'Sending message' : 'Send message'}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
      
      {status === 'success' && (
        <div className={styles.statusMessage} style={{ color: '#008000', marginTop: '10px' }} role="alert" aria-live="polite">
          ✓ Message sent successfully! I'll get back to you soon.
        </div>
      )}
      {status === 'error' && (
        <div className={styles.statusMessage} style={{ color: '#cc0000', marginTop: '10px' }} role="alert" aria-live="polite">
          ✗ Failed to send message. Please try again or contact me directly via email.
        </div>
      )}
      
      <div className={styles.contactInfo}>
        <p><strong>Email:</strong> <a href="mailto:duarte.ofernandes@gmail.com">duarte.ofernandes@gmail.com</a></p>
        <p><strong>Phone:</strong> <a href="tel:+351917213850">(+351) 917 213 850</a></p>
        <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/duartefernandes-/" target="_blank" rel="noopener noreferrer">linkedin.com/in/duartefernandes-/</a></p>
        <p><strong>GitHub:</strong> <a href="https://github.com/DuartePortfolio" target="_blank" rel="noopener noreferrer">github.com/DuartePortfolio</a></p>
        <p><strong>Location:</strong> Porto, Portugal</p>
      </div>
    </div>
  );
});

Contact.displayName = 'Contact';

export default Contact;
