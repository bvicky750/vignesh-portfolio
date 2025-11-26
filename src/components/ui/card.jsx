// --- Project Card (Improved) ---
const ProjectCard = memo(({ project, onExpand }) => {
    return (
        <motion.div
            variants={itemVariants}
            onClick={() => onExpand(project)}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="
                group cursor-pointer rounded-2xl overflow-hidden
                border border-neutral-300 dark:border-neutral-700
                bg-white/60 dark:bg-neutral-900/70 backdrop-blur-xl
                shadow-md hover:shadow-xl
                transition-all duration-300
            "
        >
            {/* Image */}
            <div className="relative w-full h-44 overflow-hidden">
                <img
                    src={project.image}
                    alt={`${project.title} thumbnail`}
                    loading="lazy"
                    className="
                        w-full h-full object-cover 
                        transition-transform duration-500 
                        group-hover:scale-110
                    "
                />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col h-full">
                {/* Title */}
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-foreground leading-tight">
                        {project.title}
                    </h3>

                    {/* Arrow */}
                    <ChevronDown
                        className="
                            w-5 h-5 text-primary transition-transform 
                            duration-300 group-hover:rotate-0 rotate-[-90deg]
                        "
                    />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                    {project.tags.slice(0, 4).map((tag, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="
                                px-3 py-1 rounded-full text-xs font-medium
                                bg-neutral-100 dark:bg-neutral-800 
                                text-neutral-800 dark:text-neutral-200
                                border border-neutral-300 dark:border-neutral-700
                                shadow-sm
                            "
                        >
                            {tag}
                        </motion.span>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-3 text-sm text-primary font-medium opacity-90 group-hover:opacity-100">
                    Click to view details →
                </div>
            </div>
        </motion.div>
    );
});
