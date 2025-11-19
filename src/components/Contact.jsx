// src/components/Contact.jsx (Updated)
import React from 'react';
import { FaEnvelope, FaLinkedin } from 'react-icons/fa'; 

const Contact = () => {
  return (
    <section id="contact" className="section">
      <h2 className="section-title">✉️ Get in Touch</h2>
      <div className="contact-content" style={{display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '1.2rem'}}>
        <div className="contact-item" style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
          {/* UPDATED COLOR */}
          <FaEnvelope style={{color: 'var(--color-secondary)', fontSize: '1.5rem'}} />
          <a href="mailto:bevicky750@gmail.com">bevicky750@gmail.com</a>
        </div>
        <div className="contact-item" style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
          {/* UPDATED COLOR */}
          <FaLinkedin style={{color: 'var(--color-secondary)', fontSize: '1.5rem'}} />
          <a href="https://www.linkedin.com/in/vignesh-b-b1a52b329" target="_blank" rel="noopener noreferrer">
            LinkedIn Profile
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;