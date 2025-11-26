import React, { memo, useMemo, useState } from "react";
import { Code, ExternalLink, FolderKanban, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Spider-Verse Page Title
import PageTitle from "../components/PageTitle";

// Page Transition Wrapper
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

// --- Spider-Verse Project Card ---
const ProjectCard = memo(({ project, onExpand }) => {
    return (
        <motion.div
            variants={itemVariants}
            onClick={() => onExpand(project)}
            className="
                p-[2px] rounded-xl 
                bg-gradient-to-br from-pink-500 to-cyan-400
                -skew-x-3 hover:skew-x-0
                transition-all duration-300
                shadow-[6px_6px_0px_#00eaff]
                cursor-pointer
            "
        >
            {/* INNER HOLOGRAPHIC BOX */}
            <div
                className="
                    rounded-xl p-5 h-full flex flex-col
                    bg-gradient-to-br from-[#101010] via-[#181818] to-[#0b0b0b]
                    border border-white/5 shadow-inner
                "
            >
                {/* Image */}
                <div
                    className="
                        flex-shrink-0 w-full h-40 rounded-lg overflow-hidden mb-4
                        border border-white/10 bg-black/30
                        shadow-[0_0_10px_rgba(0,255,255,0.3)]
                    "
                >
                    <img
                        src={project.image}
                        alt={`${project.title} thumbnail`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>

                {/* Title */}
                <div className="flex justify-between items-center">
                    <h3
                        className="
                            text-xl font-bold text-white
                            drop-shadow-[2px_2px_0px_#ff00ff]
                            tracking-wide
                        "
                    >
                        {project.title}
                    </h3>
                    <ChevronDown className="w-6 h-6 text-cyan-400 rotate-[-90deg]" />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                            key={tagIndex}
                            className="
                                px-3 py-1 rounded-full text-xs font-medium
                                bg-black/40 text-white
                                border border-white/20
                                shadow-[0_0_8px_rgba(255,0,255,0.4)]
                                hover:shadow-[0_0_10px_rgba(0,255,255,0.6)]
                                transition-all
                            "
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Footer */}
                <div className="text-sm text-cyan-300 mt-3">
                    Click for Details
                </div>
            </div>
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
                tags: ["HTML", "JavaScript", "OOPS"],
                links: [{ type: "code", href: "https://github.com/bvicky750/TalentTrack" }]
            },
            {
                title: "Sample E-Commerce Website",
                image: "/assets/e-commerce.png",
                desc: "Developed a sample e-commerce platform...",
                tags: ["HTML", "JavaScript", "MongoDB", "A*", "OOPS", "Data Structures"],
                links: [{ type: "code", href: "https://github.com/bvicky750/sample-e-commerce-site" }]
            },
            {
                title: "Vignesh Portfolio",
                image: "/assets/portfolio.png",
                desc: "Developed a responsive and modern personal portfolio website...",
                tags: ["React", "Vite", "JavaScript", "Tailwind CSS", "Codeforces API"],
                links: [{ type: "code", href: "https://github.com/bvicky750/vignesh-portfolio" }]
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

                    {/* Title */}
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

                    {/* Project Cards */}
                    <motion.div
                        variants={containerVariants}
                        className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
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
