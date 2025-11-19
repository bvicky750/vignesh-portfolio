// src/components/Projects.jsx
import React from 'react';
import ProjectCard from './ProjectCard';

const projectData = [
  {
    title: 'TalentTrack',
    description: 'An AI-powered mobile solution that democratizes sports talent assessment through video-based performance analysis and evaluation.',
  },
  {
    title: 'ShopZone',
    description: 'A minimalist model e-commerce website built to demonstrate product listing, UI flow, and shopping interface.',
  },
];

const Projects = () => {
  return (
    <div className="projects-grid">
      {projectData.map((project, index) => (
        <ProjectCard
          key={index}
          title={project.title}
          description={project.description}
        />
      ))}
    </div>
  );
};

export default Projects;