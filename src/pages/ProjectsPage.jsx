// src/pages/ProjectsPage.jsx
import React from 'react';
import Projects from '../components/Projects'; 

const ProjectsPage = () => {
  return (
    <section id="projects-page" className="section" style={{minHeight: '80vh'}}>
      <h1 className="section-title">💻 Projects Showcase</h1>
      <Projects />
    </section>
  );
};

export default ProjectsPage;