// src/components/Footer.jsx
import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-links">
        <a href="https://www.linkedin.com/in/vignesh-b-b1a52b329" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedin />
        </a>
        <a href="#github-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FaGithub />
        </a>
        <a href="mailto:bevicky750@gmail.com" aria-label="Email">
          <FaEnvelope />
        </a>
      </div>
      <p style={{marginTop: '15px', fontSize: '0.9rem'}}>
        &copy; {new Date().getFullYear()} Vignesh B. Crafted with React & Forest Green Hues.
      </p>
    </footer>
  );
};

export default Footer;