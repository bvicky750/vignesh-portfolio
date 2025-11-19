// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="logo">
        Vignesh B<span style={{color: 'var(--color-primary)'}}>.</span>
      </Link>
      <nav style={{display: 'flex', gap: '25px'}}>
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
        {/* Uses a fragment link to jump to the contact section on the home page */}
        <a href="/#contact">Contact</a> 
      </nav>
    </header>
  );
};

export default Header;