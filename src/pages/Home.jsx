// src/pages/Home.jsx
import React from 'react';
import Hero from '../components/Hero'; 
import About from '../components/About';
import Skills from '../components/Skills';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Contact />
    </>
  );
};

export default Home;