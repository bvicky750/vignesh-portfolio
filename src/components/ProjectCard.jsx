// src/components/ProjectCard.jsx
import React from 'react';

const ProjectCard = ({ title, description }) => {
  return (
    <div className="project-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="project-links">
        <a href="#placeholder" className="styled-button">GitHub</a>
        <a href="#placeholder" className="styled-button">Live Demo</a>
      </div>
    </div>
  );
};

export default ProjectCard;