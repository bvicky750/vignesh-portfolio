import React, { memo, useMemo, useState } from "react";
import { Code, ExternalLink, FolderKanban, ChevronDown } from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion";

// CRITICAL: Import the new modal component
import ExpandedProjectCard from "./ExpandedProjectCard";


// --- Animation Variants (UNCHANGED) ---
const containerVariants = { 
    hidden: { opacity: 0 }, 
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } } 
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};


// --- ProjectCard (Simplified to just show Title/Image and pass data to parent) ---
const ProjectCard = memo(({ project, onExpand }) => {
    return (
        <motion.div
            variants={itemVariants}
            className={`
                bg-white/90 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-700 
                rounded-2xl shadow p-6 flex flex-col h-full cursor-pointer 
                transition-shadow duration-300 hover:shadow-lg hover:border-primary-light dark:hover:border-primary
            `}
            onClick={() => onExpand(project)}
        >
            {/* 1. Project Image Container (TOP SECTION) */}
            <div className="flex-shrink-0 w-full h-40 rounded-lg overflow-hidden border border-neutral-300 dark:border-neutral-600 mb-4">
                <img 
                    src={project.image} 
                    alt={`${project.title} thumbnail`} 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                />
            </div>
            
            {/* 2. Title Section (BOTTOM SECTION) */}
            <div className="flex justify-between items-center pb-2">
                <h3 className="text-xl font-bold text-foreground leading-tight">
                    {project.title}
                </h3>
                {/* Use the icon to indicate it's clickable/expandable */}
                <ChevronDown className={`w-6 h-6 text-primary rotate-[-90deg]`} /> 
            </div>

            {/* Teaser: Show only the tags and links as a quick preview */}
            <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.slice(0, 3).map((tag, tagIndex) => ( // Showing only first 3 tags
                    <span
                        key={tagIndex}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-600"
                    >
                        {tag}
                    </span>
                ))}
            </div>
            <div className="text-sm text-primary mt-2">Click for Details</div>
        </motion.div>
    );
});
ProjectCard.displayName = "ProjectCard";


// --- Main Projects Component (MODIFIED to restore header) ---
function ProjectsComponent() {
    const [expandedProject, setExpandedProject] = useState(null);

    const projectsData = useMemo(
        () => [
            { 
                title: "Talent Track", 
                image: "/assets/tt.png",
                desc: "TalentTrack was my submission for the Smart India Hackathon (SIH), focusing on [Specify the problem/theme of the SIH project, e.g., streamlining student-industry connections, solving a civic issue]. The project involved rapidly prototyping a solution to a real-world problem, demonstrating strong skills in problem-solving, collaboration, and rapid development under time constraints.", 
                tags: ["html", "java script", "OOPS"], 
                links: [{ type: "code", href: "https://github.com/bvicky750/TalentTrack" }] 
            },
            { 
                title: "Sample E-Commerce Website", 
                image: "/assets/e-commerce.png",
                desc: "Developed a sample e-commerce platform to simulate core retail functionalities and demonstrate proficiency in both front-end and back-end development. This project focuses on implementing critical features necessary for an operational online store, emphasizing state management, data security, and efficient transaction processing.", 
                tags: ["html", "java script", "Mongo DB", "A*", "OOPS", "Data Structures"], 
                links: [{ type: "code", href: "https://github.com/bvicky750/sample-e-commerce-site" }] 
            },
            { 
                title: "Vignesh Portfolio", 
                image: "/assets/portfolio.png",
                desc: "Developed a responsive and modern personal portfolio website using the React framework. This platform serves as a central hub to showcase my technical skills, educational background, professional experience, and key projects. The goal was to create an engaging, highly performant, and user-friendly interface that adheres to clean design principles.", 
                tags: ["React", "Vite", "JavaScript", "Tailwind CSS", "Codeforces API"], 
                links: [ { type: "code", href: "https://github.com/bvicky750/vignesh-portfolio" }] 
            },
        ],
        []
    );

    return (
        <div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center w-full"
            >
                {/* 🚨 RESTORED HEADER TEXT BLOCK 🚨 */}
                <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
                    <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 flex items-center gap-4 text-foreground">
                        <FolderKanban className="w-8 h-8 sm:w-11 sm:h-11 text-primary drop-shadow-sm" />
                        Projects
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-center mb-10">
                        Here are some of the projects I've worked on, ranging from algorithm visualizers and utilities to frontend tools and machine learning models. Each project reflects my passion for clean design, efficient problem-solving, and practical implementation.
                    </p>
                </motion.div>

                {/* Project card grid */}
                <motion.div
                    variants={containerVariants}
                    className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {projectsData.map((project, index) => (
                        <ProjectCard 
                            key={index} 
                            project={project} 
                            onExpand={setExpandedProject} 
                        /> 
                    ))}
                </motion.div>
            </motion.div>

            <ExpandedProjectCard 
                project={expandedProject} 
                onClose={() => setExpandedProject(null)} 
            />
        </div>
    );
}

export default memo(ProjectsComponent);