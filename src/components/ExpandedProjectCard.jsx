// src/components/ExpandedProjectCard.jsx

import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code, ExternalLink } from 'lucide-react';

const ExpandedProjectCard = memo(({ project, onClose }) => {
    if (!project) return null;

    return (
        <AnimatePresence>
            {project && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-black/70 backdrop-blur-md z-[1000] flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 40 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        onClick={(e) => e.stopPropagation()}
                        className="
                            relative w-full max-w-[1100px] max-h-[90vh] overflow-y-auto
                            rounded-3xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl 
                            border border-neutral-300/20 dark:border-neutral-700/20
                        "
                    >

                        {/* ⭐ BIGGER + BRIGHTER RGB AURA BORDER */}
                        <motion.div
                            animate={{ backgroundPosition: "300% 0%" }}
                            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                            className="
                                absolute inset-0 rounded-3xl p-[6px]
                                bg-[length:300%_300%]
                                bg-gradient-to-r 
                                from-pink-500 via-purple-500 via-blue-500 
                                via-cyan-400 via-green-400 via-yellow-400 
                                to-pink-500
                                pointer-events-none
                                z-[-1]
                            "
                            style={{
                                mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                                WebkitMask:
                                    "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                                maskComposite: "exclude",
                                WebkitMaskComposite: "xor",

                                // ⭐ Very bright wide aura (Spider-Verse style)
                                filter: `
                                    drop-shadow(0 0 45px rgba(255, 0, 255, 0.70))
                                    drop-shadow(0 0 70px rgba(0, 180, 255, 0.65))
                                    drop-shadow(0 0 100px rgba(0, 255, 150, 0.55))
                                `
                            }}
                        />

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="
                                absolute top-4 right-4 p-2 rounded-full 
                                bg-neutral-200/70 dark:bg-neutral-800/70 
                                text-neutral-700 dark:text-neutral-200
                                hover:bg-neutral-300 dark:hover:bg-neutral-700
                                transition-all
                            "
                            aria-label="Close project details"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* ⭐ IMAGE — WITH SPACING so it NEVER touches border */}
                        {project.image && (
                            <div className="px-4 pt-4">
                                <img
                                    src={project.image}
                                    alt={`${project.title} screenshot`}
                                    className="w-full h-auto max-h-64 object-cover rounded-2xl"
                                />
                            </div>
                        )}

                        {/* Content */}
                        <div className="p-6 pt-2">
                            {/* Title */}
                            <h3 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-white">
                                {project.title}
                            </h3>

                            {/* Description */}
                            <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6">
                                {project.desc}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tags.map((tag, tagIndex) => (
                                    <span
                                        key={tagIndex}
                                        className="
                                            px-3 py-1 rounded-full text-sm font-medium
                                            bg-neutral-200 dark:bg-neutral-800
                                            text-neutral-800 dark:text-neutral-200
                                            border border-neutral-300 dark:border-neutral-600
                                        "
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
                                        className="
                                            flex items-center gap-2 text-cyan-500 
                                            hover:text-cyan-300 transition-all text-base font-semibold
                                        "
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
