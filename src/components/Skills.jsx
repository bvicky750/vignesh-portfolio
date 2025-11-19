// src/components/Skills.jsx
import React from 'react';

const Skills = () => {
  const skillsList = ['Java', 'Python', 'C', 'HTML', 'CSS', 'JavaScript', 'React', 'Git'];

  return (
    <section id="skills" className="section">
      <h2 className="section-title"> Skills</h2>
      <div className="skills-grid">
        {skillsList.map((skill, index) => (
          <div className="skill-item" key={index} style={{animationDelay: `${index * 0.1}s`}}>
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;