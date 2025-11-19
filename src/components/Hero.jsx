// src/components/Hero.jsx (Updated)
import React from 'react';
import profilePic from '../assets/profile.jpg'; 

const Hero = () => {
  return (
    <section id="hero" className="section">
      <div className="hero-content">
        <img
          src={profilePic}
          alt="Vignesh B - Frontend Developer and AI/ML Enthusiast"
          className="profile-photo"
        />
        <h1>
          Hello, I'm 
          <strong style={{color: 'var(--color-light)'}}>Vignesh B</strong>
        </h1>
        {/* UPDATED SHADOW COLOR */}
        <h2 style={{color: 'var(--color-secondary)', textShadow: '0 0 5px rgba(0, 188, 212, 0.5)'}}>
            Frontend Developer • AI/ML Enthusiast
        </h2>
        <a href="/projects" className="styled-button">
          VIEW MY WORK
        </a>
      </div>
    </section>
  );
};

export default Hero;