import React, { memo } from "react";
import { Code, Layers, Terminal, Sparkles, Settings2 } from "lucide-react";
import { motion } from "framer-motion";
import PageTitle from "../components/PageTitle";

// 🟡 Popup System
import PagePopup from "../components/PagePopup/PagePopup";
import { popupConfig } from "../components/PagePopup/popupConfig";

// Page Transition Wrapper
import PageTransition from "../components/PageTransition";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Skill Tag
const SkillTag = memo(({ tag }) => (
  <span
    className="
      px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap
      bg-black/40 dark:bg-white/10
      border border-white/20 dark:border-white/10
      text-neutral-100
      transition-all
      shadow-[0_0_6px_rgba(255,0,255,0.4)]
      hover:shadow-[0_0_10px_rgba(0,255,255,0.6)]
    "
  >
    {tag}
  </span>
));
SkillTag.displayName = "SkillTag";

// Skill Card Component
const SkillSection = memo(({ section }) => {
  const { icon, title, tags } = section;

  return (
    <motion.div
      variants={itemVariants}
      className="
        p-[2px] rounded-xl 
        bg-gradient-to-br from-pink-500 to-cyan-400
        -skew-x-3 hover:skew-x-0
        transition-all duration-300
        shadow-[6px_6px_0px_#00eaff]
      "
    >
      <div
        className="
          rounded-xl p-6 h-full
          bg-gradient-to-br from-[#101010] via-[#1a1a1a] to-[#0b0b0b]
          shadow-inner border border-white/5
        "
      >
        <div className="flex items-center gap-3 mb-5">
          <div
            className="
              p-3 rounded-xl bg-black/50 
              border border-white/10
              text-white shadow-[0_0_10px_rgba(255,0,255,0.4)]
            "
          >
            {icon}
          </div>

          <h3
            className="
              text-xl font-bold text-white
              drop-shadow-[2px_2px_0px_#ff00ff]
              tracking-wide
            "
          >
            {title}
          </h3>
        </div>

        <div className="flex flex-wrap gap-3">
          {tags.map((tag, i) => (
            <SkillTag key={i} tag={tag} />
          ))}
        </div>
      </div>
    </motion.div>
  );
});
SkillSection.displayName = "SkillSection";

// Static Data
const SKILLS_SECTIONS = [
  {
    icon: <Code className="w-6 h-6" />,
    title: "Programming Languages",
    tags: ["C", "C#", "Java", "JavaScript", "Python", "HTML", "CSS"],
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Frameworks & Libraries",
    tags: ["React", "Tailwind CSS", "SFML", "NumPy", "Pandas"],
  },
  {
    icon: <Terminal className="w-6 h-6" />,
    title: "Tools & Platforms",
    tags: ["Git", "GitHub", "VS Code", "Jupyter Notebook", "Unity"],
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Interests",
    tags: ["Game Development", "DSA", "Machine Learning", "Web Development"],
  },
];

// MAIN PAGE COMPONENT
const SkillsComponent = memo(function Skills() {
  return (
    <PageTransition>
      {/* 🟡 Popup */}
      <PagePopup
        image={popupConfig.skills.image}
        text={popupConfig.skills.text}
      />

      <div className="w-full min-h-[80vh] flex flex-col items-center px-4 py-16">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center w-full"
        >
          {/* Title Section */}
          <motion.div variants={itemVariants} className="text-center flex flex-col items-center mb-10">
            <div className="flex items-center gap-4 mb-3">
              <Settings2 className="w-12 h-12 text-primary drop-shadow-lg" />
              <PageTitle>Skills & Interests</PageTitle>
            </div>

            <p className="text-muted-foreground max-w-2xl text-lg">
              A snapshot of my technical strengths and fields I’m passionate about.
            </p>
          </motion.div>

          {/* Grid */}
          <motion.div
            variants={containerVariants}
            className="
              w-full max-w-5xl 
              grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 
              gap-10
            "
          >
            {SKILLS_SECTIONS.map((section) => (
              <SkillSection key={section.title} section={section} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
});

SkillsComponent.displayName = "Skills";

export default SkillsComponent;
