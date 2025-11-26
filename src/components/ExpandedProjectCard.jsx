// src/components/ExpandedProjectCard.jsx

import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code, ExternalLink } from 'lucide-react';

const ExpandedProjectCard = memo(({ project, onClose }) => {
    if (!project) return null; // Don't render if no project is selected

    return (
        <AnimatePresence>
            {project && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-black/70 z-[1000] flex items-center justify-center p-4"
                    onClick={onClose} // Close when clicking the overlay
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 50 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="bg-white/95 dark:bg-neutral-900/95 border border-neutral-200 dark:border-neutral-700 
                                   rounded-2xl shadow-2xl relative w-full max-w-3xl max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the card
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 
                                       text-foreground hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                            aria-label="Close project details"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Image at the top */}
                        {project.image && (
                            <img 
                                src={project.image} 
                                alt={`${project.title} screenshot`} 
                                className="w-full h-auto max-h-64 object-cover rounded-t-2xl mb-4" 
                            />
                        )}

                        <div className="p-6 pt-0"> {/* Adjusted padding */}
                            {/* Title */}
                            <h3 className="text-3xl font-bold text-foreground mb-4">
                                {project.title}
                            </h3>

                            {/* Description */}
                            <p className="text-lg text-muted-foreground mb-6">
                                {project.desc}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tags.map((tag, tagIndex) => (
                                    <span
                                        key={tagIndex}
                                        className="px-3 py-1 rounded-full text-sm font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-600"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Links */}
                            <div className="flex gap-6 flex-wrap">
                                {project.links.map((link, linkIndex) => (
                                    <a
                                        key={linkIndex}
                                        href={link.href}
                                        className="flex items-center gap-2 text-primary font-semibold text-base hover:underline hover:text-foreground dark:hover:text-primary-foreground/60 transition-colors duration-200"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {link.type === "code" ? (
                                            <Code className="w-5 h-5" />
                                        ) : (
                                            <ExternalLink className="w-5 h-5" />
                                        )}
                                        {link.type === "code" ? "Code" : "Demo"}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
});

ExpandedProjectCard.displayName = "ExpandedProjectCard";
export default ExpandedProjectCard;