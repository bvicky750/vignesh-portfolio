import React, { memo, useMemo, useState } from "react";
import { Code, ExternalLink, FolderKanban, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// NEW: Spider-Verse Page Title Component
import PageTitle from "../components/PageTitle";

// ⭐ NEW: PAGE TRANSITION WRAPPER ⭐
import PageTransition from "../components/PageTransition";

import ExpandedProjectCard from "./ExpandedProjectCard";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// --- Project Card ---
const ProjectCard = memo(({ project, onExpand }) => {
    return (
        <motion.div
            variants={itemVariants}
            className="
                bg-white/90 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-700 
                rounded-2xl shadow p-6 flex flex-col h-full cursor-pointer 
                transition-shadow duration-300 hover:shadow-lg hover:border-primary-light dark:hover:border-primary
            "
            onClick={() => onExpand(project)}
        >
            {/* Image */}
            <div className="flex-shrink-0 w-full h-40 rounded-lg overflow-hidden border border-neutral-300 dark:border-neutral-600 mb-4">
                <img 
                    src={project.image} 
                    alt={`${project.title} thumbnail`} 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                />
            </div>
            
            {/* Title */}
            <div className="flex justify-between items-center pb-2">
                <h3 className="text-xl font-bold text-foreground leading-tight">
                    {project.title}
                </h3>
                <ChevronDown className="w-6 h-6 text-primary rotate-[-90deg]" /> 
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                        key={tagIndex}
                        className="
                            px-3 py-1 rounded-full text-xs font-medium 
                            bg-neutral-100 dark:bg-neutral-800 
                            text-neutral-800 dark:text-neutral-200 
                            border border-neutral-300 dark:border-neutral-600
                        "
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

// --- Main Projects Component ---
function ProjectsComponent() {
    const [expandedProject, setExpandedProject] = useState(null);

    const projectsData = useMemo(
        () => [
            { 
                title: "Talent Track", 
                image: "/assets/tt.png",
                desc: "TalentTrack was my submission for the Smart India Hackathon (SIH)...", 
                tags: ["html", "java script", "OOPS"], 
                links: [{ type: "code", href: "https://github.com/bvicky750/TalentTrack" }] 
            },
            { 
                title: "Sample E-Commerce Website", 
                image: "/assets/e-commerce.png",
                desc: "Developed a sample e-commerce platform...", 
                tags: ["html", "java script", "Mongo DB", "A*", "OOPS", "Data Structures"], 
                links: [{ type: "code", href: "https://github.com/bvicky750/sample-e-commerce-site" }] 
            },
            { 
                title: "Vignesh Portfolio", 
                image: "/assets/portfolio.png",
                desc: "Developed a responsive and modern personal portfolio website...", 
                tags: ["React", "Vite", "JavaScript", "Tailwind CSS", "Codeforces API"], 
                links: [ { type: "code", href: "https://github.com/bvicky750/vignesh-portfolio" }] 
            },
        ],
        []
    );

    return (
        <PageTransition>
            <div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center w-full"
                >

                    {/* ⭐ Spider-Verse Page Title ⭐ */}
                    <motion.div variants={itemVariants} className="flex flex-col items-center text-center mb-10">
                        <div className="flex items-center gap-4 mb-3">
                            <FolderKanban className="w-10 h-10 sm:w-12 sm:h-12 text-primary drop-shadow-lg" />
                            <PageTitle>Projects</PageTitle>
                        </div>

                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Here are some of the projects I’ve worked on — combining clean UI, 
                            efficient algorithms, and practical implementation.
                        </p>
                    </motion.div>

                    {/* Project Cards Grid */}
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

                {/* Expanded Modal */}
                <ExpandedProjectCard 
                    project={expandedProject} 
                    onClose={() => setExpandedProject(null)} 
                />
            </div>
        </PageTransition>
    );
}

export default memo(ProjectsComponent);
