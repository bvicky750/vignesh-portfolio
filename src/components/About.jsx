// src/components/About.jsx (CORRECTED CODE)
import React from 'react';

const About = () => {
  return (
    <section id="about" className="section">
      <h2 className="section-title">✨ About Me</h2>
      <div className="about-content" style={{maxWidth: '800px', fontSize: '1.2rem'}}>
        
        {/* FIX APPLIED HERE: Using <strong> tags */}
        <p>
          Vignesh is a <strong>passionate Frontend Developer</strong> and <strong>AI/ML enthusiast</strong> who loves building smart, user-friendly applications. He enjoys solving problems through technology and constantly learning new tools and frameworks to improve his craft.
        </p>
        <p style={{marginTop: '20px'}}>
            Currently focusing on scalable <strong>React</strong> applications and exploring the potential of <strong>Machine Learning</strong> for innovative solutions.
        </p>
      </div>
    </section>
  );
};

export default About;